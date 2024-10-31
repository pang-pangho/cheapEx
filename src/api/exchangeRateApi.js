// /src/api/exchangeRateApi.js
import axios from "axios";
const API_KEY = "ICYUG2XPY4LANXIGUWRV";
const CORS_PROXY_URL = "https://cors.sh/";
const BASE_URL = `ecos.bok.or.kr/api/StatisticSearch/${API_KEY}/json/kr/1/100`;

// 특정 통화의 환율 데이터를 최근 2년간 가져오는 함수
export const fetchExchangeRates = async (currencyCode) => {
  const today = new Date();
  const endDate = `${today.getFullYear()}${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;
  const startDate = `${today.getFullYear() - 2}${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;

  try {
    const response = await axios.get(
      `${CORS_PROXY_URL}${BASE_URL}/036Y001/MM/${startDate}/${endDate}/${currencyCode}`,
      {
        headers: {
          "x-cors-api-key": "temp_5eb2645376d1df14021a05db0b16c3a5",
        },
      }
    );
    const data = response.data;

    // 필요한 데이터만 추출하여 가공
    if (data && data.StatisticSearch) {
      return data.StatisticSearch.row.map((item) => ({
        date: item.TIME, // 'YYYY-MM' 형식으로 날짜 사용
        rate: parseFloat(item.DATA_VALUE),
      }));
    }

    return [];
  } catch (error) {
    console.error("환율 데이터를 가져오는 중 오류 발생:", error);
    return [];
  }
};
