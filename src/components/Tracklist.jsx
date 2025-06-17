import React from 'react';
import Track from './Track';

function TrackList({ tracks, onRemove, onAdd, isRemoval }) {
  return (
    <div className="TrackList" style={{display:'flex', alignContent:"space-evenly", flexWrap:"wrap"}}>
      {tracks.map(track => (
        <Track
          key={track.id}
          track={track}
          onRemove={onRemove}
          onAdd={onAdd}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
}

export default TrackList;
