// src/pages/Main.js
import React, { useState } from 'react';
import CameraSelector from '../components/CameraSelector';
import styled from 'styled-components';
// import FetchExample from '../components/FetchExample';

function Main() {
  const cameras = [
    { name: '카메라 1', src: '/videos/cow_video.mp4' },
    { name: '카메라 2', src: 'http://camera2.com/stream' },
    { name: '카메라 3', src: '' },
    { name: '카메라 4', src: '' },
    { name: '카메라 5', src: '' },
  ];

  const [selectedCamera, setSelectedCamera] = useState(cameras[0]);

  return (
    <MainContainer>
      <Content>
        <CameraSelectorWrapper>
          <CameraSelector
            cameras={cameras}
            onSelect={setSelectedCamera}
            selectedCamera={selectedCamera} // Pass selectedCamera to CameraSelector
          />
        </CameraSelectorWrapper>
        <CameraFeed>
          {selectedCamera ? (
            <CameraVideo
              src={selectedCamera.src}
              title={selectedCamera.name}
              controls
              autoPlay
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=Error'; // Fallback URL
                e.target.onerror = null; // Prevent infinite loop
              }}
            />
          ) : (
            <p>카메라를 선택하세요.</p>
          )}
        </CameraFeed>
      </Content>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CameraSelectorWrapper = styled.div`
  width: 200px;
  border-right: 1px solid #ccc;

  @media (max-width: 768px) {
    width: auto;
    max-height: 100px;
    overflow-y: auto;
  }
`;

const CameraFeed = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 20px;
`;

const CameraVideo = styled.video`
  border: none;
  width: 100%;
`;
