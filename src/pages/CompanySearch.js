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
  const [searchType, setSearchType] = useState('id'); // 'id' 或 'name' 或 'business'
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    if (!value) {
      message.warning(`請輸入${searchType === 'id' ? '統一編號' : searchType === 'name' ? '公司名稱' : '統一編號'}`);
      return;
    }

    try {
      setLoading(true);
      let url;
      
      if (searchType === 'id') {
        const baseUrl = 'https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6';
        const params = new URLSearchParams({
          $format: 'json',
          $filter: `Business_Accounting_NO eq '${value}'`,
          $skip: '0',
          $top: '1000'
        });
        url = `${baseUrl}?${params.toString()}`;
      } else if (searchType === 'name') {
        const skip = (pagination.current - 1) * pagination.pageSize;
        const baseUrl = 'https://data.gcis.nat.gov.tw/od/data/api/6BBA2268-1367-4B42-9CCA-BC17499EBE8C';
        const params = new URLSearchParams({
          $format: 'json',
          $filter: `contains(Company_Name,'${encodeURIComponent(value)}') and Company_Status eq '01'`,
          $skip: skip.toString(),
          $top: pagination.pageSize.toString()
        });
        url = `${baseUrl}?${params.toString()}`;
      } else if (searchType === 'business') {
        const baseUrl = 'https://data.gcis.nat.gov.tw/od/data/api/7E6AFA72-AD6A-46D3-8681-ED77951D912D';
        const params = new URLSearchParams({
          $format: 'json',
          $filter: `President_No eq '${value}'`,
          $skip: '0',
          $top: '1000'
        });
        url = `${baseUrl}?${params.toString()}`;
      }

      console.log('API URL:', url); // 調試用

      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: false
      });

      console.log('API Response:', response.data); // 調試用
      
      if (!response.data || response.data.length === 0) {
        message.error('未找到相關資料');
        setSearchResults([]);
        return;
      }

      // 資料轉換和格式化
      const formattedData = response.data.map(item => {
        if (searchType === 'id' || searchType === 'name') {
          return {
            ...item,
            Capital_Stock_Amount: item.Capital_Stock_Amount ? 
              parseInt(item.Capital_Stock_Amount).toLocaleString() : '0',
            Establishment_Date: item.Establishment_Date ? 
              item.Establishment_Date.split('T')[0] : '-',
            Last_Modified_Date: item.Last_Modified_Date ? 
              item.Last_Modified_Date.split('T')[0] : '-',
            Company_Status: formatCompanyStatus(item.Company_Status)
          };
        } else if (searchType === 'business') {
          return {
            ...item,
            Capital_Amount: item.Capital_Amount ? 
              parseInt(item.Capital_Amount).toLocaleString() : '0',
            Establishment_Date: item.Establishment_Date ? 
              item.Establishment_Date.split('T')[0] : '-',
            Business_Status: formatBusinessStatus(item.Business_Status)
          };
        }
        return item;
      });

      setSearchResults(formattedData);
      if (searchType === 'name') {
        setPagination(prev => ({
          ...prev,
          total: formattedData.length
        }));
      }
    } catch (error) {
      console.error('API Error:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
        message.error(`API 錯誤: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        console.error('Error Request:', error.request);
        message.error('無法連接到伺服器，請檢查網路連接');
      } else {
        message.error('發生錯誤：' + error.message);
      }
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
    handleSearch(searchResults[0]?.Company_Name || '');
  };

  // 格式化公司狀態
  const formatCompanyStatus = (status) => {
    const statusMap = {
      '01': '核准設立',
      '02': '撤銷',
      '03': '廢止',
      '04': '停業',
      '05': '解散',
      '06': '歇業',
      '07': '合併',
      '08': '分割',
      '09': '變更組織',
      '10': '遷址',
      '11': '撤銷登記',
      '12': '廢止登記',
      '13': '停業登記',
      '14': '解散登記',
      '15': '歇業登記',
      '16': '合併登記',
      '17': '分割登記',
      '18': '變更組織登記',
      '19': '遷址登記'
    };
    return statusMap[status] || status;
  };

  // 格式化商業狀態
  const formatBusinessStatus = (status) => {
    const statusMap = {
      '01': '核准設立',
      '02': '撤銷',
      '03': '廢止',
      '04': '停業',
      '05': '解散',
      '06': '歇業',
      '07': '合併',
      '08': '分割',
      '09': '變更組織',
      '10': '遷址'
    };
    return statusMap[status] || status;
  };

  const columns = [
    {
      title: '公司名稱',
      dataIndex: 'Company_Name',
      key: 'Company_Name',
      width: '25%',
      ellipsis: true,
    },
    {
      title: '統一編號',
      dataIndex: 'Business_Accounting_NO',
      key: 'Business_Accounting_NO',
      width: '15%',
    },
    {
      title: '代表人',
      dataIndex: 'Responsible_Name',
      key: 'Responsible_Name',
      width: '15%',
    },
    {
      title: '資本額',
      dataIndex: 'Capital_Stock_Amount',
      key: 'Capital_Stock_Amount',
      width: '15%',
      render: (text) => `NT$ ${text}`,
    },
    {
      title: '設立日期',
      dataIndex: 'Establishment_Date',
      key: 'Establishment_Date',
      width: '15%',
    },
    {
      title: '公司狀態',
      dataIndex: 'Company_Status',
      key: 'Company_Status',
      width: '15%',
    },
    {
      title: '操作',
      key: 'action',
      width: '10%',
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

  const businessColumns = [
    {
      title: '商業名稱',
      dataIndex: 'Business_Name',
      key: 'Business_Name',
      width: '25%',
      ellipsis: true,
    },
    {
      title: '統一編號',
      dataIndex: 'President_No',
      key: 'President_No',
      width: '15%',
    },
    {
      title: '負責人',
      dataIndex: 'President_Name',
      key: 'President_Name',
      width: '15%',
    },
    {
      title: '資本額',
      dataIndex: 'Capital_Amount',
      key: 'Capital_Amount',
      width: '15%',
      render: (text) => `NT$ ${text}`,
    },
    {
      title: '設立日期',
      dataIndex: 'Establishment_Date',
      key: 'Establishment_Date',
      width: '15%',
    },
    {
      title: '營業狀態',
      dataIndex: 'Business_Status',
      key: 'Business_Status',
      width: '15%',
    },
    {
      title: '管轄機關',
      dataIndex: 'Agency',
      key: 'Agency',
      width: '15%',
    },
    {
      title: '操作',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <Button 
          type="link" 
          onClick={() => navigate(`/company/${record.President_No}`)}
        >
          查看詳情
        </Button>
      ),
    },
  ];

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
              <Radio.Button value="id">統一編號查詢</Radio.Button>
              <Radio.Button value="name">公司名稱</Radio.Button>
              <Radio.Button value="business">商業登記</Radio.Button>
            </Radio.Group>
            <Search
              placeholder={`請輸入${searchType === 'id' ? '統一編號' : searchType === 'name' ? '公司名稱' : '統一編號'}`}
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
              columns={searchType === 'business' ? businessColumns : columns}
              dataSource={searchResults}
              rowKey={searchType === 'business' ? 'President_No' : 'Business_Accounting_NO'}
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