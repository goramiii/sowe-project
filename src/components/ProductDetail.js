import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import { CartContext } from '../contexts/CartContext';

function ProductDetail() {
  const { productName, category } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // 메뉴에서 제품 이름과 이미지를 가져오기
        const menuResponse = await axios.get(`http://127.0.0.1:5000/menu/${category}`);
        const menuItem = menuResponse.data.find(item => item.collection_name === productName);

        if (menuItem) {
          // 제품의 상세 설명 가져오기
          const descriptionResponse = await axios.get(`http://127.0.0.1:5000/description/${category}/${productName}`);
    


          if (descriptionResponse.data) {
            setProduct({
              collection_name: menuItem.collection_name,
              img: menuItem.img,
              description: descriptionResponse.data.desc,
              price: descriptionResponse.data.price,
              calories: descriptionResponse.data.Calories,
              sodium: descriptionResponse.data.Sodium,
              sodiumPercent: descriptionResponse.data.SodiumPercent,
              sugar: descriptionResponse.data.Sugar,
              sugarPercent: descriptionResponse.data.SugarPercent,
              caffeine: descriptionResponse.data.Caffeine,
              greasiness: descriptionResponse.data.greasiness,
              hardness: descriptionResponse.data.hardness,
              spiciness: descriptionResponse.data.spiciness,
            });
          }
        }
   
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [category, productName]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <h1>{product.collection_name}</h1>
      <img src={product.img.link} alt={product.collection_name} className="product-image" />
      <p>{product.description}</p>
      <p>Price: {product.price} KRW</p>
      <p>Calories: {product.calories}</p>
      <p>Sodium: {product.sodium} mg ({product.sodiumPercent})</p>
      <p>Sugar: {product.sugar} g ({product.sugarPercent})</p>
      <p>Caffeine: {product.caffeine ? "Yes" : "No"}</p>
      <p>Greasiness: {product.greasiness}</p>
      <p>Hardness: {product.hardness}</p>
      <p>Spiciness: {product.spiciness}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <Link to="/cart" className="cart-button">장바구니로 이동</Link>
    </div>
  );
}

export default ProductDetail;
