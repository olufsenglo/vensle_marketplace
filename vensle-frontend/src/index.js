import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";
import LocationInitializer from './components/locationInitializer/LocationInitializer';

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <LocationInitializer />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
