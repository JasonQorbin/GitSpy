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

function recursivelyExtractLinks(linkString, outputObject){
    //Todo: Refactor this section so I don't parse the headers myself and rather use the Headers object.
    function getLinkPage (linkSegment) {
        if (linkSegment.charAt(linkSegment.length-1) == '>') {
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

    if (linkString.length == 0) return;

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

function getCommits(request, response) {
    const user = request.query.user;
    const repo = request.query.repo;

    const fetchProperties = {
        method: "GET",
        headers : {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "X-Github-API-Version": '2022-11-28',
            "User-Agent": `${process.env.USER_AGENT}`,
            "Accept": "application/vnd.github+json"
        }
    };

    fetch(`https://api.github.com/repos/${user}/${repo}/commits`, fetchProperties).then( (fetchResponse) => {
        fetchResponse.json().then( (data) => {
            console.log(data);
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