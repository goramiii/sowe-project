import React from 'react';
import { Link } from 'react-router-dom';
import burgerImage from './assets/burger.jpg';

function Home() {
  return (
    <div>
      <img src={burgerImage} alt="햄버거" className="burger-image" />
      <Link to="/order-options" className="order-button">주문하기</Link>
    </div>
  );
}

export default Home;
