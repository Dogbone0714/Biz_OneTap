import axios from 'axios';

const BASE_URL = 'https://data.gcis.nat.gov.tw/od/data/api';

// API 金鑰和設定
const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// 公司基本資料查詢
export const searchCompany = async (params) => {
  try {
    const { format = 'json', filter, skip = 0, top = 50 } = params;
    const url = `${BASE_URL}/FCB90AB1-E382-45CE-8D4F-394861851E28`;
    
    const response = await axios.get(url, {
      ...API_CONFIG,
      params: {
        $format: format,
        $filter: filter,
        $skip: skip,
        $top: top,
      },
    });

    return response.data;
  } catch (error) {
    console.error('公司查詢錯誤:', error);
    throw error;
  }
};

// 根據統一編號查詢
export const searchByCreditCode = async (creditCode) => {
  const filter = `Business_Item eq '${creditCode}'`;
  return searchCompany({ filter });
};

// 根據公司名稱查詢
export const searchByCompanyName = async (companyName) => {
  const filter = `Company_Name eq '${companyName}'`;
  return searchCompany({ filter });
};

// 根據負責人查詢
export const searchByOwner = async (ownerName) => {
  const filter = `Owner_Name eq '${ownerName}'`;
  return searchCompany({ filter });
};

// 組合查詢
export const searchByMultipleCriteria = async (criteria) => {
  const { creditCode, companyName, ownerName } = criteria;
  let filter = '';
  
  if (creditCode) filter += `Business_Item eq '${creditCode}'`;
  if (companyName) filter += filter ? ` and Company_Name eq '${companyName}'` : `Company_Name eq '${companyName}'`;
  if (ownerName) filter += filter ? ` and Owner_Name eq '${ownerName}'` : `Owner_Name eq '${ownerName}'`;
  
  return searchCompany({ filter });
}; 