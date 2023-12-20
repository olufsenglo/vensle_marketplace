import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Filter from "layouts/front/filter";
import Home from "layouts/front/home";
import Detail from "layouts/front/detail";
import ProductDetail from "layouts/front/productDetail";
import GroceryDetail from "layouts/front/groceryDetail";
import Cart from "layouts/front/cart";
import PaymentSuccess from "layouts/front/paymentSuccess";
import PaymentCancel from "layouts/front/paymentCancel";
import OrderSummary from "layouts/front/orderSummary";
import Checkout from "layouts/front/checkout";
import UserProfile from "layouts/front/userProfile";
import NotFound from "layouts/front/notFound";
const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="filter/*" element={<Filter />} />
      <Route path="detail/*" element={<Detail />} />
      <Route path="/product-detail/:productId" element={<ProductDetail />} />

      <Route path="grocery-detail/*" element={<GroceryDetail />} />
      <Route path="user-profile/*" element={<UserProfile />} />
      <Route path="order-summary/*" element={<OrderSummary />} />
      <Route path="checkout/*" element={<Checkout />} />
      <Route path="/payment/success*" element={<PaymentSuccess />} />
      <Route path="/payment/cancel" element={<PaymentCancel />} />
      <Route path="cart/*" element={<Cart />} />
      <Route path="/" element={<Home />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
