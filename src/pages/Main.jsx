// src/pages/Main.js
import React, { useState } from 'react';
import CameraSelector from '../components/CameraSelector';

function Main() {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const cameras = [
    { name: '카메라 1', url: 'http://camera1.com/stream' },
    { name: '카메라 2', url: 'http://camera2.com/stream' },
  ];

  return (
    <div className="main-container">
      <div className="content">
        <CameraSelector cameras={cameras} onSelect={setSelectedCamera} />
        <div className="camera-feed">
          {selectedCamera ? (
            <iframe
              src={selectedCamera.url}
              title={selectedCamera.name}
              frameBorder="0"
              width="100%"
              height="100%"
            ></iframe>
          ) : (
            <p>카메라를 선택하세요.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
