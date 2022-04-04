//일부만 공통
import React from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link';
import {useSelector} from 'react-redux';
import {Menu, Input, Row, Col} from "antd";
import 'antd/dist/antd.css'
import styled from 'styled-components'

import UserProfile from '../componets/UserProfile';
import LoginForm from '../componets/LoginForm';

//컴포넌트 스타일링
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({children}) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>노드 버드</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/"><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
        {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://github.com/Seulgi98" target="_blank" rel="noreferrer noopener">Made by seulgi98</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
