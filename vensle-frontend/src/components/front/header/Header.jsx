import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
	HomeIcon,
	HeartIcon,
	PlusIcon,
	UserIcon,
	ShoppingCartIcon,
} from '@heroicons/react/24/outline'

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

  const [redirect, setRedirect] = useState("");
  const [driverRegister, setDriverRegister] = useState(false);

  const [activeTab, setActiveTab] = useState(1);
  const [showNavbar, setShowNavbar] = useState(false);

 //TODO:localstate not props
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
        driverRegister={driverRegister}
        setDriverRegister={setDriverRegister}
      />

      <div>
        <div className="hidden lg:block mx-auto max-w-2xl px-4 py-2 sm:px-1 lg:max-w-7xl lg:px-8">
          <ProductTypeMenu position={'relative'} activePill={activePill} setActivePill={setActivePill} />
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 lg:px-8 pt-4 pb-2 md:pt-2 md:pb-4 lg:pt-6 lg:pb-4 lg:max-w-7xl lg:px-8">
          <div
            className="flex flex-col gap-[1%] justify-between lg:items-center lg:flex-row"
          >
            <Link className="relative z-10" to="/">
              <img className="w-[120px] md:w-40 lg:w-auto" src={logo} alt="vensle" />
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
      <div style={headerWrapperStyle} className={`bg-white fixed z-10 transition-all duration-300  w-full left-0 right-0 ${showNavbar ? 'top-0' : 'top-[-100%]'
      }`} >
	      <div className="bg-white flex flex-col lg:flex-row mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pb-2 pt-1 md:pt-2 md:pb-4 lg:pt-2 lg:pb-2 lg:max-w-7xl lg:px-8">
		<Search position="sticky" />
		<div className="flex mt-1 md:mt-2 lg:mt-0 items-center lg:ml-[4%] gap-8">
		  <ProductTypeMenu activePill={activePill} setActivePill={setActivePill} />
		  <SignInRegisterLinks
		    user={user}
		    handleTopNavClick={handleTopNavClick}
		    isAuthenticated={isAuthenticated}
		    handleSignInClick={handleSignInClick}
		    handleRegisterClick={handleRegisterClick}
	  	    visible="onScroll"
		  />
		</div>
	</div>
      </div>
<div className="bg-white fixed py-2 px-4 lg:hidden z-[6] w-full bottom-0 left-0 right-0">

      <div className="flex justify-between mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
          <div className="flex flex-col items-center">
	      <HomeIcon className="w-5 h-5" />
	      <p className="text-[10px]">Home</p>
	  </div>
          <div className="flex flex-col items-center">
	      <HeartIcon className="w-5 h-5" />
	      <p className="text-[10px]">Saved</p>
	  </div>
          <div className="flex flex-col items-center">
	      <PlusIcon className="w-5 h-5" />
	      <p className="text-[10px]">Upload</p>
	  </div>
          <div className="flex flex-col items-center">
	      <UserIcon className="w-5 h-5" />
	      <p className="text-[10px]">Dashboard</p>
	  </div>
          <div className="flex flex-col items-center">
	      <ShoppingCartIcon className="w-5 h-5" />
	      <p className="text-[10px]">Cart</p>
	  </div>
          
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
        driverRegister={driverRegister}
        setDriverRegister={setDriverRegister}
      />

    </div>
  );
};

export default Header;
