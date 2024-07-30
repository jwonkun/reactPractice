// src/pages/Main.js
import React, { useState } from 'react';
import CameraSelector from '../components/CameraSelector';
import styled from 'styled-components';
// import FetchExample from '../components/FetchExample';

function Main() {
  const cameras = [
    { name: '카메라 1', url: 'http://camera1.com/stream' },
    { name: '카메라 2', url: 'http://camera2.com/stream' },
    { name: '카메라 3', url: '' },
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
            <CameraIframe
              src={selectedCamera.url}
              title={selectedCamera.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=Error'; // Fallback URL
                e.target.onerror = null; // Prevent infinite loop
              }}
            />
          ) : (
            // <FetchExample />
            // Uncomment the line below if you want to show a message when no camera is selected
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
`;

const CameraSelectorWrapper = styled.div`
  width: 200px;
  border-right: 1px solid #ccc;
`;

const CameraFeed = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const CameraIframe = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
`;
