import SearchBar from "./SearchBar";

function HomePage() {
    return (
        <div>
            <SearchBar />
            <div id="main-page-content">
                Search for a GitHub User using the search bar.
            </div>
        </div>
    );
}

export default HomePage;