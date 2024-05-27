import SearchBar from "./SearchBar";
import LoadingScreen from "./LoadingScreen";
import {useState} from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faEnvelope, faMapPin,  } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";


function RepoTiles(props) {
    const array = props.repositories;
    const tiles = array.map((repo) => {
        const updatedAt = new Date(Date.parse(repo.updated_at));
        const dateOptions = {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
        return (
            <div key={repo.id} className="repo-tile">
                <div className="left-tile-pane">
                    <h3><a className="external-link" href={repo.html_url}>{repo.name}<FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a></h3>
                    <p><em>{repo.description}</em></p>
                </div>
                <div className="right-tile-pane">
                    <p>Languages: <strong>{repo.language}</strong></p>
                    <p><em>Last commit: {updatedAt.toLocaleString(undefined, dateOptions)}</em></p>
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

function UserDetail(props) {
    let {userToShow} = useParams();

    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [username, setUserName] = useState(userToShow);
    const [userURL, setUserURL] = useState(null);
    const [location, setLocation] = useState(null);
    const [email, setEmail] = useState(null);
    const [twitter, setTwitter] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [fetchingRepos, setFetchingRepos] = useState(false);

    function fetchUserDetails(){
        fetch(`/api/users/${userToShow}`)
            .then((response) => {
                response.json()
                    .then( (details) => {
                        setProfilePic(details.avatar_url);
                        setFullName(details.name);
                        setLocation(details.location);
                        setTwitter(details.twitter_username);
                        setEmail(details.email);
                        setUserURL(details.html_url);
                    })
            });

        fetch(`/api/users/${userToShow}/repos`)
            .then((response) => {
                response.json()
                    .then( (downloadedRepos) => {
                       console.log(downloadedRepos);
                       setRepos(downloadedRepos);
                       setLoaded(true);
                    })
            });

    }

    if (!loaded) {
        fetchUserDetails();
    }

    if (loaded) {
        return (
            <div>
                <SearchBar />
                <div id="main-page-content">
                    <aside>
                        <UserDetailSideBar
                            profilePic={profilePic}
                            fullName={fullName}
                            username={username}
                            location={location}
                            email={email}
                            twitter={twitter}
                            userURL={userURL}/>
                    </aside>
                    <main>
                        <RepoTiles repositories={repos}/>
                    </main>
                </div>
            </div>
        );
    } else {
        return <LoadingScreen />;
    }
}

export default UserDetail;
