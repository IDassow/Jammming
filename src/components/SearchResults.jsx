import React from 'react';
import TrackList from './Tracklist';

function SearchResults({ tracks , onAdd}) {
  return (
    <div className="SearchResults" >
      <h2>Results</h2>
      <TrackList tracks={tracks} onAdd={onAdd} isRemoval={false} />
    </div>
  );
}

export default SearchResults;
