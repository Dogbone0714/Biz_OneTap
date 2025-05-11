import React, { useState } from 'react';
import { Card, Input, Button, Table, message, Spin, Radio, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CompanySearch.css';

const { Search } = Input;

const CompanySearch = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('id'); // 'id' 或 'name'
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
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
      message.warning(`請輸入${searchType === 'id' ? '統一編號' : '公司名稱'}`);
      return;
    }

    try {
      setLoading(true);
      let url;
      
      if (searchType === 'id') {
        url = `https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6?$format=json&$filter=Business_Accounting_NO eq ${value}&$skip=0&$top=1000`;
      } else {
        const skip = (pagination.current - 1) * pagination.pageSize;
        url = `https://data.gcis.nat.gov.tw/od/data/api/6BBA2268-1367-4B42-9CCA-BC17499EBE8C?$format=json&$filter=Company_Name like '${value}' and Company_Status eq '01'&$skip=${skip}&$top=${pagination.pageSize}`;
      }

      const response = await axios.get(url);
      
      if (response.data.length === 0) {
        message.error('未找到相關公司資料');
        setSearchResults([]);
        return;
      }

      setSearchResults(response.data);
      if (searchType === 'name') {
        setPagination(prev => ({
          ...prev,
          total: response.data.length
        }));
      }
    } catch (error) {
      message.error('查詢失敗，請稍後再試');
      console.error('API Error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
    handleSearch(searchResults[0]?.Company_Name || '');
  };

  return (
    <div className="company-search">
      <Card className="search-card">
        <div className="search-header">
          <h2>企業查詢</h2>
          <p>輸入統一編號或公司名稱查詢企業基本資料</p>
        </div>
        <div className="search-form">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Radio.Group 
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="id">統一編號</Radio.Button>
              <Radio.Button value="name">公司名稱</Radio.Button>
            </Radio.Group>
            <Search
              placeholder={`請輸入${searchType === 'id' ? '統一編號' : '公司名稱'}`}
              allowClear
              enterButton={<Button type="primary" icon={<SearchOutlined />}>查詢</Button>}
              size="large"
              onSearch={handleSearch}
            />
          </Space>
        </div>
      </Card>

      <Spin spinning={loading}>
        {searchResults.length > 0 && (
          <Card className="result-card">
            <Table
              columns={columns}
              dataSource={searchResults}
              rowKey="Business_Accounting_NO"
              pagination={searchType === 'name' ? {
                ...pagination,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 筆資料`
              } : false}
              onChange={searchType === 'name' ? handleTableChange : undefined}
            />
          </Card>
        )}
      </Spin>
    </div>
  );
};

export default CompanySearch; 