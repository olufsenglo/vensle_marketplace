// export const addToCart = (productId, quantity) => async (dispatch) => {
//   const response = await apiService.addToCart(productId, quantity);
//   dispatch({
//     type: 'ADD_TO_CART',
//     payload: response.data, // Update payload based on your API response
//   });

// };

// export const removeFromCart = (productId) => async (dispatch) => {
//   const response = await apiService.removeFromCart(productId);
//   dispatch({
//     type: 'REMOVE_FROM_CART',
//     payload: response.data,
//   });
  
// };

// export const increaseQuantity = (productId) => async (dispatch) => {
//   const isAuthenticated = getState().auth.isLoggedIn;

//   dispatch({
//     type: 'INCREASE_QUANTITY',
//     payload: productId,
//   });
  
//   // // If the user is logged in, update cart in the database
//   // if (isAuthenticated) {
//   //   try {
//   //     await apiService.updateCart(productId, );
//   //     //?dispatch an action here if the API call is successful
//   //   } catch (error) {
//   //     console.error('Error updating cart in the database:', error);
//   //   }
//   // }
//   // const response = await apiService.removeFromCart(productId);
// };

// export const increaseQuantity = (productId) => {
//   return {
//     type: 'INCREASE_QUANTITY',
//     payload: productId,
//   };
// };

// export const decreaseQuantity = (productId) => {
//   return {
//     type: 'DECREASE_QUANTITY',
//     payload: productId,
//   };
// };

// export const updateCart = (productId, quantity) => async (dispatch) => {
//   const response = await apiService.updateCart(productId, quantity);
//   dispatch({
//     type: 'UPDATE_CART',
//     payload: response.data,
//   });
// };

// export const clearCart = () => async (dispatch) => {
//   const response = await apiService.clearCart();
//   dispatch({
//     type: 'CLEAR_CART',
//     payload: response.data,
//   });

// };

export const addToCart = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: product,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: productId,
  };
};

export const increaseQuantity = (productId) => {
  return {
    type: 'INCREASE_QUANTITY',
    payload: productId,
  };
};

export const decreaseQuantity = (productId) => {
  return {
    type: 'DECREASE_QUANTITY',
    payload: productId,
  };
};

export const loadCart = (cartData) => {
  return {
    type: 'LOAD_CART',
    payload: cartData,
  };
};

export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};


// export const addToUnauthenticatedCart = (product) => (dispatch) => {
//   dispatch({
//     type: 'ADD_TO_UNAUTHENTICATED_CART',
//     payload: product,
//   });
// };