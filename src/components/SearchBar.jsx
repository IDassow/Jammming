import React from "react";

function SearchBar({userInput, handleUserInput}){

    return(
        <div>
            <h1>SearchBar</h1>
            <input type="text" name="searchInput" id="searchInput" value={userInput} onChange={handleUserInput}  />
        </div>
    );
}

export default SearchBar;