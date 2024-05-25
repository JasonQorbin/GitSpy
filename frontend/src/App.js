import HomePage from "./components/HomePage";
import UserDetail from "./components/UserDetail";
import SearchResults from "./components/SearchResults";

import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <div className="page-container">
            <div id="search-bar-container">
                <input id="search-bar" type="text" placeholder="Search for a user..."/>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<HomePage/>}/>
                        <Route path="/user/:userToShow" element={<UserDetail/>}/>
                        <Route path="/search-results" element={<SearchResults/>}/>
                   </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App;
/*
<Routes>
    <Route index element={<HomePage />} />
    <Route path="/user/:username" element={<UserDetail />} />
    <Route path="/search-results" element={<SearchResults />} />
</Routes>
*/
