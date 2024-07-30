import React, { useState } from 'react';
import styled from 'styled-components';

function CameraManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [cameras, setCameras] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  const addCamera = (camera) => {
    if (isEditing && editIndex !== null) {
      const updatedCameras = cameras.map((cam, index) =>
        index === editIndex ? camera : cam
      );
      setCameras(updatedCameras);
    } else {
      setCameras([...cameras, camera]);
    }
    closeModal();
  };

  const editCamera = (index) => {
    setEditIndex(index);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const deleteCamera = (index) => {
    const confirmed = window.confirm('정말 이 카메라를 삭제하시겠습니까?');
    if (confirmed) {
      setCameras(cameras.filter((_, i) => i !== index));
    }
  };

  return (
    <CamManageContainer>
      <Button onClick={openModal}>카메라 추가</Button>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h3>{isEditing ? '카메라 수정' : '카메라 추가'}</h3>
            <CameraForm
              addCamera={addCamera}
              closeModal={closeModal}
              initialData={isEditing ? cameras[editIndex] : null}
            />
          </ModalContent>
        </Modal>
      )}

      <CameraTable>
        <thead>
          <tr>
            <th>이름</th>
            <th>ID</th>
            <th>설치 위치</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {cameras.map((camera, index) => (
            <tr key={index}>
              <td>{camera.name}</td>
              <td>{camera.id}</td>
              <td>{camera.location}</td>
              <td>
                <Button onClick={() => editCamera(index)}>수정</Button>
                <Button onClick={() => deleteCamera(index)}>삭제</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </CameraTable>
    </CamManageContainer>
  );
}

function CameraForm({ addCamera, closeModal, initialData }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    id: initialData?.id || '',
    location: initialData?.location || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCamera(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">카메라 이름:</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="id">카메라 ID:</Label>
        <Input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="location">설치 위치:</Label>
        <Input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit">{initialData ? '수정' : '추가'}</Button>
      <Button type="button" onClick={closeModal}>취소</Button>
    </Form>
  );
}

export default CameraManagement;

const CamManageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100vh;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CameraTable = styled.table`
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }
`;
