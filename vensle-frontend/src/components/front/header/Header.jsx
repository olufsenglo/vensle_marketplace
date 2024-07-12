import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const pathname = location.pathname;

  const pageName = pathname.split('/').filter(Boolean).pop();
	

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user?.user);
  const cartItems = useSelector((state) => state.cart.items);

  const storedLocation = JSON.parse(localStorage.getItem("location"));
  const storedCountry = storedLocation?.country || "Unknown";
  const storedCountryFlag = localStorage.getItem("countryFlag") || "";

  const [loginOpen, setLoginOpen] = useState(false);

  const [redirect, setRedirect] = useState("");
  const [driverRegister, setDriverRegister] = useState(false);

  const [activeTab, setActiveTab] = useState(1);
  const [showNavbar, setShowNavbar] = useState(false);

  const validCartItems = cartItems.filter(item => item && item && item.price);

  const totalItems = validCartItems.reduce(
    (total, item) => total + (item.quantity ? item.quantity : 0),
    0
  );

  const handleLogoClick = (e) => {
    e.preventDefault()
    // Check if on homepage
if (window.location.pathname === "/") {
      setActivePill(1);
    } else {
      navigate("/");
    }
  };	

 //TODO:use localstate not props
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

const bottomStickyGoToPage = (redirectPage) => {
	if(!isAuthenticated) {
	    setRedirect(redirectPage)
    	    setLoginOpen(true);
	    dispatch({
	      type: SET_MESSAGE,
	      payload: {
		type: "success",
		message: "Please sign in",
	      },
	    });
	}
}

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
	storedCountry = {storedCountry}
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
            className="flex md:relative flex-col gap-[1%] justify-between lg:items-center lg:flex-row"
          >
            <Link onClick={handleLogoClick} className="relative" to="/">
              <img className="w-[120px] md:w-40 lg:w-auto" src={logo} alt="vensle" />
            </Link>
            <Search position={'relative'} />

	   {/*TODO: make props local state*/}
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
	   	  {/*TODO: make props local state*/}
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
<div className="bg-white fixed px-4 lg:hidden z-[6] w-full bottom-0 left-0 right-0" style={headerWrapperStyle}>
      {/*TODO: put in component, same for each link, this is tooo repeative, i cant even handle it*/}
      <div className="flex justify-between mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
	  <Link to="/" className={`flex flex-col items-center px-4 py-3 rounded-sm cursor-pointer hover:bg-gray-200 transition duration-300 ${pathname === "/" ? "font-bold bg-gray-200" : (pageName === "" && "font-bold bg-gray-200")}`}>
	      <HomeIcon className="w-5 h-5" />
	      <p className="text-[10px]">Home</p>
	  </Link>
	  {isAuthenticated ?
		<Link to="/saved-items" className={`flex flex-col items-center py-3 px-4 rounded-sm cursor-pointer hover:bg-gray-200 transition duration-300 ${pageName === "saved-items" && "font-bold bg-gray-200"}`}>
	      	    <HeartIcon className="w-5 h-5" />
              	   <p className="text-[10px]">Saved</p>
               </Link>
	       :
          	<div onClick={() => bottomStickyGoToPage('/saved-items')} className="flex flex-col items-center py-3 px-4 rounded-sm cursor-pointer hover:bg-gray-200 transition duration-300">
	      	    <HeartIcon className="w-5 h-5" />
	      	    <p className="text-[10px]">Saved</p>
	  	</div>
	  }
	  {isAuthenticated ?
		<Link to="/admin/upload-product" className={`flex flex-col items-center py-3 px-4 rounded-sm cursor-pointer hover:bg-gray-200 transition duration-300 ${pageName === "upload-product" && "font-bold bg-gray-200"}`}>
	          <PlusIcon className="w-5 h-5" />
	          <p className="text-[10px]">Upload</p>
               </Link>
	       :
          	<div onClick={() => bottomStickyGoToPage('/admin/upload-product')} className="flex flex-col items-center py-3 px-4 rounded-sm cursor-pointer hover:bg-gray-200 transition duration-300">
	           <PlusIcon className="w-5 h-5" />
	     	    <p className="text-[10px]">Upload</p>
	  	</div>
	  }
	  {isAuthenticated ?
		<Link to="/admin" className={`flex flex-col items-center py-3 px-4 rounded-sm cursor-pointer hover:bg-gray-200 transition duration-300 ${pageName === "admin" && "font-bold bg-gray-200"}`}>
	      <UserIcon className="w-5 h-5" />
	          <p className="text-[10px]">Dashboard</p>
                  </Link>
	       :
          	<div onClick={() => bottomStickyGoToPage('/admin')} className="flex flex-col items-center py-3 px-4 rounded-sm cursor-pointer hover:bg-gray-200 transition duration-300">
	           <UserIcon className="w-5 h-5" />
	      	   <p className="text-[10px]">Dashboard</p>
	  	</div>
	  }
	  {isAuthenticated ?
		<Link to="/cart" className={`flex relative flex-col items-center py-3 px-4 rounded-sm cursor-pointer hover:bg-gray-200 transition duration-300 ${pageName === "cart" && "font-bold bg-gray-200"}`}>
		{totalItems > 0 && (
		  <span
		    className="absolute top-[5px] right-[11px] text-[0.7rem] w-[15px] h-[15px] flex items-center justify-center rounded-full bg-red-500 text-white"
		  >
		    {totalItems}
		  </span>
		)}
	              <ShoppingCartIcon className="w-5 h-5" />
	              <p className="text-[10px]">Cart</p>
                  </Link>
	       :
          	<div onClick={() => bottomStickyGoToPage('/cart')} className="flex relative flex-col items-center py-3 px-4 rounded-sm cursor-pointer hover:bg-gray-200 transition duration-300">
		{totalItems > 0 && (
		  <span
		    className="absolute top-[5px] right-[11px] text-[0.7rem] w-[15px] h-[15px] flex items-center justify-center rounded-full bg-red-500 text-white"
		  >
		    {totalItems}
		  </span>
		)}
	          <ShoppingCartIcon className="w-5 h-5" />
	          <p className="text-[10px]">Cart</p>
	  	</div>
	  }
          
        </div>
</div>

      <NavLinks
        storedCountryFlag={storedCountryFlag}
        storedCountry={storedCountry}
      />

      <SignInRegisterModal
        setLoginOpen={setLoginOpen}
        loginOpen={loginOpen}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        driverRegister={driverRegister}
        setDriverRegister={setDriverRegister}
	redirect={redirect}
      />

    </div>
  );
};

export default Header;
