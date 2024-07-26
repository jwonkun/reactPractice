// src/components/CameraSelector.js
import React from 'react';

function CameraSelector({ cameras, onSelect }) {
  return (
    <div className="camera-selector">
      <ul>
        {cameras.map((camera, index) => (
          <li key={index} onClick={() => onSelect(camera)}>
            {camera.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CameraSelector;
