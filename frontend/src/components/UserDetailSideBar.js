import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faEnvelope, faMapPin,  } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

/**
 * Functional component that renders the contents of the aside element of the User Detail page.
 *
 * Not every GitHub user fills in all their information or may have chosen to not make certain fields
 * like their email publicly visible. This component checks if the information for a field is available before
 * rendering it section for it.
 *
 * @param props Should contain all the fields to be displayed. If one of the fields is not available the value should be null.
 * @returns {JSX.Element}
 * @constructor
 */
function UserDetailSideBar(props) {
    const elements = [];

    if (props.profilePic === null) {
        elements.push(<div key="profile-pic" id="profile-pic"></div>);
    } else {
        elements.push(<img key="profile-pic" id="profile-pic" src={props.profilePic}/>);
    }

    elements.push(<h1 key="fullName">{props.fullName}</h1>);
    elements.push(<h2 key="username">
        <a className="external-link" href={props.userURL}>{props.username}<FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
    </h2>);
    elements.push(<span key="divider" className="divider"></span>);
    if (props.location !== null) {
        elements.push(<p key="location"><FontAwesomeIcon icon={faMapPin}/>{props.location}</p>)
    }

    if (props.email !== null) {
        elements.push(<p key="email"><FontAwesomeIcon icon={faEnvelope}/>{props.email}</p>);
    }

    if (props.twitter !== null) {
        elements.push(<p key="twitter"><FontAwesomeIcon icon={faXTwitter} />{props.twitter}</p>);
    }

    return (
        <div className="user-detail-section">
            {elements}
        </div>
    );
}

export default UserDetailSideBar;