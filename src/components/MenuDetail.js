import React, { useState, useEffect } from 'react'; // React와 훅(useState, useEffect)을 임포트합니다.
import { useParams, Link, useNavigate } from 'react-router-dom'; // React Router DOM의 훅(useParams, useNavigate)과 Link 컴포넌트를 임포트합니다.
import axios from 'axios'; // axios 라이브러리를 임포트하여 HTTP 요청을 처리합니다.
import './MenuDetail.css'; // 컴포넌트의 CSS 파일을 임포트합니다.

function MenuDetail() { // MenuDetail 컴포넌트를 정의합니다.
  const { type } = useParams(); // URL에서 "type" 파라미터를 가져옵니다
  const [menuItems, setMenuItems] = useState([]); // 메뉴 항목들을 저장할 상태를 정의합니다. 초기값은 빈 배열입니다.
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 훅을 사용합니다.

  useEffect(() => { // 컴포넌트가 렌더링될 때와 "type"이 변경될 때마다 실행되는 훅입니다.
    const fetchMenuItems = async () => { // 비동기 함수 fetchMenuItems를 정의합니다.
      try {
        const response = await axios.get(`http://127.0.0.1:5000/menu/${type}`); // 서버로부터 메뉴 항목들을 가져옵니다.
        setMenuItems(response.data); // 가져온 데이터를 상태에 저장합니다.
      } catch (error) {
        console.error("Error fetching menu items:", error); // 에러 발생 시 콘솔에 에러 메시지를 출력합니다.
      }
    };

    fetchMenuItems(); // fetchMenuItems 함수를 호출하여 메뉴 항목들을 가져옵니다.
  }, [type]); // "type"이 변경될 때마다 useEffect가 실행됩니다.

  const handleItemClick = (item) => {
    const productName = item.collection_name;
    navigate(`/product/${productName}/${type}`);
};
  

  return (
    <div className="menu-details-container"> 
      <h1>{type} Menu</h1> 
      <div className="menu-items"> 
        {menuItems.map(item => ( // 메뉴 항목들을 맵핑하여 각각의 메뉴 아이템 컴포넌트를 생성합니다.
          <div 
            key={item.collection_name} // 각 메뉴 항목에 고유한 키를 설정합니다.
            className="menu-item" 
            onClick={() => handleItemClick(item)} // 메뉴 항목 클릭 시 handleItemClick 함수를 호출합니다.
          >
            <h2>{item.collection_name}</h2>
            <img src={item.img.link} alt={item.collection_name} className="menu-image" /> 
          </div>
        ))}
      </div>
      <Link to="/cart" className="cart-button">장바구니로 이동</Link> 
    </div>
  );
}

export default MenuDetail; // MenuDetail 컴포넌트를 익스포트합니다.
