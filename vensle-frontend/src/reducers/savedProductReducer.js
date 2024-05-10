import {
  SAVE_PRODUCT,
  REMOVE_SAVED_PRODUCT
} from "../types/actionTypes";

const initialState = {
  savedProducts: JSON.parse(localStorage.getItem("savedProducts")) || [],
};

const savedItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PRODUCT:
      return {
	      ...state,
	      savedProducts: [...state.savedProducts, action.payload]
      };

    case REMOVE_SAVED_PRODUCT:
      return {
        ...state,
        savedProducts: state.savedProducts.filter(
		(productId) => productId !== action.payload
	),
      };

    default:
      return state;
  }
};

export default savedItemReducer;
