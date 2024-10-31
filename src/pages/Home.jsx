import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ExchangeRateChart from "../components/ExchangeRateChart";
import DataCard from "../components/DataCard";
import { fetchExchangeRates } from "../api/exchangeRateApi";

const currencies = [
  { code: "0000001", name: "미국 달러" },
  { code: "0000002", name: "유로" },
  { code: "0000003", name: "일본 엔" },
  { code: "0000004", name: "영국 파운드" },
];

const Home = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("0000001");
  const [data, setData] = useState([]);
  const [lowestRate, setLowestRate] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const exchangeData = await fetchExchangeRates(selectedCurrency);
      setData(exchangeData);

      // 최저 환율 찾기
      if (exchangeData.length > 0) {
        const minRate = exchangeData.reduce(
          (min, p) => (p.rate < min.rate ? p : min),
          exchangeData[0]
        );
        setLowestRate(minRate);
      }
    };
    loadData();
  }, [selectedCurrency]);

  return (
    <div>
      <Header
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />
      <main>
        <ExchangeRateChart data={data} />
        {lowestRate && (
          <DataCard rate={lowestRate.rate} date={lowestRate.date} />
        )}
      </main>
    </div>
  );
};

export default Home;
