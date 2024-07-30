// src/pages/ProfileEdit.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function ProfileEdit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: 'currentUserId',
    password: '',
    confirmPassword: '',
    name: '',
    emailLocal: '',
    emailDomain: 'gmail.com',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // 실제 데이터로 대체될 부분
    const fetchData = async () => {
      const userProfile = {
        id: 'currentUserId',
        name: 'Current User',
        emailLocal: 'current.email',
        emailDomain: 'gmail.com',
        phoneNumber: '01012345678'
      };
      setFormData(userProfile);
    };
    
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.password && formData.password !== formData.confirmPassword) newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    if (!formData.name) newErrors.name = '이름은 필수 항목입니다.';
    if (!formData.emailLocal) newErrors.emailLocal = '이메일은 필수 항목입니다.';
    if (!/\S+/.test(formData.emailLocal)) newErrors.emailLocal = '유효한 이메일 주소를 입력해 주세요.';
    if (!/^\d{11}$/.test(formData.phoneNumber)) newErrors.phoneNumber = '전화번호는 11자리 숫자여야 합니다.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSubmit = {
        ...formData,
        email: `${formData.emailLocal}@${formData.emailDomain}`,
        phone: `${formData.phoneCarrier}-${formData.phoneNumber}`,
      };
      console.log('수정된 회원정보:', formDataToSubmit);
      // 실제 회원정보 수정 API 호출 부분
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <EditContainer>
      <h2>회원정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="id">아이디:</Label>
          <Input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">비밀번호:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">비밀번호 확인:</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="name">이름:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="emailLocal">이메일:</Label>
          <EmailInputContainer>
            <Input
              type="text"
              id="emailLocal"
              name="emailLocal"
              value={formData.emailLocal}
              onChange={handleChange}
            />
            @
            <Select
              name="emailDomain"
              value={formData.emailDomain}
              onChange={handleChange}
            >
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
              <option value="yahoo.com">yahoo.com</option>
            </Select>
          </EmailInputContainer>
          {errors.emailLocal && <ErrorMessage>{errors.emailLocal}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone">전화번호:</Label>
          <PhoneInputContainer>
            <Input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </PhoneInputContainer>
          {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber}</ErrorMessage>}
        </FormGroup>
        <Button type="submit">수정하기</Button>
        <BackButton type="button" onClick={handleGoBack}>뒤로 가기</BackButton>
      </form>
    </EditContainer>
  );
}

export default ProfileEdit;

const EditContainer = styled.div`
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  border: 2px solid #ccc;
  padding: 50px 100px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  width: calc(100% - 16px);
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  width: calc(100% - 16px);
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const EmailInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PhoneInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 5px 0 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;
