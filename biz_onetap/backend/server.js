const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 測試 API
app.get("/", (req, res) => {
  res.send("後端運行中 🚀");
});

// 企業資訊查詢 API
app.get("/api/company", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "請提供企業名稱" });
  }

  try {
    // 這裡可以改成串接官方 API，例如台灣政府的工商登記 API
    const apiUrl = `https://data.gcis.nat.gov.tw/od/data/api/6BBA2268-1367-4B42-9CCA-BC17499EBE8C?$format=json&$filter=Company_Name like {name} and Company_Status eq 01`;
    const https = require("https");


    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "查詢失敗，請稍後再試！" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 伺服器運行於 http://localhost:${PORT}`);
});
