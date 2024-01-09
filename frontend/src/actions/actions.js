// actions.js

import axios from 'axios';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  FETCH_CART_ITEMS,
} from '../types/actionTypes';

export const addToCart = (item) => (dispatch, getState) => {
  const isInCart = getState().cart.items.some((cartItem) => cartItem.id === item.id);

  if (isInCart) {
    dispatch({ type: INCREASE_QUANTITY, payload: item.id });
  } else {
    dispatch({ type: ADD_TO_CART, payload: item });
  }

  const token = localStorage.getItem('token');
  if (token) {
    axios.post('/api/cart/add', { item });
  }

  localStorage.setItem('cart', JSON.stringify(getState().cart.items));
};

export const removeFromCart = (itemId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: itemId });

  const token = localStorage.getItem('token');
  if (token) {
    axios.delete(`/api/cart/remove/${itemId}`);
  }

  localStorage.setItem('cart', JSON.stringify(getState().cart.items));
};

export const decreaseQuantity = (itemId) => (dispatch, getState) => {
  dispatch({ type: DECREASE_QUANTITY, payload: itemId });

  const token = localStorage.getItem('token');
  if (token) {
    axios.put(`/api/cart/decrease/${itemId}`);
  }

  localStorage.setItem('cart', JSON.stringify(getState().cart.items));
};

export const increaseQuantity = (itemId) => (dispatch, getState) => {
  dispatch({ type: INCREASE_QUANTITY, payload: itemId });

  const token = localStorage.getItem('token');
  if (token) {
    axios.put(`/api/cart/increase/${itemId}`);
  }

  localStorage.setItem('cart', JSON.stringify(getState().cart.items));
};

export const fetchCartItems = () => (dispatch, getState) => {
  const cartItems = getState().cart.items;
  dispatch({ type: FETCH_CART_ITEMS, payload: cartItems });
  
  localStorage.setItem('cart', JSON.stringify(cartItems));
};
