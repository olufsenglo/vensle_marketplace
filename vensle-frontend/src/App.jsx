import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Facebook from "layouts/front/socialAuthRedirect/Facebook";
import Filter from "layouts/front/filter";
import Home from "layouts/front/home";
import SocialRedirect from "layouts/front/socialAuthentication/SocialRedirect";
import SavedItems from "layouts/front/savedItems";
import ProductDetail from "layouts/front/productDetail";
import GroceryDetail from "layouts/front/groceryDetail";
import Cart from "layouts/front/cart";
import PaymentSuccess from "layouts/front/paymentSuccess";
import PaymentCancel from "layouts/front/paymentCancel";
import OrderSummary from "layouts/front/orderSummary";
import Checkout from "layouts/front/checkout";
import UserProfile from "layouts/front/userProfile";
import NotFound from "layouts/front/notFound";

import Toaster from "components/front/toaster/Toaster";

const App = () => {
  const [countryCode, setCountryCode] = useState(null);
  const [countryFlagUrl, setCountryFlagUrl] = useState(null);
  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
	{/*put token in env*/}
        const ipinfoResponse = await axios.get('https://ipinfo.io/json?token=09389931bcf565');
        const storedCountryCode = ipinfoResponse.data.country || "NG";

        //const storedCountryCode = "NG";

        setCountryCode(storedCountryCode);

        const countriesNowResponse = await axios.get(
          `https://countriesnow.space/api/v0.1/countries/flag/images/q?iso2=${storedCountryCode}`
        );

        const flagUrl = countriesNowResponse.data.data.flag;
        localStorage.setItem("countryCode", storedCountryCode);
        localStorage.setItem("countryFlag", flagUrl);

        setCountryFlagUrl(flagUrl);
      } catch (error) {
        console.error("Error fetching country info:", error);
      }
    };

    fetchCountryInfo();
  }, []);


  return (
    <>
      <Toaster />
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="social/facebook/callback/*" element={<Facebook />} />
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="rtl/*" element={<RtlLayout />} />
        <Route path="filter/*" element={<Filter />} />
        <Route path="social-auth-redirect/*" element={<SocialRedirect />} />
        <Route path="/product-detail/:productId" element={<ProductDetail />} />
        <Route path="grocery-detail/*" element={<GroceryDetail />} />
        <Route path="saved-items/*" element={<SavedItems />} />
        <Route path="user-profile/:userId/products" element={<UserProfile />} />
        <Route path="order-summary/*" element={<OrderSummary />} />
        <Route path="checkout/*" element={<Checkout />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
        <Route path="cart/*" element={<Cart />} />
        <Route path="/" element={<Home />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
