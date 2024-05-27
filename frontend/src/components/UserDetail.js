import SearchBar from "./SearchBar";
import LoadingScreen from "./LoadingScreen";
import UserDetailSideBar from "./UserDetailSideBar";
import {useState} from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare  } from "@fortawesome/free-solid-svg-icons";


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
