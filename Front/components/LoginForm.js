import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { LOG_IN_REQUEST } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm} style={{marginLeft: '10px', marginTop: '10px'}}>
      <div>
        <label htmlFor="user-email" style={{fontSize: '15px'}}>이메일</label>
        <br />
        <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor="user-password" style={{fontSize: '15px', marginTop: '10px'}}>비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper style={{marginTop: '10px'}}>
        <Button type="primary" htmlType="submit" loading={logInLoading} style={{borderRadius:"20px"}}>로그인</Button>
        <Link href="/signup"><a><Button style={{marginLeft: '10px', borderRadius:"20px"}}>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
