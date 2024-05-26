import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Order() {
  return (
    <div className="order-container">
      <h1>주문 방식 선택</h1>
      <button className="order-option">매장에서 식사</button>
      <button className="order-option">포장하기</button>
      <Link to="/" className="back-button">홈으로 돌아가기</Link>
    </div>
  );
}

export default Order;
