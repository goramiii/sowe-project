import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import homeImage from './assets/home.png'; // 올바른 경로에서 이미지 임포트

function Home() {
  return (
    <div className="container">
      <div className="section section1"></div>
      <div className="section section2">
        <img src={homeImage} alt="Home" className="background-image" /> {/* 이미지 파일 변경 */}
        <div className="text">
          <h1>노약자를 위한</h1>
          <h2>음성인식 키오스크</h2>
        </div>
        <Link to="/order" className="order-button">주문하기</Link>
      </div>
      <div className="section section3"></div>
    </div>
  );
}

export default Home;
