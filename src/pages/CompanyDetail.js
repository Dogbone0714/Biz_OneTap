import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Tabs, Table, Progress, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './CompanyDetail.css';

const { TabPane } = Tabs;

const CompanyDetail = () => {
  const { id } = useParams();

  const companyInfo = {
    name: '台積電股份有限公司',
    creditCode: '22099131',
    legalPerson: '魏哲家',
    registeredCapital: '2593億新台幣',
    establishDate: '1987-02-21',
    status: '在業',
    address: '新竹市東區力行六路8號',
    businessScope: '積體電路之製造、銷售、測試及電腦輔助設計業務',
  };

  const riskData = {
    riskScore: 85,
    riskLevel: '低風險',
    riskFactors: [
      { name: '經營風險', score: 90 },
      { name: '法律風險', score: 85 },
      { name: '財務風險', score: 88 },
      { name: '信用風險', score: 92 },
    ],
  };

  const patentColumns = [
    {
      title: '專利名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '專利類型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '申請日期',
      dataIndex: 'applyDate',
      key: 'applyDate',
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const patentData = [
    {
      key: '1',
      name: '半導體製程方法及其裝置',
      type: '發明專利',
      applyDate: '2023-01-15',
      status: '已授權',
    },
    {
      key: '2',
      name: '晶圓檢測系統及其方法',
      type: '發明專利',
      applyDate: '2023-02-20',
      status: '審查中',
    }
  ];

  return (
    <div className="company-detail">
      <Card className="company-info-card">
        <Descriptions title="企業基本資料" bordered>
          <Descriptions.Item label="企業名稱">{companyInfo.name}</Descriptions.Item>
          <Descriptions.Item label="統一編號">{companyInfo.creditCode}</Descriptions.Item>
          <Descriptions.Item label="代表人">{companyInfo.legalPerson}</Descriptions.Item>
          <Descriptions.Item label="資本額">{companyInfo.registeredCapital}</Descriptions.Item>
          <Descriptions.Item label="設立日期">{companyInfo.establishDate}</Descriptions.Item>
          <Descriptions.Item label="營運狀態">{companyInfo.status}</Descriptions.Item>
          <Descriptions.Item label="公司地址" span={3}>{companyInfo.address}</Descriptions.Item>
          <Descriptions.Item label="營業項目" span={3}>{companyInfo.businessScope}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className="risk-assessment-card">
        <h2>風險評估</h2>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Card>
              <Statistic
                title="風險指數"
                value={riskData.riskScore}
                suffix="/100"
                valueStyle={{ color: riskData.riskScore > 70 ? '#3f8600' : '#cf1322' }}
                prefix={riskData.riskScore > 70 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              />
            </Card>
          </Col>
          <Col span={16}>
            <Card>
              <h3>風險因素分析</h3>
              {riskData.riskFactors.map((factor) => (
                <div key={factor.name} className="risk-factor">
                  <span>{factor.name}</span>
                  <Progress percent={factor.score} status="active" />
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </Card>

      <Card className="detail-tabs-card">
        <Tabs defaultActiveKey="1">
          <TabPane tab="專利資料" key="1">
            <Table columns={patentColumns} dataSource={patentData} />
          </TabPane>
          <TabPane tab="法律訴訟" key="2">
            <p>暫無法律訴訟資料</p>
          </TabPane>
          <TabPane tab="公司年報" key="3">
            <p>暫無公司年報資料</p>
          </TabPane>
          <TabPane tab="關係企業" key="4">
            <p>暫無關係企業資料</p>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default CompanyDetail; 