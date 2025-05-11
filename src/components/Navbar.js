import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <Menu 
      mode="horizontal" 
      selectedKeys={[location.pathname]}
      className="navbar"
    >
      <Menu.Item key="/">
        <Link to="/">首頁</Link>
      </Menu.Item>
      <Menu.Item key="/search">
        <Link to="/search">企業查詢</Link>
      </Menu.Item>
      <Menu.Item key="/about">
        <Link to="/about">關於我們</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar; 