import {useState} from "react";

function CommitListing(props) {
    const [commits, setCommits] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const maxMessageLength = 40;

    if (!loaded && !loading) {
        fetch(`/api/repo?user=${props.username}&repo=${props.repoName}`)
            .then( (response) => {
                return response.json()
            })
            .then( (data) => {
                setCommits(data);
                setLoaded(true);
                setLoading(false);
            });
        setLoading(true);
    }
    if (loaded) {
        const rows = commits.map( (commit) => {
            let message = commit.commit.message;
            if (message.length > maxMessageLength - 1) {
                message = message.substring(0, maxMessageLength) + "...";
            } else {
                message = message.substring(0, maxMessageLength);
            }
            return (
                <tr key={commit.sha}>
                    <td>{commit.sha.substring(0, 8)}</td>
                    <td>{commit.commit.author.name}</td>
                    <td>{message}</td>
                </tr>
            );
        });

        return (
            <table className="commit-table">
                <thead>
                <tr>
                    <th scope="col">sha</th>
                    <th scope="col">Author</th>
                    <th scope="col">Message</th>
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    } else {
        return (
            <div>
                Loading...
            </div>
        )
    }
}

export default CommitListing;