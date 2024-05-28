import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

function RepoTileHeader(props) {
    const dateOptions = {
        year: "numeric",
        month: "short",
        day: "numeric"
    }
    return (
        <div className="repo-tile-row-wrapper">
            <div className="left-tile-pane">
                <h3><a className="external-link" href={props.repo.html_url}>{props.repo.name}<FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}/></a></h3>
                <p><em>{props.repo.description}</em></p>
            </div>
            <div className="right-tile-pane">
                <p>Languages: <strong>{props.repo.language}</strong></p>
                <p><em>Created: {props.createdAt.toLocaleString(undefined, dateOptions)}</em></p>
                <p><em>Last commit: {props.updatedAt.toLocaleString(undefined, dateOptions)}</em></p>
            </div>
        </div>
    )
}

export default RepoTileHeader;