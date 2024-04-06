import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import { emptyCart } from "actions/actions"
import AuthService from "services/auth.service";

const API_URL = "https://nominet.vensle.com/backend/api/v1/";
//const API_URL = "https://nominet.vensle.com/backend/api/v1/";

export const register =
  (
    name,
    business_name,
    email,
    phone_number,
    address,
    password,
    password_confirmation
  ) =>
  (dispatch) => {
    return AuthService.register(
      name,
      business_name,
      email,
      phone_number,
      address,
      password,
      password_confirmation
    ).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: {
            type: "success",
            message: "Registration successfull, you can now login",
          },
        });

        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data.errors
          ? error.response.data.errors
          : { dispatchError: error.response.data.message };

        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: { type: "error", message },
        });

        return Promise.reject();
      }
    );
  };

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      //Merge cart TODO:put in await

      //Merge cart items with cart items in database
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length > 0) {
        axios.post(
          `${API_URL}merge-cart`,
          { cart },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${data.token}`,
            },
          }
        );
      }

        // Fetch the cart items
        axios
          .get(`${API_URL}cart`, {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then((cartResponse) => {
		  console.log("cartrr",cartResponse)
            if (cartResponse) {
              const userCartItems = cartResponse.data;
	      dispatch({ type: "REPLACE_CART", payload: userCartItems.cart });
              localStorage.setItem("cart", JSON.stringify(userCartItems.cart));
            }
          })
          .catch((error) => {
            console.error("Cart fetch error:", error);
          });

      dispatch({
        type: SET_MESSAGE,
        payload: { type: "success", message: "Login sucessfull" },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response?.data?.errors
        ? error.response?.data?.errors
        : { dispatchError: error.response?.data?.message };

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: { type: "error", message },
      });

      return Promise.reject();
    }
  );
};

export const updateUserProfile = (userData) => (dispatch, getState) => {
  dispatch({
    type: "UPDATE_USER_PROFILE",
    payload: userData,
  });

  localStorage.setItem("user", JSON.stringify(getState().auth.user));
};

//export const updateUserProfile = (userData) => ({
//type: 'UPDATE_USER_PROFILE',
//payload: userData,
//});

export const logout = () => (dispatch) => {
   localStorage.removeItem("cart");
   dispatch({ type: 'EMPTY_CART' });
   AuthService.logout();

   dispatch({
     type: LOGOUT,
   });
   dispatch({
      type: SET_MESSAGE,
      payload: { type: "success", message: "Logout sucessfull" },
   });
	
};
