import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../../store/redux/user/actions";
import "./styles.css";

const SigninScreen = (props) => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [userInfo]);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signin(email, password));
    },
    [email, password]
  );

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h3>SignIn</h3>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li className="bodyAll">
            <label for="email">Email</label>
            <input
              value={email}
              type="email"
              name="email"
              id="email"
              onChange={(e) => handleChange("email", e.target.value)}
            ></input>
          </li>
          <li className="bodyAll">
            <label for="password">Password</label>
            <input
              value={password}
              type="password"
              name="password"
              id="password"
              onChange={(e) => handleChange("password", e.target.value)}
            ></input>
          </li>
          {/* <li>
            <Link to="/" className="button full-wi">
              Sign-In
            </Link>
          </li> */}
          <button type="submit" className="button full-wi">
            Sign-In
          </button>
          <li>New to amazona?</li>
          <li>
            <Link to="/register" className="registerUser">
              Create your amazona account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SigninScreen;
