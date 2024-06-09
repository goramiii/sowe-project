import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import './OrderType.css';

function OrderType() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleSelect = (type) => {
    addToCart(`Order Type: ${type}`);
    navigate('/menu-type');
  };

  return (
    <div className="order-container">
      <h1>주문 방식 선택</h1>
      <button className="order-option" onClick={() => handleSelect('매장에서 식사')}>매장에서 식사</button>
      <button className="order-option" onClick={() => handleSelect('포장하기')}>포장하기</button>
      <Link to="/" className="back-button">홈으로 돌아가기</Link>
    </div>
  );
}

export default OrderType;
