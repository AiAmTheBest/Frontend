import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../store/redux/user/actions";
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

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(register(name, email, password));
    },
    [name, email, password]
  );

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [userInfo]);

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h3>Create account</h3>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li className="bodyAll">
            <label htmlFor="name">Your name</label>
            <input
              value={name}
              type="text"
              name="name"
              id="name"
              onChange={(e) => handleChange("name", e.target.value)}
            ></input>
          </li>
          <li className="bodyAll">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              type="email"
              name="email"
              id="email"
              onChange={(e) => handleChange("email", e.target.value)}
            ></input>
          </li>
          <li className="bodyAll">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              name="password"
              id="password"
              onChange={(e) => handleChange("password", e.target.value)}
            ></input>
          </li>
          <li className="bodyAll">
            <label htmlFor="confirmPassword">Re-enter Password</label>
            <input
              value={confirmPassword}
              type="password"
              name="password"
              id="password"
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            ></input>
          </li>
          <button type="submit" className="button full-wi">
            Create your amazona account
          </button>
          <li className="containerSignIn">
            Already have an account?
            <Link className="signIn" to="/signin">
              Sign-In
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default RegisterScreen;
