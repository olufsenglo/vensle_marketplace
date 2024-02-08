import axios from "axios";

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  FETCH_CART_ITEMS,
} from "../types/actionTypes";
import { SET_MESSAGE } from "./types";

export const addToCart = (item) => (dispatch, getState) => {
  const isInCart = getState().cart.items.some(
    (cartItem) => cartItem.id === item.id
  );

  if (isInCart) {
    dispatch({ type: INCREASE_QUANTITY, payload: item.id });
  } else {
    dispatch({ type: ADD_TO_CART, payload: item });
  }

  const authInfo = localStorage.getItem("user");
  console.log("innfooautuza", authInfo?.user);
  if (authInfo?.user?.token) {
    const token = authInfo.user.token;
    axios.post(
      "https://nominet.vensle.com/backend/api/v1/add-to-cart",
      { id: item.id, quantity: item.quantity },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  localStorage.setItem("cart", JSON.stringify(getState().cart.items));

  dispatch({
    type: SET_MESSAGE,
    payload: { type: "success", message: "Item added to cart" },
  });
};

export const removeFromCart = (itemId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: itemId });

  const token = localStorage.getItem("token");
  if (token) {
    axios.delete(`/api/cart/remove/${itemId}`);
  }

  localStorage.setItem("cart", JSON.stringify(getState().cart.items));
};

export const decreaseQuantity = (itemId) => (dispatch, getState) => {
  dispatch({ type: DECREASE_QUANTITY, payload: itemId });

  const token = localStorage.getItem("token");
  if (token) {
    axios.put(`/api/cart/decrease/${itemId}`);
  }

  localStorage.setItem("cart", JSON.stringify(getState().cart.items));
};

export const increaseQuantity = (itemId) => (dispatch, getState) => {
  dispatch({ type: INCREASE_QUANTITY, payload: itemId });

  const token = localStorage.getItem("token");
  if (token) {
    axios.put(`/api/cart/increase/${itemId}`);
  }

  localStorage.setItem("cart", JSON.stringify(getState().cart.items));
};

export const fetchCartItems = () => (dispatch, getState) => {
  const cartItems = getState().cart.items;
  dispatch({ type: FETCH_CART_ITEMS, payload: cartItems });

  localStorage.setItem("cart", JSON.stringify(cartItems));
};
