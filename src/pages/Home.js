import React, { useState } from 'react';
import { Typography, Card, Row, Col, Input, Button, message, Divider } from 'antd';
import { SearchOutlined, BarChartOutlined, SafetyOutlined, TeamOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    if (!value) {
      message.warning('請輸入查詢內容');
      return;
    }

    try {
      setLoading(true);
      const url = `https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6?$format=json&$filter=Business_Accounting_NO eq '${value}' or Company_Name eq '${value}' or Responsible_Name eq '${value}'&$top=1`;
      
      const response = await axios.get(url);
      const data = response.data;

      if (data && data.length > 0) {
        // 導航到公司詳情頁面
        navigate(`/company/${data[0].Business_Accounting_NO}`);
      } else {
        message.info('未找到相關企業資料');
      }
    } catch (error) {
      message.error('查詢失敗，請稍後再試');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <Title level={1}>企業一指通</Title>
        <Paragraph className="subtitle">
          專業的企業資訊查詢與風險評估平台
        </Paragraph>
        <div className="search-container">
          <Search
            placeholder="請輸入統一編號、公司名稱或代表人姓名"
            allowClear
            enterButton={<Button type="primary" icon={<SearchOutlined />}>查詢</Button>}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={handleSearch}
            loading={loading}
          />
        </div>
      </div>

      <Row gutter={[24, 24]} className="features">
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <SearchOutlined className="feature-icon" />
            <Title level={4}>企業查詢</Title>
            <Paragraph>快速查詢企業工商資料、專利、判決等數據</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <BarChartOutlined className="feature-icon" />
            <Title level={4}>數據分析</Title>
            <Paragraph>視覺化展示企業關聯、財務狀況及風險指數</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <SafetyOutlined className="feature-icon" />
            <Title level={4}>風險評估</Title>
            <Paragraph>專業的企業風險預警與評估服務</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <TeamOutlined className="feature-icon" />
            <Title level={4}>顧問服務</Title>
            <Paragraph>提供專業的企業諮詢與顧問服務</Paragraph>
          </Card>
        </Col>
      </Row>

      <Divider />

      <div className="about-section">
        <Title level={2} className="section-title">
          <InfoCircleOutlined /> 關於我們
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card className="about-card">
              <Title level={3}>平台介紹</Title>
              <Paragraph>
                「企業一指通」是一款專業的企業資訊查詢與風險評估平台，整合工商登記、專利檢索、判決查詢、工會資訊及用戶評價，幫助投資人、企業主與求職者快速掌握企業動態。
              </Paragraph>
              <Paragraph>
                透過視覺化數據呈現，使用者能夠一指掌握企業關聯、財務狀況及風險指數，提升決策效率。平台同時提供進階查詢、API 整合與專業顧問服務，並採用訂閱與授權模式實現盈利，打造高效透明的商業環境。
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card className="about-card">
              <Title level={3}>服務特色</Title>
              <ul className="feature-list">
                <li>整合式資訊查詢：提供全方位的企業資訊服務</li>
                <li>風險評估系統：快速掌握企業關聯與風險指數</li>
                <li>專業顧問服務：協助做出更明智的商業決策</li>
                <li>API 整合服務：方便企業進行系統整合與自動化處理</li>
                <li>多元營運模式：為不同需求的用戶提供客製化的服務方案</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home; 