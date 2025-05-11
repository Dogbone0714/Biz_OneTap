import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CompanySearch from './pages/CompanySearch';
import CompanyDetail from './pages/CompanyDetail';
import About from './pages/About';
import './App.css';

const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Navbar />
        <Content className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<CompanySearch />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Content>
        <Footer className="footer">
          企業一指通 ©{new Date().getFullYear()} Created by Your Company
        </Footer>
      </Layout>
    </Router>
  );
}

export default App; 