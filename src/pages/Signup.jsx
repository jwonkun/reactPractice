// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    password: '',
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id) newErrors.id = '아이디는 필수 항목입니다.';
    if (!formData.password) newErrors.password = '비밀번호는 필수 항목입니다.';
    if (!formData.name) newErrors.name = '이름은 필수 항목입니다.';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '유효한 이메일 주소를 입력해 주세요.';
    if (!formData.phone || !/^\d{10,11}$/.test(formData.phone)) newErrors.phone = '전화번호는 10~11자리 숫자여야 합니다.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // 서버에 데이터 제출 또는 다른 작업 수행
      console.log('회원가입 데이터:', formData);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">아이디:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
          {errors.id && <p className="error">{errors.id}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">전화번호:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <button type="submit">회원가입</button>
        <button type="button" className="back-button" onClick={handleGoBack}>뒤로 가기</button>
      </form>
    </div>
  );
}

export default Signup;
