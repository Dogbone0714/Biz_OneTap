import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CompanySearch from './pages/CompanySearch';
import CompanyDetail from './pages/CompanyDetail';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Navbar />
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<CompanySearch />} />
              <Route path="/company/:id" element={<CompanyDetail />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          企業一指通 ©{new Date().getFullYear()} 版權所有
        </Footer>
      </Layout>
    </Router>
  );
}

export default App; 