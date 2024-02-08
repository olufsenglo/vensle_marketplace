import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

let composeEnhancers = compose;

// Check if Redux DevTools Extension is installed and available
if (
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
