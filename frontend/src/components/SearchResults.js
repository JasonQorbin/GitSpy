import LoadingScreen from "./LoadingScreen";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";

/**
 * Helper function to fetch user search results from the server.
 *
 * @param userToSearch The user login name to search for
 * @param setUsers The callback to update the state of the component with the response from the server.
 * @param setLoaded Callback to declare the component as being loaded and ready.
 */
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

/**
 * Component that displays a grid of profile pictures and login matching the search criteria
 * entered into the search bar.
 *
 * Expects to receive the search term as a query parameter.
 *
 * @returns {JSX.Element}
 * @constructor
 */
function SearchResults() {
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
                    <img src={user.avatar_url} alt="User profile pic"/>
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
