import LandingPage from "./components/LandingPage";
import UserDetail from "./components/UserDetail";
import SearchResults from "./components/SearchResults";

import './App.css';
import {Routes, Route, useParams} from 'react-router-dom';
import {useState} from "react";
import SearchBar from "./components/SearchBar";

function Test() {
    const {repo} = useParams();
    const {userToSearch} = useParams();
    const [content, setContent] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!loaded && !loading) {
        const URI = `/api/repo?user=${userToSearch}&repo=${repo}`;
        console.log(URI);
        fetch(URI).then((response) => {
            response.json().then( (data) => {
                setContent(data);
                setLoaded(true);
            })
        });
        setLoading(true);
    }

    return (
        <div>
            <SearchBar />
            <div>
                {JSON.stringify(content)}
            </div>
        </div>
    );

}

function App() {


    return (
        <div className="page-container">
                <Routes>
                    <Route index element={<LandingPage/>}/>
                    <Route path="/user/:userToShow" element={<UserDetail/>}/>
                    <Route path="/search/:userToSearch" element={<SearchResults/>}/>
                    <Route path="/repo/:userToSearch/:repo" element={<Test />}/>
               </Routes>
        </div>
    )
}

export default App;
