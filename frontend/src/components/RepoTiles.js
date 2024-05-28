import CommitListing from "./CommitListing";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";



function RepoTiles(props) {
   const tiles = props.repositories.map((repo) => {
        const updatedAt = new Date(Date.parse(repo.updated_at));
        const dateOptions = {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
        return (
            <div key={repo.id} className="repo-tile">
                <div className="repo-tile-row-wrapper">
                    <div className="left-tile-pane">
                        <h3><a className="external-link" href={repo.html_url}>{repo.name}<FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a></h3>
                        <p><em>{repo.description}</em></p>
                    </div>
                    <div className="right-tile-pane">
                        <p>Languages: <strong>{repo.language}</strong></p>
                        <p><em>Last commit: {updatedAt.toLocaleString(undefined, dateOptions)}</em></p>
                    </div>
                </div>
                <span className="divider"></span>
                <div>
                    <CommitListing repoName={repo.name} username={props.username} />
                </div>
            </div>
        );
    });

    return (
        <div>
            {tiles}
        </div>
    );
}

export default RepoTiles;