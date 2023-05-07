import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config/constants.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Carousel } from "antd";

dayjs.extend(relativeTime);

function MainPage() {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(`${API_URL}/products`)
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });

    axios
      .get(`${API_URL}/banners`)
      .then(function (result) {
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch((error) => {
        console.error("에러 발생 : ", error);
      });
  }, []);

  return (
    <div>
      <Carousel autoplay autoplaySpeed={3000}>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img
                  src={`${API_URL}/${banner.imageUrl}`}
                  alt="그랩마켓 배너 이미지"
                />
              </div>
            </Link>
          );
        })}
      </Carousel>
      <h1 id="product-headline">판매되는 상품들</h1>
      <div id="product_list">
        {products.map(function (product, index) {
          return (
            <div key={index} className="product_card">
              {product.soldout === 1 && <div className="product-blur"></div>}
              <Link className="product-link" to={`/products/${product.id}`}>
                <div>
                  <img
                    className="product_img"
                    src={`${API_URL}/${product.imageUrl}`}
                    alt={product.name}
                  />
                </div>
                <div className="product_contents">
                  <span className="product_name">{product.name}</span>
                  <span className="product_price">{product.price}원</span>
                </div>
                <div className="product_footer">
                  <div className="product_seller">
                    <img
                      className="product_avatar"
                      src="images/icons/avatar.png"
                      alt={product.seller}
                    />
                    <span>{product.seller}</span>
                  </div>
                  <span className="product-date">
                    {dayjs(product.createdAt).fromNow()}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
