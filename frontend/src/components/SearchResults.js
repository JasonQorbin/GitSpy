import LoadingScreen from "./LoadingScreen";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";

function getUserSearchResults(userToSearch, setUsers, setLoaded) {
    let params = new URLSearchParams( document.location.search);
    const pageNumber = params.get('page') || 1;

    fetch(`/api/search/${userToSearch}?page=${pageNumber}`).then( (response) => {
        response.json().then( (users) => {
            setUsers(users);
            setLoaded(true);
        })
    });
}



function SearchResults(props) {
    const { userToSearch } = useParams();

    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    function resetSearch() {
        setLoading(false);
        setLoaded(false);
    }

    if (!loaded && !loading) {
        getUserSearchResults(userToSearch, setUsers, setLoaded);
        //Prevent hitting the server with multiple request before the response arrives
        setLoading(true);
    }

    if (loaded) {
        console.log(users);
        const userElements = users.users.map((user) => {
            return (
                <div key={user.id} className="user-search-result">
                    <img src={user.avatar_url} />
                    <a className="internal-link" href={`/user/${user.login}`}>{user.login}</a>
                </div>
            )
        })
        console.log(users);
        //Build the nav section
        const navLinks = []
        if (users.hasOwnProperty('first')){
            navLinks.push(<a key={'first'} href={`/search/${userToSearch}?page=${users.first}`}>First</a>);
        }
        if (users.hasOwnProperty('prev')){
            navLinks.push(<a key={'prev'} href={`/search/${userToSearch}?page=${users.prev}`}>Prev</a>);
        }
        if (users.hasOwnProperty('next')){
            navLinks.push(<a key={'next'} href={`/search/${userToSearch}?page=${users.next}`}>Next</a>);
        }
        if (users.hasOwnProperty('last')){
            navLinks.push(<a key={'last'} href={`/search/${userToSearch}?page=${users.last}`}>Last</a>);
        }

        return (
            <div>
                <SearchBar resetSearch={resetSearch}/>
                <div id="search-page-content">
                    <div id="search-result-grid">
                        {userElements}
                    </div>
                    <div id="search-nav-container">
                        <nav>
                            {navLinks}
                        </nav>
                    </div>
                </div>
            </div>
        );
    } else {
        return <LoadingScreen/>;
    }
}

export default SearchResults;