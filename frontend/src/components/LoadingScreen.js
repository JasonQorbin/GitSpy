import SearchBar from "./SearchBar";

function LoadingScreen() {
    return (
        <div>
            <SearchBar />
            <div id="main-page-content">
                <p className="centerplace-text">Loading...</p>
            </div>
        </div>
    )
}

export default LoadingScreen;
