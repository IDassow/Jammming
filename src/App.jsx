import React, {useState} from 'react';
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { testData } from './test_data/Songlist_test_data';
import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResults';
import Playlist from './components/Playlist';
function App() {
  const [searchResults, setSearchResults] = useState(testData);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlist, setPlaylist] = useState([])

  const filterItems = (input) => {
    setSearchResults((prev) => {
      if(input===null || input==='')
        return testData;
      else
        return prev.filter((item) => (item.name === input || item.album === input || item.artist === input));
    });
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
      <SearchBar onSearch={filterItems}/>
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
