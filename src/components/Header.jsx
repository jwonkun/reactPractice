import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from './Dropdown';
import NotificationDropdown from './NotificationDropdown';
import styled from 'styled-components';

function Header() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(true); // 알림 여부를 위한 상태
  const username = '사용자 이름';

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen) {
      setUnreadNotifications(false); // 알림 드롭다운을 열면 포인트 제거
    }
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
    setUnreadNotifications(false); // 알림 드롭다운이 닫힐 때 포인트 제거
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <HeaderContainer className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
      <Nav>
        <Link to="/main">
          <Logo src="/images/CattleBell_logo.png" alt="CattleBell Logo" />
        </Link>
        <StyledLink to="/camera-management" active={location.pathname === '/camera-management'}>
          카메라 관리
        </StyledLink>
        <StyledLink to="/detection-records" active={location.pathname === '/detection-records'}>
          탐지 기록
        </StyledLink>
      </Nav>
      <Icons>
        <NotificationIconWrapper onClick={toggleNotification}>
          🔔
          {unreadNotifications && <NotificationPoint />}
        </NotificationIconWrapper>
        <NotificationDropdown
          isOpen={isNotificationOpen}
          closeDropdown={closeNotification}
        />
        <span className="icon" onClick={toggleDropdown}>👤</span>
        <Dropdown
          isOpen={isDropdownOpen}
          closeDropdown={closeDropdown}
          username={username}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
      </Icons>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &.dark-mode {
    background-color: #333;
    color: #e0e0e0;
  }
`;

const Logo = styled.img`
  height: 50px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: end;
  font-size: 20px;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  font-size: ${(props) => (props.active ? '24px' : '20px')};
  color: ${(props) => (props.active ? '#000' : '#555')};
  text-decoration: none;

  &:hover {
    color: ${(props) => (props.active ? '#000' : '#000')};
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;

  .icon {
    font-size: 30px;
    cursor: pointer;
  }
`;

const NotificationIconWrapper = styled.span`
  position: relative;
  font-size: 30px;
  cursor: pointer;
`;

const NotificationPoint = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
`;
