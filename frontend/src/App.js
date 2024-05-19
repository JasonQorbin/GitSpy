import './App.css';

function RepoTiles() {
    const array = [1,2,3,4,5,6];
    const tiles = array.map((num) => {
        return (
            <div key={num} className="repo-tile">
                <div className="left-tile-pane">
                    <h3>Repo name</h3>
                    <p><small>Forked from ...</small></p>
                    <p><em>Description text</em></p>
                </div>
                <div className="right-tile-pane">
                    <p>Languages:</p>
                    <p><em>Repo Age:</em></p>
                    <p><em>Last commit:</em></p>
                </div>
            </div>
        );
    })

    return (
        <div>
            {tiles}
        </div>
    );
}

function App() {
    return (
        <div className="page-container">
            <aside>
                <div>
                    <div id="profile-pic">Profile picture</div>
                    <h1>Full name</h1>
                    <h2>Username</h2>
                    <span className="divider"></span>
                    <p>Location</p>
                    <p>Email</p>
                    <p>Twitter</p>
                </div>
            </aside>
            <main>
              <RepoTiles />
            </main>
        </div>
    )
}
export default App;
