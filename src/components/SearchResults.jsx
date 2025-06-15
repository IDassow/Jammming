import React from "react";

function SearchResult({tracks}){

    return(
        <div>
            <h1>Results</h1>
            {tracks.map(track => (
                <div>
                    <Track key={track.id} track={track} />
                    <button></button>
                </div>
            ))}

        </div>
    );
}

export default SearchResult;