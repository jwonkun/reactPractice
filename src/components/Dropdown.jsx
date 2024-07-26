// src/components/Dropdown.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import './Dropdown.css';

const Dropdown = ({ isOpen, closeDropdown, username, toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = (event) => {
        if (!event.target.closest('.dropdown-menu')) {
          closeDropdown();
        }
      };
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isOpen, closeDropdown]);

  if (!isOpen) return null;

  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      // 로그아웃 처리 로직을 여기에 추가 (예: 토큰 삭제, 세션 종료 등)
      navigate('/login');
    }
  };

  return ReactDOM.createPortal(
    <div className="dropdown-menu">
      <p>{`${username}님 안녕하세요!`}</p>
      <Link to="/profile-edit">회원정보수정</Link>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? '🌙 다크 모드 해제' : '🌞 다크 모드 활성화'}
      </button>
      <button onClick={handleLogout}>로그아웃</button>
    </div>,
    document.body
  );
};

export default Dropdown;
