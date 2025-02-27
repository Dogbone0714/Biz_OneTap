import { useState } from "react";
import { Input, Button, Card, Spin, Layout, Typography } from "antd";
import axios from "axios";
import "./App.css";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

function App() {
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    if (!companyName) return;
    setLoading(true);
  
    try {
      const response = await axios.get(`http://localhost:5000/api/company?name={companyName}`);
      setResult(response.data);
     

    } catch (error) {
      setResult({ error: "查詢失敗，請稍後再試。" });
    }
  
    setLoading(false);
  };
  

  return (
    <Layout className="layout">
      <Header className="header">
        <Title level={2} style={{ color: "white", margin: 0 }}>
          公司一指通
        </Title>
      </Header>
      <Content className="content">
        <Title level={3}>企業資訊查詢</Title>
        <Paragraph>輸入企業名稱，快速查詢企業資訊與風險評估。</Paragraph>

        <div className="search-box">
          <Input
            placeholder="請輸入企業名稱"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={{ width: "60%" }}
          />
          <Button type="primary" onClick={handleSearch} loading={loading}>
            查詢
          </Button>
        </div>

        {result && (
          <Card className="result-box">
            {result.error ? (
              <Paragraph type="danger">{result.error}</Paragraph>
            ) : (
              <>
                <Title level={4}>{result.name}</Title>
                <Paragraph>負責人: {result.owner}</Paragraph>
                <Paragraph>資本額: {result.capital}</Paragraph>
                <Paragraph>登記狀態: {result.status}</Paragraph>
              </>
            )}
          </Card>
        )}
      </Content>
    </Layout>
  );
}

export default App;
