import React from 'react';
import Track from './Track';

function TrackList({ tracks, onRemove, isRemoval }) {
  return (
    <div className="TrackList" style={{display:'flex', alignContent:"space-evenly", flexWrap:"wrap"}}>
      {tracks.map(track => (
        <Track
          key={track.id}
          track={track}
          onRemove={onRemove}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
}

export default TrackList;
