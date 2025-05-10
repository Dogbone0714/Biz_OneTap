import React, { useState } from 'react';
import { Card, Input, Button, Tabs, Table, message, Spin } from 'antd';
import { SearchOutlined, FileTextOutlined, TrademarkOutlined } from '@ant-design/icons';
import axios from 'axios';
import './IntellectualProperty.css';

const { Search } = Input;
const { TabPane } = Tabs;

const IntellectualProperty = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [patentData, setPatentData] = useState([]);
  const [trademarkData, setTrademarkData] = useState([]);

  const patentColumns = [
    {
      title: '專利名稱',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '專利號',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '申請日期',
      dataIndex: 'applyDate',
      key: 'applyDate',
    },
    {
      title: '專利類型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '申請人',
      dataIndex: 'applicant',
      key: 'applicant',
    }
  ];

  const trademarkColumns = [
    {
      title: '商標名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '註冊號',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '申請日期',
      dataIndex: 'applyDate',
      key: 'applyDate',
    },
    {
      title: '商標類別',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '申請人',
      dataIndex: 'applicant',
      key: 'applicant',
    }
  ];

  const handleSearch = async (value, type) => {
    if (!value) {
      message.warning('請輸入查詢內容');
      return;
    }

    try {
      setLoading(true);
      // 這裡需要替換為實際的 API 端點
      const url = type === 'patent' 
        ? `https://api.example.com/patents?q=${value}`
        : `https://api.example.com/trademarks?q=${value}`;
      
      const response = await axios.get(url);
      const data = response.data;

      if (type === 'patent') {
        setPatentData(data);
      } else {
        setTrademarkData(data);
      }
    } catch (error) {
      message.error('查詢失敗，請稍後再試');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ip-search">
      <Card className="search-card">
        <div className="search-header">
          <h2>知識產權查詢</h2>
          <p>連結全球專利檢索系統，方便用戶搜尋專利與商標資訊</p>
        </div>
      </Card>

      <Card className="content-card">
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={
              <span>
                <FileTextOutlined />
                專利查詢
              </span>
            } 
            key="1"
          >
            <div className="search-form">
              <Search
                placeholder="請輸入專利名稱、專利號或申請人"
                allowClear
                enterButton={<Button type="primary" icon={<SearchOutlined />}>查詢</Button>}
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={(value) => handleSearch(value, 'patent')}
              />
            </div>
            <Spin spinning={loading}>
              <Table
                columns={patentColumns}
                dataSource={patentData}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                }}
              />
            </Spin>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <TrademarkOutlined />
                商標查詢
              </span>
            } 
            key="2"
          >
            <div className="search-form">
              <Search
                placeholder="請輸入商標名稱、註冊號或申請人"
                allowClear
                enterButton={<Button type="primary" icon={<SearchOutlined />}>查詢</Button>}
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={(value) => handleSearch(value, 'trademark')}
              />
            </div>
            <Spin spinning={loading}>
              <Table
                columns={trademarkColumns}
                dataSource={trademarkData}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                }}
              />
            </Spin>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default IntellectualProperty; 