import React, {useState, useCallback, useMemo} from 'react';
import {Form, Input, Button} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  margin-Top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = ({setIsLoggedIn}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  // const style = useMemo(() => ({marginTop: 10}), []);
  const onsubmitForm = useCallback((e) => {
    console.log(e.target.value); //error 발생?
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
        <label htmlFor="user-id">비밀번호</label>
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
      {/*<ButtonWrapper style={style}> useMemo를 쓸 경우 */}
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
