import React from 'react';
import Tracklist from './Tracklist';

function Playlist({ playlistName, changeName, playlistTracks, onRemove }) {
   return (
    <div className="Playlist">
      <input defaultValue={playlistName} onChange={changeName}/>
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
