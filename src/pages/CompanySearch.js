import React, { useState } from 'react';
import { Card, Input, Button, Table, message, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CompanySearch.css';

const { Search } = Input;

const CompanySearch = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      title: '公司名稱',
      dataIndex: 'Company_Name',
      key: 'Company_Name',
    },
    {
      title: '統一編號',
      dataIndex: 'Business_Accounting_NO',
      key: 'Business_Accounting_NO',
    },
    {
      title: '代表人',
      dataIndex: 'Responsible_Name',
      key: 'Responsible_Name',
    },
    {
      title: '資本額',
      dataIndex: 'Capital_Stock_Amount',
      key: 'Capital_Stock_Amount',
      render: (text) => `NT$ ${text.toLocaleString()}`,
    },
    {
      title: '設立日期',
      dataIndex: 'Establishment_Date',
      key: 'Establishment_Date',
    },
    {
      title: '公司狀態',
      dataIndex: 'Company_Status',
      key: 'Company_Status',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="link" 
          onClick={() => navigate(`/company/${record.Business_Accounting_NO}`)}
        >
          查看詳情
        </Button>
      ),
    },
  ];

  const handleSearch = async (value) => {
    if (!value) {
      message.warning('請輸入統一編號');
      return;
    }

    try {
      setLoading(true);
      const url = `https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6?$format=json&$filter=Business_Accounting_NO eq ${value}`;
      const response = await axios.get(url);
      
      if (response.data.length === 0) {
        message.error('未找到該公司資料');
        setSearchResults([]);
        return;
      }

      setSearchResults(response.data);
    } catch (error) {
      message.error('查詢失敗，請稍後再試');
      console.error('API Error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-search">
      <Card className="search-card">
        <div className="search-header">
          <h2>企業查詢</h2>
          <p>輸入統一編號查詢企業基本資料</p>
        </div>
        <div className="search-form">
          <Search
            placeholder="請輸入統一編號"
            allowClear
            enterButton={<Button type="primary" icon={<SearchOutlined />}>查詢</Button>}
            size="large"
            onSearch={handleSearch}
          />
        </div>
      </Card>

      <Spin spinning={loading}>
        {searchResults.length > 0 && (
          <Card className="result-card">
            <Table
              columns={columns}
              dataSource={searchResults}
              rowKey="Business_Accounting_NO"
              pagination={false}
            />
          </Card>
        )}
      </Spin>
    </div>
  );
};

export default CompanySearch; 