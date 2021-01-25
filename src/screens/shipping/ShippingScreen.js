import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { saveShipping } from "../../store/redux/cart/actions";
import CheckoutSteps from "../components/CheckoutSteps";
import "../login/styles.css";

const ShippingScreen = (props) => {
  const dispatch = useDispatch();
  const [ship, setShip] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const { address, city, postalCode, country } = ship;
  const handleChange = (field, value) => {
    setShip({ ...ship, [field]: value });
  };

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(saveShipping({ address, city, postalCode, country }));
      props.history.push("payment");
    },
    [address, city, postalCode, country]
  );

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h3>Shipping</h3>
            </li>
            <li className="bodyAll">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={(e) => handleChange("address", e.target.value)}
              ></input>
            </li>
            <li className="bodyAll">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(e) => handleChange("city", e.target.value)}
              ></input>
            </li>
            <li className="bodyAll">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                onChange={(e) => handleChange("postalCode", e.target.value)}
              ></input>
            </li>
            <li className="bodyAll">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => handleChange("country", e.target.value)}
              ></input>
            </li>
            <button type="submit" className="button full-wi">
              Continue
            </button>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
