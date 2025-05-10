import React from 'react';
import { Typography, Card, Row, Col, Input, Button } from 'antd';
import { SearchOutlined, BarChartOutlined, SafetyOutlined, TeamOutlined } from '@ant-design/icons';
import './Home.css';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <Title level={1}>企業一指通</Title>
        <Paragraph className="subtitle">
          專業的企業資訊查詢與風險評估平台
        </Paragraph>
        <Search
          placeholder="輸入企業名稱、統一編號或法人姓名"
          enterButton={<Button type="primary" icon={<SearchOutlined />}>查詢</Button>}
          size="large"
          className="search-bar"
        />
      </div>

      <Row gutter={[24, 24]} className="features">
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <SearchOutlined className="feature-icon" />
            <Title level={4}>企業查詢</Title>
            <Paragraph>快速查詢企業工商信息、專利、判決等數據</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <BarChartOutlined className="feature-icon" />
            <Title level={4}>數據分析</Title>
            <Paragraph>可視化展示企業關聯、財務狀況及風險指數</Paragraph>
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
    </div>
  );
};

export default Home; 