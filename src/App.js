// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindIdPw from './pages/FindIdPw';
import Main from './pages/Main';
import CameraManagement from './pages/CameraManagement';
import DetectionRecords from './pages/DetectionRecords';
import ProfileEdit from './pages/ProfileEdit';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-id-pw" element={<FindIdPw />} />
        <Route path="/main" element={<Main />} />
        <Route path="/camera-management" element={<CameraManagement />} />
        <Route path="/detection-records" element={<DetectionRecords />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
