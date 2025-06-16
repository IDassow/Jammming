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
  const [userInput, setUserInput] = useState('');
  function handleUserInput(e) {
    setUserInput(e.target.value);
    filterItems(userInput);
  }
  const filterItems = (input) => {
    setSearchResults((prev) => {
      return prev.filter((item) => (item.name === input || item.album === input || item.artist === input));
    });
  };
  const changePlaylistName = (input) => {
    setPlaylistName(() => {
       input;
    });
  };

  const addTrack = (track) => {
    // Prevent duplicates
    if (playlist.find(t => t.id === track.id)) return;
    setPlaylist(prev => [...prev, track]);
  };

  const removeTrack = (track) => {
    setPlaylist(prev => prev.filter(t => t.id !== track.id));
  };

  return (
    <>
      <SearchBar value={userInput} onChange={handleUserInput}/>
      <div style={{display:'inlineFlex'}}>
        <SearchResult tracks={searchResults}  onAdd={addTrack}/>
        <Playlist playlistName={playlistName} 
          changeName={changePlaylistName}
          playlistTracks={playlist}
          onRemove={removeTrack}/>
      </div>
    </>
  )
}

export default App
