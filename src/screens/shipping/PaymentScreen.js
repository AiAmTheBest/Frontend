import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePayment } from "../../store/redux/cart/actions";

const PaymentScreen = (props) => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h3>Payment</h3>
            </li>
            <li className="bodyAll">
              <input
                value="paypal"
                type="radio"
                name="paymentMethod"
                id="paymentMethod"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="paymentMethod">Paypal</label>
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

export default PaymentScreen;
