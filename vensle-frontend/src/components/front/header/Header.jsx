import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, logout } from "actions/auth";
import {
  fetchCartItems,
} from "actions/actions";

import { SET_MESSAGE } from "actions/types";

import NavLinks from "./NavLinks";
import TopMenu from "./TopMenu";
import ProductTypeMenu from "./ProductTypeMenu";
import SignInRegisterLinks from "./SignInRegisterLinks";
import SignInRegisterModal from "./SignInRegisterModal";

import logo from "assets/img/front/logo.PNG";
import Search from "./Search";


const baseURL = "https://nominet.vensle.com/backend";

const Header = ({
  activePill,
  setActivePill
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user?.user);
  const storedCountry = localStorage.getItem("userCountry") || "Unknown";
  const storedCountryFlag = localStorage.getItem("countryFlag") || "";

  const [loginOpen, setLoginOpen] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [resetLink, setResetLink] = useState("");

  const [redirect, setRedirect] = useState("");
  const [driverRegister, setDriverRegister] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const [activeTab, setActiveTab] = useState(1);
  const [showNavbar, setShowNavbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    business_name: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    password_confirmation: "",
  });

  const [resetFormData, setResetFormData] = useState({
    email: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [forgotFormData, setForgotFormData] = useState({
    forgot_email: "",
  });

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  };

  const handleSignInClick = (e) => {
    setLoginOpen(true);
    setActiveTab(1);
  };

  const handleRegisterClick = (e) => {
    setLoginOpen(true);
    setActiveTab(2);
  };

  const handleTopNavClick = (e, name) => {
    if (name === "Logout") {
      e.preventDefault();
      dispatch(logout());
    }
  };

  const handleGetUserCountry = () => {
    if (storedCountry == "UK") return <>United Kingdom</>;
    else if (storedCountry == "US") return <>United States</>;
    else if (storedCountry == "NG") return <>Nigeria</>;
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    setRedirect("?redirect=modal");
    setActiveTab(1);
    setLoginOpen(true);

    dispatch({
      type: SET_MESSAGE,
      payload: {
        type: "success",
        message: "Please sign in to upload a product",
      },
    });
  };

  const handleRegisterDriverClick = (e) => {
    e.preventDefault();
    setDriverRegister(true);
    setActiveTab(2);
    setLoginOpen(true);
  };

  // if (isLoggedIn) {
  //   navigate('/admin/products');
  // }

  const handleScroll = () => {
    if (window.scrollY >= 239) {
      setShowNavbar(true);
    } else if (window.scrollY <= 550) {
      setShowNavbar(false);
    }
  }

  const headerWrapperStyle = {
    boxShadow: '0 0px 7px -2px #bababa'
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <div className="relative" style={headerWrapperStyle}>
      <TopMenu
        isAuthenticated={isAuthenticated}
        handleUploadClick={handleUploadClick}
        handleRegisterDriverClick={handleRegisterDriverClick}
        handleTopNavClick={handleTopNavClick}
        storedCountryFlag={storedCountryFlag}
        handleGetUserCountry={handleGetUserCountry}
      />

      <div>
        <div className="mx-auto max-w-2xl px-4 py-2 sm:px-1 lg:max-w-7xl lg:px-8">
          <ProductTypeMenu position={'relative'} activePill={activePill} setActivePill={setActivePill} />
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-4 pt-4 md:pt-2 md:pb-4 lg:pt-6 lg:pb-4 lg:max-w-7xl lg:px-8">
          <div
            className="flex flex-col gap-[1%] justify-between md:items-center lg:flex-row"
          >
            <Link className="relative px-6 md:z-10 md:px-0" to="/">
              <img className="w-40 md:w-auto" src={logo} alt="vensle" />
            </Link>
            <Search position={'relative'} />

            <SignInRegisterLinks
              user={user}
              handleTopNavClick={handleTopNavClick}
              isAuthenticated={isAuthenticated}
              handleSignInClick={handleSignInClick}
              handleRegisterClick={handleRegisterClick}
            />
          </div>
        </div>
      </div>
      <div style={headerWrapperStyle} className={`bg-white flex transition-all duration-300 mx-auto fixed z-10 w-full left-0 right-0 max-w-2xl pb-2 pt-2 md:pt-2 md:pb-4 lg:pt-2 lg:pb-2 lg:max-w-7xl lg:px-8 ${showNavbar ? 'top-0' : 'top-[-100%]'
        }`}>
        <Search />
        <div className="flex ml-[4%] gap-8">
          <ProductTypeMenu activePill={activePill} setActivePill={setActivePill} />
          <SignInRegisterLinks
            user={user}
            handleTopNavClick={handleTopNavClick}
            isAuthenticated={isAuthenticated}
            handleSignInClick={handleSignInClick}
            handleRegisterClick={handleRegisterClick}
          />
        </div>
      </div>

      <NavLinks
        storedCountryFlag={storedCountryFlag}
        handleGetUserCountry={handleGetUserCountry}
      />

      <SignInRegisterModal
        setLoginOpen={setLoginOpen}
        loginOpen={loginOpen}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />

    </div>
  );
};

export default Header;
