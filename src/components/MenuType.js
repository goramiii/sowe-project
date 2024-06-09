import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuType.css';
import mcCafeImage from './assets/mcCafe.png';
import mcMorningImage from './assets/mcMorning.png';
import burgerImage from './assets/burger.png';
import dessertsImage from './assets/dessert.png';
import drinksImage from './assets/drink.png';
import sidesImage from './assets/side.png';

const menuSections = [
  { type: 'McCafe', label: 'McCafe', image: mcCafeImage },
  { type: 'McMorning', label: 'McMorning', image: mcMorningImage },
  { type: 'burger', label: 'Burger', image: burgerImage },
  { type: 'desserts', label: 'Desserts', image: dessertsImage },
  { type: 'drinks', label: 'Drinks', image: drinksImage },
  { type: 'sides', label: 'Sides', image: sidesImage },
];

function MenuType() {
  const navigate = useNavigate();

  const handleMenuSelect = (type) => {
    navigate(`/menu-details/${type}`);
  };

  return (
    <div className="menu-type-container">
      <h2>원하시는 음식 종류를 골라주십시오.</h2>
      <div className="menu-sections">
        {menuSections.map(section => (
          <div key={section.type} className="menu-button" onClick={() => handleMenuSelect(section.type)}>
            <img src={section.image} alt={section.label} className="menu-image" />
            <span>{section.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuType;
