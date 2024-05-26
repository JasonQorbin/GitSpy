import HomePage from "./components/HomePage";
import UserDetail from "./components/UserDetail";
import SearchResults from "./components/SearchResults";

import './App.css';
import {Routes, Route} from 'react-router-dom';

function App() {


    return (
        <div className="page-container">
                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route path="/user/:userToShow" element={<UserDetail/>}/>
                    <Route path="/search/:userToSearch" element={<SearchResults/>}/>
               </Routes>
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
