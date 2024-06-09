// src/components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  console.log(cartItems)
  const handleRemove = (index) => {
    removeFromCart(index);
  };

  return (
    <div className="cart-container">
      <h1>장바구니</h1>
      <p>{cartItems[0]}</p>

      {cartItems.length <= 1 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <ul className="cart-items">
                    {cartItems.map((item, index) => {
                        if (index > 0) {
                            return (
                                <li key={index} className="cart-item">
                                    <img
                                        src={item.img.link}
                                        alt={item.collection_name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <h2>{item.collection_name}</h2>
                                        <p>{item.description}</p>
                                        <p>${item.price}</p>
                                        <button
                                            onClick={() => handleRemove(index)}
                                            className="cancel-button"
                                        >
                                            제거
                                        </button>
                                    </div>
                                </li>
                            )
                        }
                    })}
                </ul>
      )}
      <div className="cart-actions">
        <button className="checkout-button">결제하기</button>
        <button className="cancel-button">취소하기</button>
      </div>
    </div>
  );
}

export default Cart;
