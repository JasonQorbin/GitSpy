import LoadingScreen from "./LoadingScreen";

async function getUserSearchResults(userToSearch) {
    return await fetch(`/search/${userToSearch}`);
}

function SearchResults(props) {
    //Todo: Set loading screen
    const searchResults = getUserSearchResults(props.userToSearch);
    const userElements = searchResults.users.map((user) => {
        return (
            <div className="user-search-result">
                <img src={user.avatar_url} />
                <p>{user.login}</p>
            </div>
        )
    })

    //Build the nav section
    const navLinks = []
    if (searchResults.hasOwnProperty('first')){
        navLinks.push(<a href={searchResults.first}>First</a>);
    }
    if (searchResults.hasOwnProperty('prev')){
        navLinks.push(<a href={searchResults.prev}>Prev</a>);
    }
    if (searchResults.hasOwnProperty('next')){
        navLinks.push(<a href={searchResults.next}>Next</a>);
    }
    if (searchResults.hasOwnProperty('last')){
        navLinks.push(<a href={searchResults.last}>Last</a>);
    }

    return (
        <div id="main-page-content">
            {userElements}
            <nav>
                {navLinks}
            </nav>
        </div>
    );
}

export default SearchResults;
