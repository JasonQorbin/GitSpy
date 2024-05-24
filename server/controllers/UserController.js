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

    console.log(fetchProperties);
    console.log(JSON.stringify(fetchProperties));
    fetch(`https://api.github.com/users/${request.params.username}`, fetchProperties).then(
        (answer) => {
            answer.json().then(
                (output) => {
                    console.log(output);
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
                    console.log(output);
                    response.send(output);
                }
            )
        }
    )
}

function searchUsers(request, response) {
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

    fetch(`https://api.github.com/search/users?q=${request.params.username}&per_page=10&page=2`, fetchProperties).then(
        (answer) => {
            parseLinkHeader(answer, outputObject);
            answer.json().then(
                (output) => {
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
    function getLink (linkSegment) {
        return linkSegment.substring(1, linkSegment.length-1);
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
    const link = getLink(linkSegment);
    const relation = getRelation(relationSegment);
    switch (relation) {
        case 'first':
            outputObject.first = link;
            break;
        case 'next':
            outputObject.next = link;
            break;
        case 'prev':
            outputObject.prev = link;
            break;
        case 'last':
            outputObject.last = link;
            break;
        default:
            console.log("Couldn't determine the link relation.");
    }

    if (commaIndex !== -1) {
        recursivelyExtractLinks(linkString.substring(commaIndex +1), outputObject);
    }
}

module.exports = {
    getUserDetails,
    getUserRepos,
    searchUsers
}