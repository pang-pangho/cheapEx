import React from "react";
import "./DataCard.scss";

const DataCard = ({ rate, date }) => (
  <div className="data-card">
    <p className="data-card__rate">최저 환율: {rate} 원</p>
    <p className="data-card__date">날짜: {date}</p>
  </div>
);

export default DataCard;
