import SearchBar from "./SearchBar";
import LoadingScreen from "./LoadingScreen";
import {useState} from "react";
import { useParams } from "react-router-dom";


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
                    <h3><a href={repo.html_url}>{repo.name}</a></h3>
                    <p><small>Forked from ...</small></p>
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
    let { userToShow } = useParams();

    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [username, setUserName] = useState(userToShow);
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
                        <div>
                            <img id="profile-pic" src={profilePic}></img>
                            <h1>{fullName}</h1>
                            <h2>{username}</h2>
                            <span className="divider"></span>
                            <p>{location}</p>
                            <p>{email}</p>
                            <p>{twitter}</p>
                        </div>
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
