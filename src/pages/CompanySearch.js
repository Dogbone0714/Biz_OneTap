import React, { useState, useEffect } from 'react';
import { Input, Card, Table, Tag, Space, Button, message, Spin } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import axios from 'axios';
import './CompanySearch.css';

const { Search } = Input;

const CompanySearch = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const columns = [
    {
      title: '企業名稱',
      dataIndex: 'Company_Name',
      key: 'Company_Name',
      render: (text) => <a>{text}</a>,
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
      render: (amount) => `${amount} 元`,
    },
    {
      title: '設立日期',
      dataIndex: 'Company_Location',
      key: 'Company_Location',
    },
    {
      title: '營運狀態',
      dataIndex: 'Company_Status',
      key: 'Company_Status',
      render: (status) => (
        <Tag color={status === '核准設立' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">查看詳情</Button>
          <Button type="link">風險評估</Button>
        </Space>
      ),
    },
  ];

  const fetchCompanies = async (searchValue, page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const skip = (page - 1) * pageSize;
      const url = `https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6?$format=json&$filter=Business_Accounting_NO eq '${searchValue}' or Company_Name eq '${searchValue}' or Responsible_Name eq '${searchValue}'&$skip=${skip}&$top=${pageSize}`;
      
      const response = await axios.get(url);
      const data = response.data;
      
      setCompanies(data.map((item, index) => ({
        key: index,
        ...item
      })));
      
      setPagination({
        ...pagination,
        current: page,
        total: data.length
      });
    } catch (error) {
      message.error('查詢失敗，請稍後再試');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    if (!value) {
      message.warning('請輸入查詢內容');
      return;
    }
    fetchCompanies(value, 1, pagination.pageSize);
  };

  const handleTableChange = (pagination) => {
    fetchCompanies(searchText, pagination.current, pagination.pageSize);
  };

  return (
    <div className="company-search">
      <Card className="search-card">
        <div className="search-header">
          <h2>企業查詢</h2>
          <p>輸入企業名稱、統一編號或代表人姓名進行查詢</p>
        </div>
        <div className="search-form">
          <Search
            placeholder="請輸入查詢內容"
            allowClear
            enterButton={<Button type="primary" icon={<SearchOutlined />}>查詢</Button>}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={handleSearch}
          />
          <Button icon={<FilterOutlined />}>進階篩選</Button>
        </div>
      </Card>

      <Card className="result-card">
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={companies}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Spin>
      </Card>
    </div>
  );
};

export default CompanySearch; 