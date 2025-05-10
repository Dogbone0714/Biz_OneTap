import React, { useState } from 'react';
import { Input, Card, Table, Tag, Space, Button, message, Form } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { searchByMultipleCriteria } from '../services/companyApi';
import './CompanySearch.css';

const { Search } = Input;

const CompanySearch = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '企業名稱',
      dataIndex: 'Company_Name',
      key: 'Company_Name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '統一編號',
      dataIndex: 'Business_Item',
      key: 'Business_Item',
    },
    {
      title: '代表人',
      dataIndex: 'Owner_Name',
      key: 'Owner_Name',
    },
    {
      title: '資本額',
      dataIndex: 'Capital_Amount',
      key: 'Capital_Amount',
    },
    {
      title: '設立日期',
      dataIndex: 'Establish_Date',
      key: 'Establish_Date',
    },
    {
      title: '營運狀態',
      dataIndex: 'Business_Status',
      key: 'Business_Status',
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

  const handleSearch = async (values) => {
    try {
      setLoading(true);
      const response = await searchByMultipleCriteria({
        creditCode: values.creditCode,
        companyName: values.companyName,
        ownerName: values.ownerName,
      });
      
      if (response && response.length > 0) {
        setSearchResults(response);
        message.success('查詢成功');
      } else {
        setSearchResults([]);
        message.info('未找到符合條件的資料');
      }
    } catch (error) {
      console.error('查詢錯誤:', error);
      message.error('查詢失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-search">
      <Card className="search-card">
        <div className="search-header">
          <h2>企業查詢</h2>
          <p>輸入企業名稱、統一編號或代表人姓名進行查詢</p>
        </div>
        <Form
          form={form}
          onFinish={handleSearch}
          layout="vertical"
        >
          <div className="search-form">
            <Form.Item name="companyName">
              <Input
                placeholder="請輸入企業名稱"
                allowClear
                prefix={<SearchOutlined />}
                size="large"
              />
            </Form.Item>
            <Form.Item name="creditCode">
              <Input
                placeholder="請輸入統一編號"
                allowClear
                size="large"
              />
            </Form.Item>
            <Form.Item name="ownerName">
              <Input
                placeholder="請輸入代表人姓名"
                allowClear
                size="large"
              />
            </Form.Item>
            <Button 
              type="primary" 
              icon={<SearchOutlined />}
              size="large"
              htmlType="submit"
              loading={loading}
            >
              查詢
            </Button>
          </div>
        </Form>
      </Card>

      <Card className="result-card">
        <Table
          columns={columns}
          dataSource={searchResults}
          loading={loading}
          pagination={{
            total: searchResults.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default CompanySearch; 