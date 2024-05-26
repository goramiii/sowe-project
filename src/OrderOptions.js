import React from 'react';
import { Link } from 'react-router-dom';

function OrderOptions() {
  return (
    <div className="option-buttons">
      <Link to="/" className="eat-in-button">매장에서 먹기</Link>
      <Link to="/" className="takeaway-button">포장하기</Link>
    </div>
  );
}

export default OrderOptions;
