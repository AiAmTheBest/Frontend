import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../../store/redux/products/actions";
import "./styles.css";

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  console.log("products: ", products);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <ul className="products">
      {products.map((item, index) => (
        <li key={index}>
          <div className="product">
            <Link to={"/product/" + item._id}>
              <img className="product-image" src={item.image} alt="product" />
            </Link>
            <div className="product-name">
              <Link to={"/product/" + item._id}>{item.name}</Link>
            </div>
            <div className="product-brand">{item.brand}</div>
            <div className="product-price">{`$${item.price}`}</div>
            <div className="product-rating">{`${item.rating} Star (${item.numReviews} Reviews)`}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HomeScreen;
