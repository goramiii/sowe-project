import React, { useState } from 'react';
import './App.css';
import burgerImage from './assets/burger.jpg'; 

function App() {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <div className="title-container">
          <div className="title-small">어렵다 젠장 ㅠㅠ</div>
          <div className="title-large">패스트푸드 키오스크</div>
        </div>
        <img src={burgerImage} alt="햄버거" className="burger-image" />
        {!showOptions ? (
          <div className="option-buttons">
            <button className="order-button" onClick={() => setShowOptions(true)}>주문하기</button>
            <button className="settings-button">상세설정</button>
          </div>
        ) : (
          <div className="option-buttons">
            <button className="eat-in-button">매장에서 먹기</button>
            <button className="takeaway-button">포장하기</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
