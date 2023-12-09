import apiService from '../services/apiService';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartReducer = (state = initialState, action) => {
  // const isAuthenticated = getState().auth.isLoggedIn;
  const isAuthenticated = action.auth?.isLoggedIn || false;

  switch (action.type) {
    case 'LOAD_CART':
      return action.payload;

    case 'ADD_TO_CART':
      const updatedAddState = [...state, action.payload];
      localStorage.setItem('cart', JSON.stringify(updatedAddState));

      if (isAuthenticated) {
        apiService.addToCart(action.payload); // Make API call to add to cart
      }

      return updatedAddState;

    case 'REMOVE_FROM_CART':
      const updatedRemoveState = state.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(updatedRemoveState));

      if (isAuthenticated) {
        apiService.removeFromCart(action.payload); // Make API call to remove from cart
      }

      return updatedRemoveState;




    case 'INCREASE_QUANTITY':
      let updatedIncreaseItem;
      const updatedIncreaseState = state.map(item => {
        if (item.id === action.payload) {
          updatedIncreaseItem = { ...item, quantity: item.quantity + 1 };
          return updatedIncreaseItem;
        } else {
          return item;
        }
      });

      localStorage.setItem('cart', JSON.stringify(updatedIncreaseState));

      if (isAuthenticated) {
        apiService.updateCart(action.payload, updatedIncreaseItem.quantity); // Make API call to increase quantity
      }

      return updatedIncreaseState;

    case 'DECREASE_QUANTITY':
      let updatedDecreaseItem;
      const updatedDecreaseState = state.map(item => {
        if (item.id === action.payload) {
          updatedDecreaseItem = { ...item, quantity: Math.max(item.quantity - 1, 0) };
          return updatedDecreaseItem;
        } else {
          return item;
        }
      }).filter(item => item.quantity > 0);

      localStorage.setItem('cart', JSON.stringify(updatedDecreaseState));

      if (isAuthenticated) {
        apiService.updateCart(action.payload, updatedDecreaseItem.quantity); // Make API call to decrease quantity
      }

      return updatedDecreaseState;


      


    // case 'INCREASE_QUANTITY':
    //   const updatedIncreaseState = state.map(item =>
    //     item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
    //   );
    //   localStorage.setItem('cart', JSON.stringify(updatedIncreaseState));

    //   if (isAuthenticated) {
    //     apiService.updateCart(action.payload, 1); // Make API call to increase quantity
    //   }

    //   return updatedIncreaseState;

    // case 'DECREASE_QUANTITY':
    //   const updatedDecreaseState = state.map(item =>
    //     item.id === action.payload ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
    //   ).filter(item => item.quantity > 0);
    //   localStorage.setItem('cart', JSON.stringify(updatedDecreaseState));

    //   if (isAuthenticated) {
    //     apiService.updateCart(action.payload, -1); // Make API call to decrease quantity
    //   }

    //   return updatedDecreaseState;

    case 'CLEAR_CART':
      localStorage.removeItem('cart');

      if (isAuthenticated) {
        apiService.clearCart(); // Make API call to clear cart
      }

      return [];

    default:
      return state;
  }
};

export default cartReducer;



// const initialState = JSON.parse(localStorage.getItem('cart')) || [];

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOAD_CART':
//       return action.payload;

//     case 'ADD_TO_CART':
//       // Handle adding to cart in both reducer and localStorage
//       const updatedAddState = [...state, action.payload];
//       localStorage.setItem('cart', JSON.stringify(updatedAddState));
//       return updatedAddState;

//     case 'REMOVE_FROM_CART':
//       // Handle removing from cart in both reducer and localStorage
//       const updatedRemoveState = state.filter(item => item.id !== action.payload);
//       localStorage.setItem('cart', JSON.stringify(updatedRemoveState));
//       return updatedRemoveState;

//     case 'INCREASE_QUANTITY':
//       // Handle increasing quantity in both reducer and localStorage
//       const updatedIncreaseState = state.map(item =>
//         item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
//       );
//       localStorage.setItem('cart', JSON.stringify(updatedIncreaseState));
//       return updatedIncreaseState;

//     case 'DECREASE_QUANTITY':
//       // Handle decreasing quantity in both reducer and localStorage
//       const updatedDecreaseState = state.map(item =>
//         item.id === action.payload ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
//       ).filter(item => item.quantity > 0);
//       localStorage.setItem('cart', JSON.stringify(updatedDecreaseState));
//       return updatedDecreaseState;

//     case 'CLEAR_CART':
//       // Handle clearing the cart in both reducer and localStorage
//       localStorage.removeItem('cart');
//       return [];




//     // case 'ADD_TO_UNAUTHENTICATED_CART':
//     //       return [...state, action.payload];




//     default:
//       return state;
//   }
// };

// export default cartReducer;



// const initialState = JSON.parse(localStorage.getItem('cart')) || [];

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOAD_CART':
//       return action.payload;

//     case 'ADD_TO_CART':
//       const existingItem = state.find(item => item.id === action.payload.id);

//       if (existingItem) {
//         const updatedState = state.map(item =>
//           item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
//         );

//         // Save the updated cart state to localStorage
//         localStorage.setItem('cart', JSON.stringify(updatedState));

//         return updatedState;
//       } else {
//         const updatedState = [...state, { ...action.payload, quantity: 1 }];

//         // Save the updated cart state to localStorage
//         localStorage.setItem('cart', JSON.stringify(updatedState));

//         return updatedState;
//       }

//     case 'INCREASE_QUANTITY':
//       const increasedState = state.map(item =>
//         item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
//       );

//       // Save the updated cart state to localStorage
//       localStorage.setItem('cart', JSON.stringify(increasedState));

//       return increasedState;

//     case 'DECREASE_QUANTITY':
//       const decreasedState = state.map(item =>
//         item.id === action.payload ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
//       ).filter(item => item.quantity > 0);

//       // Save the updated cart state to localStorage
//       localStorage.setItem('cart', JSON.stringify(decreasedState));

//       return decreasedState;

//     case 'REMOVE_FROM_CART':
//       const updatedStateAfterRemove = state.filter(item => item.id !== action.payload);

//       localStorage.setItem('cart', JSON.stringify(updatedStateAfterRemove));

//       return updatedStateAfterRemove;

//     case 'CLEAR_CART':
//       localStorage.removeItem('cart');
//       return [];    
    
//     default:
//       return state;
//   }
// };

// export default cartReducer;
