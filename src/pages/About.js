import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import { 
  SearchOutlined, 
  SafetyCertificateOutlined, 
  TeamOutlined, 
  ApiOutlined,
  DollarOutlined 
} from '@ant-design/icons';
import './About.css';

const { Title, Paragraph } = Typography;

const About = () => {
  const features = [
    {
      icon: <SearchOutlined className="feature-icon" />,
      title: '整合式資訊查詢',
      description: '整合工商登記、專利檢索、判決查詢、工會資訊及用戶評價，提供全方位的企業資訊服務。'
    },
    {
      icon: <SafetyCertificateOutlined className="feature-icon" />,
      title: '風險評估系統',
      description: '透過視覺化數據呈現，幫助使用者快速掌握企業關聯、財務狀況及風險指數。'
    },
    {
      icon: <TeamOutlined className="feature-icon" />,
      title: '專業顧問服務',
      description: '提供專業的企業分析與諮詢服務，協助使用者做出更明智的決策。'
    },
    {
      icon: <ApiOutlined className="feature-icon" />,
      title: 'API 整合服務',
      description: '提供靈活的 API 介面，方便企業進行系統整合與自動化處理。'
    },
    {
      icon: <DollarOutlined className="feature-icon" />,
      title: '多元營運模式',
      description: '採用訂閱與授權模式，為不同需求的用戶提供客製化的服務方案。'
    }
  ];

  return (
    <div className="about-page">
      <Card className="about-header">
        <Title level={2}>關於我們</Title>
        <Paragraph className="about-intro">
          「公司一指通」是一款專業的企業資訊查詢與風險評估平台，整合工商登記、專利檢索、判決查詢、工會資訊及用戶評價，幫助投資人、企業主與求職者快速掌握企業動態。
        </Paragraph>
        <Paragraph className="about-intro">
          透過視覺化數據呈現，使用者能夠一指掌握企業關聯、財務狀況及風險指數，提升決策效率。平台同時提供進階查詢、API 整合與專業顧問服務，並採用訂閱與授權模式實現盈利，打造高效透明的商業環境。
        </Paragraph>
      </Card>

      <Divider />

      <Title level={3} className="features-title">我們的特色</Title>
      <Row gutter={[24, 24]} className="features-container">
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card className="feature-card">
              {feature.icon}
              <Title level={4}>{feature.title}</Title>
              <Paragraph>{feature.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="mission-card">
        <Title level={3}>我們的使命</Title>
        <Paragraph>
          致力於提供最完整、最準確的企業資訊服務，幫助使用者做出更明智的商業決策。我們相信，透過資訊的透明化與專業的分析工具，能夠為台灣的商業環境帶來更多正向的改變。
        </Paragraph>
      </Card>
    </div>
  );
};

export default About; 