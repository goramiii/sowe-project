// src/components/Home.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './home.css';
import homeImage from './assets/home.png';

function Home() {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  const handleStart = () => {
    setClickCount(clickCount + 1); // 클릭 횟수를 증가
    navigate('/order-type'); // /order-type으로 이동
  };

  return (
    <div className="container">
      <div className="section section1"></div>
      <div className="section section2">
        <img src={homeImage} alt="Home" className="background-image" />
        <div className="text">
          <h1 className="small-text">노약자를 위한</h1>
          <h2 className="large-text">음성인식 키오스크</h2>
        </div>
        <button onClick={handleStart} className="order-button">주문하기</button>
        <p>클릭 횟수: {clickCount}</p> {/* 클릭 횟수 표시 */}
      </div>
      <div className="section section3"></div>
    </div>
  );
}

export default Home;
