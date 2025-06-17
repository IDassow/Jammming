import React, {useState} from 'react';
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import Spotify from './Auth/Spotify';
import './App.css'
//import { testData } from './test_data/Songlist_test_data';
import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResults';
import Playlist from './components/Playlist';
function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlist, setPlaylist] = useState([])

  const search = (term) => {
  Spotify.search(term).then(results => {
    setSearchResults(results);
  });
  console.log('Access token:', Spotify.getAccessToken());
};
  function changePlaylistName (input) {
    setPlaylistName(input);
  };

  const addTrack = (track) => {
    // Prevent duplicates
    if (playlist.find(t => t.id === track.id))
       return false;
    else{
      setPlaylist(prev => [...prev, track]);
      return true;
    }
    
  };

  const removeTrack = (track) => {
    setPlaylist(prev => prev.filter(t => t.id !== track.id));
  };


  return (
    <>
      <SearchBar onSearch={search}/>
      <div style={{display:'inline'}}>
        <div>
          <SearchResult tracks={searchResults}  
            onAdd={addTrack}
            />
        </div>
        <div>
          <Playlist playlistName={playlistName} 
          changeName={changePlaylistName}
          playlistTracks={playlist}
          onRemove={removeTrack}/>
        </div>
        
      </div>
    </>
  )
}

export default App
