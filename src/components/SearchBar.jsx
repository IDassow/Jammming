import React, {useState} from "react";

function SearchBar({onSearch}){
      const [searchInput, setSearchInput] = useState('');
      const handleTermChange = (e) => setSearchInput(e.target.value);
      const search = () =>{
        onSearch(searchInput);
      }

    return(
        <div>
            <h1>SearchBar</h1>
            <input type="text" name="searchInput" id="searchInput" value={searchInput} onChange={handleTermChange}  />
            <button onClick={search}>Search</button>
        </div>
    );
}

export default SearchBar;