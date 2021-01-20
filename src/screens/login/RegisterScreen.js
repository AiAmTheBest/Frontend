import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css";

const RegisterScreen = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = user;
  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h3>Create account</h3>
          </li>
          <li>
            <label for="name">Your name</label>
            <input
              value={name}
              type="name"
              name="name"
              id="name"
              onChange={(e) => handleChange("name", e.target.value)}
            ></input>
          </li>
          <li>
            <label for="email">Email</label>
            <input
              value={email}
              type="email"
              name="email"
              id="email"
              onChange={(e) => handleChange("email", e.target.value)}
            ></input>
          </li>
          <li>
            <label for="password">Password</label>
            <input
              value={password}
              type="password"
              name="password"
              id="password"
              onChange={(e) => handleChange("password", e.target.value)}
            ></input>
          </li>
          <li>
            <label for="password">Re-enter Password</label>
            <input
              value={confirmPassword}
              type="password"
              name="password"
              id="password"
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            ></input>
          </li>
          <li>
            <Link to="/register" className="button full-wi">
              Create your amazona account
            </Link>
          </li>
          <li className="containerSignIn">
            <a>Already have an account?</a>
            <Link to="/signin">
              <a className="signIn">Sign-In</a>
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default RegisterScreen;
