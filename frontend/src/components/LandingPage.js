import SearchBar from "./SearchBar";

function LandingPage() {
    return (
        <div>
            <SearchBar />
            <div id="main-page-content">
                <p className="centerplace-text">Search for a GitHub User using the search bar</p>
            </div>
        </div>
    );
}

export default LandingPage;