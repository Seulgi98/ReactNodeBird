import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Col, Input, Menu, Row } from 'antd';
import { useSelector } from 'react-redux';
import {
  HomeOutlined,
  TwitterOutlined,
  UserOutlined,
  UserAddOutlined,
  BellOutlined,
  MailOutlined,
  BookOutlined,
  UnorderedListOutlined,
  MoreOutlined
} from '@ant-design/icons';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  return (
    <div>
      <Menu mode="horizontal">
        <TwitterOutlined style={{color: '#33a1ff', fontSize: '24px', marginLeft: '10px', marginTop: '10px'}}/>
        <Menu.Item key="home"> <Link href="/"><a><HomeOutlined />홈</a></Link></Menu.Item>
        <Menu.Item key="notification"><Link href="/"><a><BellOutlined />알림</a></Link></Menu.Item>
        <Menu.Item key="mail"><Link href="/"><a><MailOutlined />쪽지</a></Link></Menu.Item>
        <Menu.Item key="bookmark"><Link href="/"><a><BookOutlined />북마크</a></Link></Menu.Item>
        <Menu.Item key="list"><Link href="/"><a><UnorderedListOutlined />리스트</a></Link></Menu.Item>
        <Menu.Item key="profile"><Link href="/"><a><UserOutlined />프로필</a></Link></Menu.Item>
        <Menu.Item key="more"><Link href="/"><a><MoreOutlined />더보기</a></Link></Menu.Item>
        <Menu.Item key="search">
          <Input.Search enterButton style={{ verticalAlign: 'middle', marginLeft: '90px' }} />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me
            ? <UserProfile />
            : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://github.com/Seulgi98" target="_blank" rel="noreferrer noopener"><TwitterOutlined/> Twitter Clone : Made by seulgi98</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;