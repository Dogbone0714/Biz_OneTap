import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <Menu 
      mode="horizontal" 
      selectedKeys={[location.pathname]}
      className="navbar"
    >
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to="/">首頁</Link>
      </Menu.Item>
      <Menu.Item key="/search" icon={<SearchOutlined />}>
        <Link to="/search">企業查詢</Link>
      </Menu.Item>
      <Menu.Item key="/about" icon={<InfoCircleOutlined />}>
        <Link to="/about">關於我們</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar; 