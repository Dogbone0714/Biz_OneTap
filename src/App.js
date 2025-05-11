import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Result, Button } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CompanySearch from './pages/CompanySearch';
import CompanyDetail from './pages/CompanyDetail';
import About from './pages/About';
import './App.css';

const { Content, Footer } = Layout;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="頁面發生錯誤"
          subTitle="請稍後再試或聯繫客服"
          extra={[
            <Button type="primary" key="reload" onClick={() => window.location.reload()}>
              重新整理
            </Button>
          ]}
        />
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </Router>
  );
}

export default App; 