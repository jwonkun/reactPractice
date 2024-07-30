import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import CameraManagement from './pages/CameraManagement';
import DetectionRecords from './pages/DetectionRecords';
import ProfileEdit from './pages/ProfileEdit';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LayoutWithHeader />}>
          <Route path="/main" element={<Main />} />
          <Route path="/camera-management" element={<CameraManagement />} />
          <Route path="/detection-records" element={<DetectionRecords />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

function LayoutWithHeader() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
