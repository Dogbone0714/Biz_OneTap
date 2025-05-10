import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, SearchOutlined, BarChartOutlined, TeamOutlined } from '@ant-design/icons';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">企業一指通</Link>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={[
          {
            key: '/',
            icon: <HomeOutlined />,
            label: <Link to="/">首頁</Link>,
          },
          {
            key: '/search',
            icon: <SearchOutlined />,
            label: <Link to="/search">企業查詢</Link>,
          },
          {
            key: '/analysis',
            icon: <BarChartOutlined />,
            label: <Link to="/analysis">數據分析</Link>,
          },
          {
            key: '/about',
            icon: <TeamOutlined />,
            label: <Link to="/about">關於我們</Link>,
          },
        ]}
      />
    </div>
  );
};

export default Navbar; 