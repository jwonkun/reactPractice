import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    <DropdownMenu className="dropdown-menu">
      <p>{`${username}님 안녕하세요!`}</p>
      <Link to="/profile-edit">회원정보수정</Link>
      <button className='button' onClick={toggleDarkMode}>
        {isDarkMode ? '🌙 다크 모드 해제' : '🌞 다크 모드 활성화'}
      </button>
      <button className='button' onClick={handleLogout}>로그아웃</button>
    </DropdownMenu>,
    document.body
  );
};

export default Dropdown;

const DropdownMenu =styled.div`
  position: fixed;
  top: 50px;
  right: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-weight: bold;
    font-size: 20px;
  }
`;