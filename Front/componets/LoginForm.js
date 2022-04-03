import React, {useState, useCallback} from 'react';
import {Form, Input, Button} from 'antd';
import Link from 'next/link';
import propTypes from 'prop-types';
import styled from 'styled-components';
import useInput from "../hooks/useInput";

const ButtonWrapper = styled.div`
  margin-Top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = ({setIsLoggedIn}) => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onsubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true); //로그인을 하는 순간 isLoggedIn이 true로 바뀌고 UserProfile로 바뀜
  },[id, password]);

  return (
    <FormWrapper onFinish={onsubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required/>
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

LoginForm.propTypes = {
  setIsLoggedIn: propTypes.func.isRequired
}

export default LoginForm;
