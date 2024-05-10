import axios from "axios";

import {
  SAVE_PRODUCT,
  REMOVE_SAVED_PRODUCT
} from "../types/actionTypes";

export const saveProduct = (productId) => ({
  type: SAVE_PRODUCT,
  payload: productId,
});

export const removeSavedProduct = (productId) => ({
  type: REMOVE_SAVED_PRODUCT,
  payload: productId,
});
