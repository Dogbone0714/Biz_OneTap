import React, { useState } from 'react';
import { Typography, Card, Row, Col, Input, Button, message, Divider, Spin, Radio, Space } from 'antd';
import { SearchOutlined, BarChartOutlined, SafetyOutlined, TeamOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('id'); // 'id' 或 'business'
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    if (!value) {
      message.warning('請輸入統一編號');
      return;
    }

    try {
      setLoading(true);
      let url;
      
      if (searchType === 'id') {
        url = `https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6?$format=json&$filter=Business_Accounting_NO eq '${value}'&$skip=0&$top=1000`;
      } else if (searchType === 'business') {
        url = `https://data.gcis.nat.gov.tw/od/data/api/7E6AFA72-AD6A-46D3-8681-ED77951D912D?$format=json&$filter=President_No eq '${value}'&$skip=0&$top=1000`;
      }

      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.length === 0) {
        message.error('未找到相關資料');
        return;
      }

      // 根據查詢類型導向不同的詳情頁面
      const id = searchType === 'id' ? response.data[0].Business_Accounting_NO : response.data[0].President_No;
      navigate(`/company/${id}`);
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
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Radio.Group 
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="id">公司統一編號</Radio.Button>
              <Radio.Button value="business">商業登記</Radio.Button>
            </Radio.Group>
            <Spin spinning={loading}>
              <Search
                placeholder="請輸入統一編號"
                allowClear
                enterButton={<Button type="primary" icon={<SearchOutlined />}>查詢</Button>}
                size="large"
                onSearch={handleSearch}
              />
            </Spin>
          </Space>
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
                <li>整合經濟部公司登記資料</li>
                <li>提供企業風險評估分析</li>
                <li>支援專利與商標查詢</li>
                <li>即時更新企業資訊</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home; 