import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";

function MainPage() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(
        "https://feabec3a-eedc-4654-ae5a-9e7b2ddeb15d.mock.pstmn.io/products"
      )
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });
  }, []);

  return (
    <div>
      <div id="header">
        <div id="header_area">
          <img src="images/icons/logo.png" alt="그랩마켓" />
        </div>
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" alt="그랩마켓 런칭 이벤트" />
        </div>
        <h1>판매되는 상품들</h1>
        <div id="product_list">
          {products.map(function (product, index) {
            return (
              <div className="product_card">
                <Link className="product-link" to={"/product"}>
                  <div>
                    <img
                      className="product_img"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </div>
                  <div className="product_contents">
                    <span className="product_name">{product.name}</span>
                    <span className="product_price">{product.price}원</span>
                  </div>
                  <div className="product_seller">
                    <img
                      className="product_avatar"
                      src="images/icons/avatar.png"
                      alt={product.seller}
                    />
                    <span>{product.seller}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
