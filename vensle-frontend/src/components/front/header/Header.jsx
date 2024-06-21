import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Dialog,
  RadioGroup,
  Transition,
  Disclosure,
  Menu,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register, logout } from "actions/auth";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  fetchCartItems,
} from "actions/actions";

import { SET_MESSAGE } from "actions/types";

import Top from "./Top";
import CartLink from "./CartLink";
import NavLinks from "./NavLinks";
import TopMenu from "./TopMenu";
import ProductTypeMenu from "./ProductTypeMenu";
import SignInRegisterLinks from "./SignInRegisterLinks";
import SignInRegisterModal from "./SignInRegisterModal";
import AuthUserDropDownMenu from "./AuthUserDropDownMenu";

import logo from "assets/img/front/logo.PNG";
import person from "assets/img/front/person.PNG";
import cart from "assets/img/front/cart.PNG";
import Search from "./Search";

const sortOptions = [
  { name: "Profile", href: "/admin/profile", current: false },
  { name: "Upload a product", href: "/admin/upload-product", current: false },
  { name: "Dashboard", href: "/admin/default", current: false },
  { name: "Logout", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const baseURL = "https://nominet.vensle.com/backend";

const Header = ({
  activePill,
  setActivePill
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user?.user);
  const cartItems = useSelector((state) => state.cart.items);
  const storedCountry = localStorage.getItem("userCountry") || "Unknown";
  const storedCountryFlag = localStorage.getItem("countryFlag") || "";

  const [open, setOpen] = useState(false);
  const [loginRegisterOpen, setLoginRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [resetTokenError, setResetTokenError] = useState("");

  const [redirect, setRedirect] = useState("");
  const [driverRegister, setDriverRegister] = useState(false);

  const [loading, setLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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

  const handleShowLoginForm = (e) => {
    e.preventDefault();
    //TODO: put reset loading, formdata and error in helper function
    setLoading(false);
    setResetPasswordError("");
    setRegisterError("");

    setFormData({
      email: "",
      password: "",
    });

    setRegisterFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    setResetFormData({
      email: "",
      new_password: "",
      new_password_confirmation: "",
    });

    dispatch({
      type: "CLEAR_MESSAGE",
    });

    setActiveTab(1);
  };

  const handleShowRegisterForm = (e) => {
    e.preventDefault();
    //TODO: put reset loading, formdata and error in helper function
    setLoading(false);
    setLoginError(false);
    setResetPasswordError("");
    setRegisterError("");

    setFormData({
      email: "",
      password: "",
    });

    setRegisterFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    setResetFormData({
      email: "",
      new_password: "",
      new_password_confirmation: "",
    });

    dispatch({
      type: "CLEAR_MESSAGE",
    });

    setActiveTab(2);
  };

  const handleShowResetForm = (e) => {
    e.preventDefault();
    //TODO: put reset loading, formdata and error in helper function
    setLoading(false);
    setLoginError(false);
    setRegisterError("");

    setRegisterFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    setResetFormData({
      email: "",
      new_password: "",
      new_password_confirmation: "",
    });

    dispatch({
      type: "CLEAR_MESSAGE",
    });
    setActiveTab(3);
  };

  const getDisplayFromImagesArray = (product) => {
    const displayImage = product.images.find(
      (image) => image.id === product.display_image_id
    );
    return displayImage ? `${baseURL}/uploads/${displayImage.name}` : "";
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    if (registerFormData.password != registerFormData.password_confirmation)
      setRegisterError("Passwords do not match");

    dispatch(
      register(
        registerFormData.name,
        registerFormData.business_name,
        registerFormData.email,
        registerFormData.phone_number,
        registerFormData.address,
        registerFormData.password,
        registerFormData.password_confirmation
      )
    )
      .then(() => {
        setLoading(false);
        setRegisterError(false);
        setRegisterFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });

        setActiveTab(1);
      })
      .catch((error) => {
        console.log("error", error);
        setRegisterError("email already taken");
        setLoading(false);
      });
  };

  const handleForgotLinkClick = (resetLink) => {
    setResetToken(resetLink);
    setSuccessMessage("");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResetPasswordError("");


    if (!resetToken) {
      try {
        const forgotData = { email: forgotFormData.forgot_email };
        const response = await axios.post(
          `${baseURL}/api/v1/forgot-password`,
          forgotData
        );
        setResetLink(response.data.token);
        setSuccessMessage(response.data.message);
        setResetPasswordError("");
        setLoading(false);
      } catch (error) {
        if (error.response) {
          if (error.response.data.error) {
            setResetPasswordError(error.response.data.error);
          } else if (error.response.data.errors) {
            const errorMessages = Object.values(
              error.response.data.errors
            ).flat();
            setResetPasswordError(errorMessages);
          } else {
            setResetPasswordError("An unexpected error occurred.");
          }
        }
        setLoading(false);
      }
    } else {
      try {
        const resetData = {
          email: forgotFormData.forgot_email,
          token: resetToken,
          password: resetFormData.new_password,
          password_confirmation: resetFormData.new_password_confirmation,
        };

        const response = await axios.post(
          `${baseURL}/api/v1/reset-password`,
          resetData
        );
        setSuccessMessage("");
        setResetPasswordError("");
        setLoading(false);
        setResetToken("");
        setResetLink("");

        handleTabClick(1);
        dispatch({
          type: SET_MESSAGE,
          payload: {
            type: "success",
            message: "Password reset successfull you can now login with your new password"
          },
        });
      } catch (error) {
        if (error.response) {
          if (error.response.data.error) {
            setResetPasswordError(error.response.data.error);
          } else if (error.response.data.errors) {
            const errorMessages = Object.values(
              error.response.data.errors
            ).flat();
            setResetPasswordError(errorMessages);
          } else {
            setResetPasswordError("An unexpected error occurred.");
          }
        }
        setLoading(false);
      }

      /*
       if (resetFormData.email == '')
         setResetPasswordError("Email cannot be empty");

      if (resetFormData.new_password != resetFormData.new_password_confirmation)
       {
       setResetPasswordError("Passwords do not match");
       }
       */
    }
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

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //       window.removeEventListener('scroll', handleScroll)
  //   }
  // }, []);

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
      {showNavbar && <div style={headerWrapperStyle} className="bg-white top-0 fixed z-10 w-full border-b border-b-gray-200/50">
        <div className="flex mx-auto max-w-2xl py-4 pt-4 md:pt-2 md:pb-4 lg:pt-6 lg:pb-4 lg:max-w-7xl lg:px-8">
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
      </div>}

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
