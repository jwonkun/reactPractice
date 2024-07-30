import React, { useState } from 'react';
import styled from 'styled-components';
import DetectionModal from '../components/DetectionModal'; // 모달 컴포넌트

const sampleRecords = [
  {
    id: 1,
    videoThumbnail: '/path/to/thumbnail1.jpg',
    videoName: 'MT20240729-01',
    detectionDateTime: '2024-07-29 14:30',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  {
    id: 2,
    videoThumbnail: '/path/to/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: 'MT',
  },
  // 추가적인 탐지 기록을 여기에 추가
];

function DetectionRecords() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleBoxClick = (record) => {
    setSelectedRecord(record);
  };

  const handleCloseModal = () => {
    setSelectedRecord(null);
  };

  return (
    <DetectionRecordsContainer>
      <h2>탐지 기록 페이지</h2>
      <RecordsGrid>
        {sampleRecords.map((record) => (
          <RecordBox key={record.id} onClick={() => handleBoxClick(record)}>
            <Thumbnail src={record.videoThumbnail} alt={record.videoName} />
            <Info>
              <VideoName>{record.videoName}</VideoName>
              <DateTime>{record.detectionDateTime}</DateTime>
              <DetectionType>{record.detectionType}</DetectionType>
            </Info>
          </RecordBox>
        ))}
      </RecordsGrid>
      {selectedRecord && (
        <DetectionModal record={selectedRecord} onClose={handleCloseModal} />
      )}
    </DetectionRecordsContainer>
  );
}

export default DetectionRecords;

const DetectionRecordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  max-height: 700px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 50px auto;
  overflow-y: auto;
`;

const RecordsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const RecordBox = styled.div`
  display: flex;
  width: 350px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: #f0f0f0;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin: 10px;
`;

const Info = styled.div`
  width: 300px;
  padding: 10px;
`;

const VideoName = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const DateTime = styled.p`
  font-size: 14px;
  color: #555;
`;

const DetectionType = styled.p`
  font-size: 14px;
  color: #888;
`;
