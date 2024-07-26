// src/components/Modal.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Modal.css';

function Modal({ isOpen, onClose, username, onLogout }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✖</button>
        <h2>{username}님 안녕하세요!</h2>
        <Link to="/profile-edit" onClick={onClose}>회원정보수정</Link>
        <button className="logout-button" onClick={onLogout}>로그아웃</button>
      </div>
    </div>
  );
}

export default Modal;
