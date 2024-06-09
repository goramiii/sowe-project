import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import OrderType from './components/OrderType';
import MenuType from './components/MenuType';
import MenuDetail from './components/MenuDetail';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order-type" element={<OrderType />} />
          <Route path="/menu-type" element={<MenuType />} />
          <Route path="/menu-details/:type" element={<MenuDetail />} />
          <Route path="/product/:productName/:category" element={<ProductDetail />} /> 
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
