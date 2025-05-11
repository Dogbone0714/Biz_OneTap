import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Tabs, Table, Progress, Row, Col, Statistic, Spin, message } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import axios from 'axios';
import './CompanyDetail.css';

const { TabPane } = Tabs;

const CompanyDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  const [directorsData, setDirectorsData] = useState([]);
  const [loadingDirectors, setLoadingDirectors] = useState(false);

  const fetchCompanyData = async () => {
    try {
      const url = `https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6?$format=json&$filter=Business_Accounting_NO eq '${id}'&$skip=0&$top=1000`;
      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.length === 0) {
        message.error('未找到公司資料');
        return;
      }
      
      setCompanyData(response.data[0]);
    } catch (error) {
      message.error('獲取公司資料失敗');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDirectorsData = async () => {
    try {
      setLoadingDirectors(true);
      const url = `https://data.gcis.nat.gov.tw/od/data/api/236EE382-4942-41A9-BD03-CA0709025E7C?$format=json&$filter=Business_Accounting_NO eq '${id}'&$skip=0&$top=1000`;
      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.length > 0) {
        setDirectorsData(response.data);
      }
    } catch (error) {
      message.error('獲取董監事資料失敗');
      console.error('API Error:', error);
    } finally {
      setLoadingDirectors(false);
    }
  };

  useEffect(() => {
    fetchCompanyData();
    fetchDirectorsData();
  }, [id]);

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

  const directorsColumns = [
    {
      title: '職稱',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: '姓名',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '所代表法人',
      dataIndex: 'Representative_Company',
      key: 'Representative_Company',
    },
    {
      title: '出資額',
      dataIndex: 'Investment_Amount',
      key: 'Investment_Amount',
      render: (text) => text ? `NT$ ${text.toLocaleString()}` : '-',
    },
    {
      title: '持股數',
      dataIndex: 'Shares',
      key: 'Shares',
      render: (text) => text ? text.toLocaleString() : '-',
    },
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="error-container">
        <Card>
          <h2>未找到公司資料</h2>
        </Card>
      </div>
    );
  }

  return (
    <div className="company-detail">
      <Tabs defaultActiveKey="1">
        <TabPane tab="基本資料" key="1">
          <Card className="detail-card">
            <Descriptions title="公司基本資料" bordered>
              <Descriptions.Item label="公司名稱" span={3}>
                {companyData.Company_Name}
              </Descriptions.Item>
              <Descriptions.Item label="統一編號">
                {companyData.Business_Accounting_NO}
              </Descriptions.Item>
              <Descriptions.Item label="公司狀態">
                {companyData.Company_Status}
              </Descriptions.Item>
              <Descriptions.Item label="資本額">
                NT$ {companyData.Capital_Stock_Amount.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="代表人" span={3}>
                {companyData.Responsible_Name}
              </Descriptions.Item>
              <Descriptions.Item label="公司所在地" span={3}>
                {companyData.Company_Location}
              </Descriptions.Item>
              <Descriptions.Item label="登記機關" span={3}>
                {companyData.Authority}
              </Descriptions.Item>
              <Descriptions.Item label="設立日期">
                {companyData.Establishment_Date}
              </Descriptions.Item>
              <Descriptions.Item label="最後變更日期">
                {companyData.Last_Modified_Date}
              </Descriptions.Item>
              <Descriptions.Item label="營業項目" span={3}>
                {companyData.Business_Items}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </TabPane>
        <TabPane tab="董監事資料" key="2">
          <Card className="detail-card">
            <Spin spinning={loadingDirectors}>
              {directorsData.length > 0 ? (
                <Table
                  columns={directorsColumns}
                  dataSource={directorsData}
                  rowKey={(record) => `${record.Title}-${record.Name}`}
                  pagination={false}
                />
              ) : (
                <div className="no-data">無董監事資料</div>
              )}
            </Spin>
          </Card>
        </TabPane>
      </Tabs>

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