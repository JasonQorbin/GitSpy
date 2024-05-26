import {useNavigate} from "react-router-dom";

function SearchBar(props) {
    const navigate = useNavigate()
    function searchCallback(event) {
        if (event.key === 'Enter') {
            navigate(`/search/${event.target.value}`);
            if (props.resetSearch !== undefined) {
                props.resetSearch();
            }
        }
    }

   return (
       <div id="search-bar-container">
           <input id="search-bar" type="text" placeholder="Search for a user..." onKeyDown={searchCallback}/>
       </div>
   );
}

export default SearchBar;