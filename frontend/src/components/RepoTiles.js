import CommitListing from "./CommitListing";
import RepoTileHeader from "./RepoTileHeader";

/**
 * Function component that displays the details of a given repo on the User Details screen
 *
 * @param props Must contain an array of the repo object and the users name.
 * @returns {JSX.Element}
 * @constructor
 */
function RepoTiles(props) {
    const tiles = props.repositories.map((repo) => {
        const updatedAt = new Date(Date.parse(repo.updated_at));
        const createdAt = new Date(Date.parse(repo.created_at));

        return (
            <div key={repo.id} className="repo-tile">
                <RepoTileHeader repo={repo} updatedAt={updatedAt} createdAt={createdAt} />
                <span className="divider"></span>
                <div>
                    <CommitListing repoName={repo.name} username={props.username}/>
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