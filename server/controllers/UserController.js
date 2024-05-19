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

    console.log(fetchProperties);
    console.log(JSON.stringify(fetchProperties));
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

module.exports = {
    getUserDetails,
    getUserRepos
}