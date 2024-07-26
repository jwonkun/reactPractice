// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import './Header.css';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const username = '사용자 이름'; // 실제 사용자 이름으로 변경

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <header className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
      <nav className="nav">
      <Link to="/main">
        <img className="logo" src="/images/CattleBell_logo.png" alt="CattleBell Logo" />
      </Link>
        <Link to="/camera-management">카메라 관리</Link>
        <Link to="/detection-records">탐지 기록</Link>
      </nav>
      <div className="icons">
        <span className="icon">🔔</span>
        <span className="icon" onClick={toggleDropdown}>👤</span>
        <Dropdown
          isOpen={isDropdownOpen}
          closeDropdown={closeDropdown}
          username={username}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
      </div>
    </header>
  );
}

export default Header;
