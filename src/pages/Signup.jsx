import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: '',
    user_pw: '',
    user_name: '',
    user_emailLocal: '',
    user_emailDomain: 'gmail.com',
    user_phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.user_id) newErrors.user_id = '아이디는 필수 항목입니다.';
    if (!formData.user_pw) newErrors.user_pw = '비밀번호는 필수 항목입니다.';
    if (formData.user_pw !== formData.user_confirmPw) newErrors.user_confirmPw = '비밀번호가 일치하지 않습니다.';
    if (!formData.user_name) newErrors.user_name = '이름은 필수 항목입니다.';
    if (!formData.user_emailLocal) newErrors.user_emailLocal = '이메일 로컬 부분은 필수 항목입니다.';
    if (!/^[\w-.]+$/.test(formData.user_emailLocal)) newErrors.user_emailLocal = '유효한 이메일 주소를 입력해 주세요.';
    if (!/^\d{10,11}$/.test(formData.user_phone)) newErrors.user_phone = '전화번호는 10~11자리 숫자여야 합니다.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSubmit = {
        user_id: formData.user_id,
        user_pw: formData.user_pw,
        user_name: formData.user_name,
        user_email: `${formData.user_emailLocal}@${formData.user_emailDomain}`,
        user_phone: formData.user_phone,
      };

      console.log(formDataToSubmit);

      /*
      fetch('http://172.30.1.85:9090/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('회원가입 성공');
          navigate('/login'); // 로그인 페이지로 이동
        } else {
          alert('회원가입 실패');
        }
      })
      .catch(error => {
        console.error('오류 발생:', error);
        alert('회원가입 실패');
      });
      */

      alert('회원가입 성공');
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <SignupContainer>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="user_id">아이디:</Label>
          <Input
            type="text"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
          />
          {errors.user_id && <ErrorMessage>{errors.user_id}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="user_pw">비밀번호:</Label>
          <Input
            type="password"
            id="user_pw"
            name="user_pw"
            value={formData.user_pw}
            onChange={handleChange}
          />
          {errors.user_pw && <ErrorMessage>{errors.user_pw}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="user_confirmPw">비밀번호 확인:</Label>
          <Input
            type="password"
            id="user_confirmPw"
            name="user_confirmPw"
            value={formData.user_confirmPw}
            onChange={handleChange}
          />
          {errors.user_confirmPw && <ErrorMessage>{errors.user_confirmPw}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="user_name">이름:</Label>
          <Input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
          />
          {errors.user_name && <ErrorMessage>{errors.user_name}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="user_emailLocal">이메일:</Label>
          <EmailInputContainer>
            <Input
              type="text"
              id="user_emailLocal"
              name="user_emailLocal"
              value={formData.user_emailLocal}
              onChange={handleChange}
            />
            @
            <Select
              name="user_emailDomain"
              value={formData.user_emailDomain}
              onChange={handleChange}
            >
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
              <option value="yahoo.com">yahoo.com</option>
            </Select>
          </EmailInputContainer>
          {errors.user_emailLocal && <ErrorMessage>{errors.user_emailLocal}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="user_phone">전화번호:</Label>
          <PhoneInputContainer>
            <Input
              type="text"
              id="user_phone"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
            />
          </PhoneInputContainer>
          {errors.user_phone && <ErrorMessage>{errors.user_phone}</ErrorMessage>}
        </FormGroup>
        <ButtonGroup>
          <Button type="submit">회원가입</Button>
          <BackButton type="button" onClick={handleGoBack}>뒤로 가기</BackButton>
        </ButtonGroup>
      </form>
    </SignupContainer>
  );
}

export default Signup;

const SignupContainer = styled.div`
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

  @media (max-width:768px){
    width: 300px;
    padding: 50px 20px;
    margin-top: 20px;
    border-style: none;
    box-shadow: none;
  }
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

const ButtonGroup =styled.div`
  display: flex;
  justify-content: center;
`;
