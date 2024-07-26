// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 로직
    navigate('/main');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleFindIdPw = () => {
    navigate('/find-id-pw');
  };

  return (
    <div className="entrance-container">
        <div className="introducing-container">
            <h1>어서오세요!</h1>
        </div>
        <div className="login-container">
        <h2>로그인</h2>
        <div className="form-group">
            <label htmlFor="id">아이디:</label>
            <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="password">비밀번호:</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button onClick={handleLogin}>로그인</button>
        <button onClick={handleSignup}>회원가입</button>
        <button onClick={handleFindIdPw}>ID/PW 찾기</button>
        </div>
    </div>
  );
}

export default Login;
