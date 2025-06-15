import React from "react";

function SearchBar(){

    return(
        <div>
            <h1>SearchBar</h1>
            <form action="">
                <label>Song Name:</label>
                <input type="search" name="searchInput" id="si" incremental={true} />
            </form>
        </div>
    );
}

export default SearchBar;