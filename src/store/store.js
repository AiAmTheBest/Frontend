import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./redux/cart/reducers";
import Cookie from "js-cookie";
import {
  productDetailsReducer,
  productListReducer,
} from "./redux/products/reducers";
import { userSigninReducer } from "./redux/user/reducers";

const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = { cart: { cartItems } };
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
