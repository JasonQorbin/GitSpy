function getUserDetails(request, response) {
    const fetchProperties = {
        method: "GET",
        headers : {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "X-Github-API-Version": '2022-11-28',
            "User-Agent": `${process.env.USER_AGENT}`,
            "Accept": "application/vnd.github+json"
        }
    };

    fetch(`https://api.github.com/users/${request.params.username}`, fetchProperties).then(
        (answer) => {
            answer.json().then(
                (output) => {
                    response.send(output);
                }
            )
        }
    )
}

/**
 * Fetches a list of a user's repos from GitHub.
 *
 * @param request
 * @param response Returns the output from GitHub
 */
function getUserRepos(request, response) {
    const fetchProperties = {
        method: "GET",
        headers : {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "X-Github-API-Version": '2022-11-28',
            "User-Agent": `${process.env.USER_AGENT}`,
            "Accept": "application/vnd.github+json"
        }
    };

    fetch(`https://api.github.com/users/${request.params.username}/repos`, fetchProperties).then(
        (answer) => {
            answer.json().then(
                (output) => {
                    response.send(output);
                }
            )
        }
    )
}

/**
 * Fetches a list of users from the GitHub API. Used in response to the user typing something
 * into the search box.
 *
 * @param request Should have a query parameter for the "username" and optionally a "page" number (defaults to 1).
 * @param response Returns the array from the GitHub API.
 */
function searchUsers(request, response) {
    const pageToGet = request.query.page || 1;

    const fetchProperties = {
        method: "GET",
        headers : {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "X-Github-Api-Version": '2022-11-28',
            "User-Agent": `${process.env.USER_AGENT}`,
            "Accept": "application/vnd.github+json"
        }
    };

    const outputObject = {};

    fetch(`https://api.github.com/search/users?q=${request.params.username}&per_page=16&page=${pageToGet}`, fetchProperties).then(
        (answer) => {
            parseLinkHeader(answer, outputObject);
            answer.json().then(
                (output) => {
                    outputObject.currentPage = pageToGet;
                    outputObject.users = output.items
                    response.send(outputObject);
                }
            )
        }
    )
}

/**
 * Parses the link header from the github API response (present if a paged response was given) then adds the
 * paginated, first, next, prev and last properties to the output object.
 *
 * @param response The HTTP response from the Github API
 * @param outputObject The object that will be passed back to the frontend. This function will append properties to it.
 */
function parseLinkHeader(response, outputObject) {
    const linkHeaderContents = response.headers.get('link');
    if (linkHeaderContents !== null) {
        recursivelyExtractLinks(linkHeaderContents, outputObject);
    } else {
        console.log('Could not read the link header');
    }

    return outputObject;
}

/**
 * Parses through the link header and sets "next, "prev", "first" and "last" properties on the outputObject that have
 * relevant page numbers. Those page numbers should be used to construct new search urls.
 *
 * @param linkString The string to parse. (Initially the contents of the link header)
 * @param outputObject The output from the user search that will be modified.
 */
function recursivelyExtractLinks(linkString, outputObject){
    function getLinkPage (linkSegment) {
        if (linkSegment.charAt(linkSegment.length-1) === '>') {
            linkSegment = linkSegment.substring(0, linkSegment.length -1 );
        }
        const params = new URLSearchParams(linkSegment);
        return params.get('page');
    }

    function getRelation(relationSegment){
        if (relationSegment.substring(0, 4) !== 'rel=') {
            throw new Error("Malformed header");
        }

        return relationSegment.substring(5, relationSegment.length);

    }

    if (linkString.length === 0) {
        return;
    }

    const commaIndex = linkString.indexOf(',');
    let currentSegment;
    if (commaIndex !== -1) {
        currentSegment = linkString.substring(0, commaIndex).trim();
    } else {
        currentSegment = linkString.trim();
    }

    const semicolonIndex = currentSegment.indexOf(';');
    const firstSegment = currentSegment.substring(0, semicolonIndex).trim();
    const secondSegment = currentSegment.substring(semicolonIndex + 1, currentSegment.length-1).trim();
    let linkSegment;
    let relationSegment;
    if (currentSegment[0] === '<') {
        linkSegment = firstSegment;
        relationSegment = secondSegment;
    } else {
        relationSegment = firstSegment;
        linkSegment = secondSegment
    }
    const page = getLinkPage(linkSegment);
    const relation = getRelation(relationSegment);
    switch (relation) {
        case 'first':
            outputObject.first = page;
            break;
        case 'next':
            outputObject.next = page;
            break;
        case 'prev':
            outputObject.prev = page;
            break;
        case 'last':
            outputObject.last = page;
            break;
        default:
            console.log("Couldn't determine the link relation.");
    }

    if (commaIndex !== -1) {
        recursivelyExtractLinks(linkString.substring(commaIndex +1), outputObject);
    }
}

/**
 * Requests a list of the last 5 commits of a given user and repo from the GitHub API
 *
 * @param request Client request. Should have query parameters "user" and "repo"
 * @param response Will return 400 if one of the query parameters is missing, otherwise will return JSON data.
 */
function getCommits(request, response) {
    const user = request.query.user;
    const repo = request.query.repo;
    console.log(repo);
    console.log(user);
    if (user === undefined || repo === undefined) {
        response.status(400);
        response.end();
        return;
    }

    const fetchProperties = {
        method: "GET",
        headers : {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "X-Github-API-Version": '2022-11-28',
            "User-Agent": `${process.env.USER_AGENT}`,
            "Accept": "application/vnd.github+json"
        }
    };

    fetch(`https://api.github.com/repos/${user}/${repo}/commits?per_page=5&page=1`, fetchProperties).then( (fetchResponse) => {
        fetchResponse.json().then( (data) => {
            response.send(data);
            response.status(200);
            response.end();
        })
    })
}

module.exports = {
    getUserDetails,
    getUserRepos,
    searchUsers,
    getCommits
}