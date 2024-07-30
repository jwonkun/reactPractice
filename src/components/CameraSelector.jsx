// src/components/CameraSelector.js
import React from 'react';
import styled from 'styled-components';

const CameraSelector = ({ cameras, onSelect, selectedCamera }) => {
  return (
    <CameraList>
      {cameras.map((camera) => (
        <CameraItem
          key={camera.name}
          onClick={() => onSelect(camera)}
          isSelected={selectedCamera && selectedCamera.name === camera.name}
        >
          {camera.name}
        </CameraItem>
      ))}
    </CameraList>
  );
};

export default CameraSelector;

const CameraList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const CameraItem = styled.div`
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#7e7e7ecf' : 'transparent')};
  border-radius: 4px;

  &:hover {
    background-color: #7e7e7ecf;
  }

  @media (max-width: 768px) {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 0; /* Row 방향에서는 margin-bottom을 제거 */
  }
`;
