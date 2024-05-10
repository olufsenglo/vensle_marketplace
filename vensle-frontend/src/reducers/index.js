import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import checkoutReducer from './checkoutReducer'; 
import groceryReducer from './groceryReducer';
import savedProductReducer from './savedProductReducer';

export default combineReducers({
  auth,
  message,
  cart: groceryReducer,
  savedProduct: savedProductReducer,
  checkout: checkoutReducer,
});
