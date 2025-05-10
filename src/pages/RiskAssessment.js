import React, { useState } from 'react';
import { Card, Input, Button, Table, message, Spin, Progress, Row, Col, Statistic, Tag } from 'antd';
import { SearchOutlined, WarningOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './RiskAssessment.css';

const { Search } = Input;

const RiskAssessment = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [litigationData, setLitigationData] = useState([]);

  const riskLevels = {
    low: { color: '#52c41a', text: '低風險' },
    medium: { color: '#faad14', text: '中風險' },
    high: { color: '#f5222d', text: '高風險' }
  };

  const litigationColumns = [
    {
      title: '案件編號',
      dataIndex: 'caseNumber',
      key: 'caseNumber',
    },
    {
      title: '案件類型',
      dataIndex: 'caseType',
      key: 'caseType',
      render: (type) => (
        <Tag color={type === '民事' ? 'blue' : type === '刑事' ? 'red' : 'orange'}>
          {type}
        </Tag>
      ),
    },
    {
      title: '案由',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: '判決日期',
      dataIndex: 'judgmentDate',
      key: 'judgmentDate',
    },
    {
      title: '判決結果',
      dataIndex: 'result',
      key: 'result',
      render: (result) => (
        <Tag color={result === '勝訴' ? 'green' : result === '敗訴' ? 'red' : 'default'}>
          {result}
        </Tag>
      ),
    },
    {
      title: '風險等級',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (level) => (
        <Tag color={riskLevels[level].color}>
          {riskLevels[level].text}
        </Tag>
      ),
    }
  ];

  const handleSearch = async (value) => {
    if (!value) {
      message.warning('請輸入企業名稱或統一編號');
      return;
    }

    try {
      setLoading(true);
      
      // 調用經濟部公司登記資料 API
      const companyUrl = `https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6?$format=json&$filter=Business_Accounting_NO eq ${value}`;
      const companyResponse = await axios.get(companyUrl);
      
      if (companyResponse.data.length === 0) {
        message.error('未找到該公司資料');
        setLoading(false);
        return;
      }

      const companyInfo = companyResponse.data[0];
      setCompanyData({
        name: companyInfo.Company_Name,
        id: companyInfo.Business_Accounting_NO,
        address: companyInfo.Company_Location,
        status: companyInfo.Company_Status,
        establishmentDate: companyInfo.Establishment_Date
      });

      // 這裡需要替換為實際的判決檢索系統 API
      const litigationUrl = `https://api.example.com/risk-assessment?q=${value}`;
      const litigationResponse = await axios.get(litigationUrl);
      setLitigationData(litigationResponse.data.litigations || []);

    } catch (error) {
      message.error('查詢失敗，請稍後再試');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRiskScore = (litigations) => {
    if (!litigations || litigations.length === 0) return 100;
    
    const riskFactors = {
      high: 3,
      medium: 2,
      low: 1
    };

    const totalScore = litigations.reduce((acc, curr) => {
      return acc + (riskFactors[curr.riskLevel] || 0);
    }, 0);

    const maxPossibleScore = litigations.length * 3;
    return Math.max(0, 100 - (totalScore / maxPossibleScore) * 100);
  };

  return (
    <div className="risk-assessment">
      <Card className="search-card">
        <div className="search-header">
          <h2>企業風險評估</h2>
          <p>爬取並分析判決檢索系統數據，判斷企業是否涉及法律糾紛</p>
        </div>
        <div className="search-form">
          <Search
            placeholder="請輸入統一編號"
            allowClear
            enterButton={<Button type="primary" icon={<SearchOutlined />}>查詢</Button>}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
      </Card>

      <Spin spinning={loading}>
        {companyData && (
          <>
            <Card className="company-info-card">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <h3>公司基本資料</h3>
                  <div className="company-info">
                    <p><strong>公司名稱：</strong>{companyData.name}</p>
                    <p><strong>統一編號：</strong>{companyData.id}</p>
                    <p><strong>公司地址：</strong>{companyData.address}</p>
                    <p><strong>公司狀態：</strong>{companyData.status}</p>
                    <p><strong>設立日期：</strong>{companyData.establishmentDate}</p>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <Card>
                    <Statistic
                      title="風險指數"
                      value={calculateRiskScore(litigationData)}
                      suffix="/100"
                      valueStyle={{ 
                        color: calculateRiskScore(litigationData) > 70 ? '#52c41a' : 
                               calculateRiskScore(litigationData) > 40 ? '#faad14' : '#f5222d'
                      }}
                      prefix={calculateRiskScore(litigationData) > 70 ? <CheckCircleOutlined /> : 
                             calculateRiskScore(litigationData) > 40 ? <WarningOutlined /> : <CloseCircleOutlined />}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>

            <Card className="risk-overview-card">
              <h3>風險因素分析</h3>
              <div className="risk-factors">
                <div className="risk-factor">
                  <span>民事訴訟風險</span>
                  <Progress percent={70} status="active" />
                </div>
                <div className="risk-factor">
                  <span>刑事訴訟風險</span>
                  <Progress percent={30} status="active" />
                </div>
                <div className="risk-factor">
                  <span>行政訴訟風險</span>
                  <Progress percent={20} status="active" />
                </div>
              </div>
            </Card>

            <Card className="litigation-card">
              <h3>訴訟案件列表</h3>
              <Table
                columns={litigationColumns}
                dataSource={litigationData}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                }}
              />
            </Card>
          </>
        )}
      </Spin>
    </div>
  );
};

export default RiskAssessment; 