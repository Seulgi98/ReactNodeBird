import React, {useState} from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link';
import {Menu, Input, Row, Col} from "antd";
import 'antd/dist/antd.css'

import UserProfile from '../componets/UserProfile';
import LoginForm from '../componets/LoginForm';

//일부만 공통

const AppLayout = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          <Input.Search enterButton style={{verticalAlign: 'middle'}}/>
        </Menu.Item>
        <Menu.Item>
          <Link href="/"><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile/> : <LoginForm/>}
        </Col>
        <Col xs={24} md={12}>
        {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://velog.io/@hanny1120" target="_blank" rel="noreferrer noopener">Seulgi98 Velog</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
