import React from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link';
import {Menu} from "antd";
import 'antd/dist/antd.css'

//일부만 공통

const AppLayout = ({children}) => {
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
          <Link href="/"><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
