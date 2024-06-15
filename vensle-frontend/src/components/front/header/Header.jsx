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
import NavLinks from "./NavLinks";
import CartLink from "./CartLink";

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

const Header = () => {
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

  const [activeTab, setActiveTab] = useState(1);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  const handleResetInputChange = (e) => {
    const { name, value } = e.target;
    setResetFormData({
      ...resetFormData,
      [name]: value,
    });
  };

  const handleForgotInputChange = (e) => {
    const { name, value } = e.target;
    setForgotFormData({
      ...forgotFormData,
      [name]: value,
    });
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

  const handleFacebookLogin = async (e) => {
    setFacebookLoading(true);
    window.location.href = `${baseURL}/api/v1/auth/facebook`;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    //if (loginError == '')
    dispatch(login(formData.email, formData.password))
      .then(() => {
        if (redirect) {
          navigate("/admin/upload-product?redirect=modal");
        } else {
          navigate("/admin/default");
        }

        //window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setLoginError(true);
        setLoading(false);
      });
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setGoogleLoading(true);
    window.location.href = `${baseURL}/api/v1/auth/google`;
  };

  // if (isLoggedIn) {
  //   navigate('/admin/products');
  // }

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <>
      <div className="hidden bg-white md:block">
        <div className="mx-auto max-w-2xl pt-2 lg:max-w-7xl lg:px-8">
          <div
            className="flex justify-between pt-4"
            style={{ fontSize: "15px" }}
          >
            <ul className="flex justify-between">
              <li className="mr-6 hidden lg:block">
                Welcome to our Online Store!
              </li>
              {isAuthenticated ? (
                <li
                  className="mr-6 hidden text-red-500 md:flex"
                  style={{ color: "#ff5959" }}
                >
                  <Link to="/admin/upload-product?redirect=modal">
                    Upload Your Product
                  </Link>
                </li>
              ) : (
	       <>
                <li
                  onClick={(e) => handleUploadClick(e)}
                  className="mr-6 hidden cursor-pointer text-red-500 lg:flex"
                  style={{ color: "#ff5959" }}
                >
                  Upload Your Product
                </li>
                <li
                  onClick={(e) => handleRegisterDriverClick(e)}
                  className="hidden cursor-pointer text-red-500 lg:block"
                  style={{ color: "#ff5959" }}
                >
                  Register as a Driver
                </li>
	       </>
              )}
            </ul>
            <ul className="flex justify-between">
              <li
                className="mr-0 text-red-500 lg:mr-6"
                style={{ color: "#ff5959" }}
              >
                {isAuthenticated && (
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button
                        className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                        style={{ color: "#ff5959" }}
                      >
                        For Sale
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="ring-black absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <Link
                                  to={option.href}
                                  onClick={(e) =>
                                    handleTopNavClick(e, option.name)
                                  }
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </li>
              <li className="hidden items-center lg:flex">
                {storedCountryFlag && (
                  <img
                    className="mr-2 h-6 w-6 rounded-full"
                    src={storedCountryFlag}
                    alt="country flg"
                  />
                )}
                {handleGetUserCountry()}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-4 pt-4 md:pt-2 md:pb-4 lg:py-8 lg:max-w-7xl lg:px-8">
          <div
            className="flex flex-col justify-between md:items-center lg:flex-row"
            style={{ gap: "1%" }}
          >
            <Link className="relative px-6 md:z-10 md:px-0" to="/">
              <img className="w-40 md:w-[218px]" src={logo} alt="vensle" />
            </Link>
            <Search />

            <div
              className="absolute right-0 left-0 mr-auto ml-auto flex max-w-2xl items-center justify-end px-6 md:px-0 lg:relative lg:max-w-none lg:justify-start"
              style={{ "font-size": "0.9rem" }}
            >
              <div className="flex items-center">
                {/*Place in component*/}
                {isAuthenticated && (
                  <Menu
                    as="div"
                    className="relative mr-2 inline-block text-left lg:hidden"
                  >
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Hello {user.name}
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="ring-black absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <Link
                                  to={option.href}
                                  onClick={(e) =>
                                    handleTopNavClick(e, option.name)
                                  }
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}

                {!isAuthenticated && (
                  <img
                    src={person}
                    onClick={handleSignInClick}
                    className="mr-[4px] block cursor-pointer lg:hidden"
                  />
                )}
                <img src={person} className="mr-[4px] hidden lg:block" />

                <div className="justify-space-between flex hidden h-full flex-col lg:block">
                  {isAuthenticated && (
                    <p
                      style={{
                        fontSize: "12px",
                        marginTop: "0px",
                        marginBottom: "3px",
                      }}
                    >
                      Hello {user.name}
                    </p>
                  )}
                  <h2
                    style={{
                      cursor: "pointer",
                      fontWeight: "600",
                      marginTop: "-3px",
                    }}
                  >
                    {isAuthenticated ? (
                      <Link to="/admin/default">Dashboard</Link>
                    ) : (
                      <>
                        <span onClick={handleSignInClick}>Sign In</span>/
                        <span onClick={handleRegisterClick}>Register</span>
                      </>
                    )}
                  </h2>
                </div>
              </div>

              <CartLink />
            </div>
          </div>
        </div>
      </div>

      <NavLinks
        storedCountryFlag={storedCountryFlag}
        handleGetUserCountry={handleGetUserCountry}
      />

      <Transition.Root show={loginOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setLoginOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-lg md:px-4 lg:max-w-xl">
                  <div className="relative flex w-full items-center overflow-hidden rounded-lg bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setLoginOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="w-full">
                      <div className="mx-auto mt-8 max-w-md bg-white pb-6">
                        {activeTab === 3 && (
                          <form onSubmit={handleResetPassword}>
                            <div className="mb-4 flex justify-center">
                              <h3 className="inline border-b-2 border-red-500 py-2 px-4 pb-1 text-center">
                                FORGOT PASSWORD
                              </h3>
                            </div>
                            <div className="mt-4">
                              <h6
                                onClick={handleShowLoginForm}
                                className="mb-4 inline-flex items-center cursor-pointer text-sm font-medium transition-all duration-300 ease-in-out hover:text-gray-600"
                              >
				<ArrowLeftIcon className="h-4 w-4 mr-1" />
                                Back
                              </h6>

                              {successMessage && resetLink && (
                                <p className="mb-2">
                                  {successMessage} to reset your password{" "}
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleForgotLinkClick(resetLink)
                                    }
                                    style={{ color: "green" }}
                                  >
                                    click here
                                  </span>
                                </p>
                              )}

                              {resetPasswordError && (
                                <p className="mb-4" style={{ color: "red" }}>
                                  {resetPasswordError}
                                </p>
                              )}

                              {!resetToken ? (
                                <>
                                  {!successMessage && !resetLink && (
                                    <div>
                                      <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Email address
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          id="forgot_email"
                                          name="forgot_email"
                                          type="email"
                                          value={forgotFormData.forgot_email}
                                          onChange={handleForgotInputChange}
                                          className="block px-3 py-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <>

                                  <div>
                                    <label
                                      htmlFor="new_password"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      New Password
                                    </label>
                                    <div className="mt-2">
                                      <input
                                        id="new_password"
                                        name="new_password"
                                        type="password"
                                        value={resetFormData.new_password}
                                        onChange={handleResetInputChange}
                                        className="block px-3 py-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="new_password_confirmation"
                                      className="block mt-4 text-sm font-medium leading-6 text-gray-900"
                                    >
                                      New Password Again
                                    </label>
                                    <div className="mt-2">
                                      <input
                                        id="new_password_confirmation"
                                        name="new_password_confirmation"
                                        type="password"
                                        value={
                                          resetFormData.new_password_confirmation
                                        }
                                        onChange={handleResetInputChange}
                                        className="block px-3 py-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>
                                </>
                              )}

                              {successMessage && resetLink ? (
                                ""
                              ) : (
                                <div class="-mx-2 mt-6 flex items-center">
                                  <button
                                    type="submit"
                                    disabled={loading ? true : false}
                                    className="mx-2 flex w-full transform items-center justify-center rounded-lg bg-red-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none"
                                  >
                                    {loading ? (
                                      <span>Loading...</span>
                                    ) : (
                                      <span>Reset Password</span>
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          </form>
                        )}
                        {activeTab !== 3 && (
                          <div>
                            <div className="mb-6 flex">
                              <div
                                className={`w-full cursor-pointer py-2 px-4 text-center ${
                                  activeTab === 1
                                    ? "border-b-2 border-red-500 transition duration-300"
                                    : "bg-white text-gray-500"
                                }`}
                                onClick={handleShowLoginForm}
                              >
                                SIGN IN
                              </div>
                              <div
                                className={`w-full cursor-pointer py-2 px-4 text-center ${
                                  activeTab === 2
                                    ? "border-b-2 border-red-500 transition duration-300"
                                    : "bg-white text-gray-500"
                                }`}
                                onClick={handleShowRegisterForm}
                              >
                                REGISTER
                              </div>
                            </div>

                            <div className="mt-4">
                              {activeTab === 1 && (
                                <div
                                  className={`transition duration-300 ${
                                    activeTab === 1
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                >
                                  <section className="bg-white dark:bg-gray-900">
                                    <div className="container mx-auto flex items-center justify-center px-6">
                                      <form
                                        onSubmit={handleLogin}
                                        className="w-full max-w-md"
                                      >
                                        {message?.message?.dispatchError && (
                                          <p
                                            style={{
                                              color: "red",
                                              marginTop: "16px",
                                            }}
                                          >
                                            {message.message.dispatchError}
                                          </p>
                                        )}

                                        <div>
                                          <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Email address
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="login_email"
                                              name="email"
                                              type="text"
                                              autoComplete="email"
                                              value={formData.email}
                                              onChange={handleInputChange}
                                              className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                message &&
                                                message?.message?.email
                                                  ? "border border-red-400"
                                                  : "border-0"
                                              }`}
                                            />
                                          </div>
                                          {message &&
                                            message?.message?.email &&
                                            message.message.email.map(
                                              (error, index) => (
                                                <p
                                                  style={{
                                                    color: "red",
                                                    fontSize: "13px",
                                                  }}
                                                >
                                                  {error}
                                                </p>
                                              )
                                            )}
                                        </div>

                                        <div className="mt-4">
                                          <div className="flex items-center justify-between">
                                            <label
                                              htmlFor="password"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Password
                                            </label>
                                            <div className="text-sm">
                                              <a
                                                onClick={handleShowResetForm}
                                                href="#"
                                                className="text-red-500 hover:text-red-600"
                                              >
                                                Forgot password?
                                              </a>
                                            </div>
                                          </div>
                                          <div className="mt-2">
                                            <input
                                              id="password"
                                              name="password"
                                              type="password"
                                              autoComplete="current-password"
                                              value={formData.password}
                                              onChange={handleInputChange}
                                              className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                message &&
                                                message?.message?.password
                                                  ? "border border-red-400"
                                                  : "border-0"
                                              }`}
                                            />
                                          </div>
                                          {message &&
                                            message?.message?.password &&
                                            message.message.password.map(
                                              (error, index) => (
                                                <p
                                                  style={{
                                                    color: "red",
                                                    fontSize: "13px",
                                                  }}
                                                >
                                                  {error}
                                                </p>
                                              )
                                            )}
                                        </div>

                                        <div class="-mx-2 mt-6 flex items-center">
                                          <button
                                            type="submit"
                                            disabled={loading ? true : false}
                                            className={`mx-2 flex w-full transform items-center justify-center rounded-lg bg-red-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none ${
                                              loading
                                                ? "cursor-not-allowed bg-red-400"
                                                : ""
                                            }`}
                                          >
                                            {loading ? (
                                              <span>Loading...</span>
                                            ) : (
                                              <span>Login</span>
                                            )}
                                          </button>
                                        </div>

                                        <div class="mt-4 flex items-center justify-between">
                                          <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                                          <span
                                            to="#"
                                            class="text-center text-xs uppercase text-gray-500 hover:underline dark:text-gray-400"
                                          >
                                            or login with Social Media
                                          </span>

                                          <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                                        </div>

                                        <div class="-mx-2 mt-6 flex items-center">
                                          <button
                                            disable={googleLoading}
                                            onClick={handleGoogleLogin}
                                            href="#"
                                            className="mx-2 flex w-full transform items-center justify-center rounded-lg bg-red-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none"
                                          >
                                            {googleLoading
                                              ? "Loading..."
                                              : "Sign in with Google"}
                                          </button>

                                          <button
                                            onClick={handleFacebookLogin}
                                            disabled={facebookLoading}
                                            type="button"
                                            className="mx-2 transform rounded-lg bg-red-200 p-2 text-sm font-medium text-gray-900 transition-colors duration-300 hover:bg-red-100"
                                          >
                                            <span>
                                              {facebookLoading ? (
                                                "Loading"
                                              ) : (
                                                <svg
                                                  className="fill-current mx-2 h-5 w-5"
                                                  fill="currentColor"
                                                  style={{ color: "#1877f2" }}
                                                  viewBox="0 0 24 24"
                                                >
                                                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                                </svg>
                                              )}
                                            </span>
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </section>
                                </div>
                              )}
                              {activeTab === 2 && (
                                <div
                                  className={`transition duration-300 ${
                                    activeTab === 2
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                >
                                  {driverRegister && (
                                    <div className="text-center">
                                      <p>
                                        You are about to Register as a Driver
                                      </p>
                                      <p>
                                        Click to
                                        <span
                                          onClick={() =>
                                            setDriverRegister(false)
                                          }
                                          className="mx-1 cursor-pointer text-blue-500"
                                        >
                                          Register as normal user
                                        </span>
                                      </p>
                                    </div>
                                  )}
                                  <section class="bg-white dark:bg-gray-900">
                                    <div class="container mx-auto flex items-center justify-center px-6">
                                      <form
                                        onSubmit={handleRegister}
                                        class="w-full max-w-md"
                                      >
                                        {message?.message?.dispatchError && (
                                          <p
                                            style={{
                                              color: "red",
                                              marginTop: "16px",
                                            }}
                                          >
                                            {message.message.dispatchError}
                                          </p>
                                        )}

                                        <div>
                                          <label
                                            htmlFor="username"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Full Name
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="name"
                                              name="name"
                                              type="text"
                                              autoComplete="name"
                                              value={registerFormData.name}
                                              onChange={
                                                handleRegisterInputChange
                                              }
                                              className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                message &&
                                                message?.message?.name
                                                  ? "border border-red-400"
                                                  : "border-0"
                                              }`}
                                            />
                                          </div>

                                          {message &&
                                            message?.message?.name &&
                                            message.message.name.map(
                                              (error, index) => (
                                                <p
                                                  style={{
                                                    color: "red",
                                                    fontSize: "13px",
                                                  }}
                                                >
                                                  {error}
                                                </p>
                                              )
                                            )}
                                        </div>

                                        <div className="mt-4">
                                          <label
                                            htmlFor="business_name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Business Name
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="business_name"
                                              name="business_name"
                                              type="text"
                                              autoComplete="business_name"
                                              value={
                                                registerFormData.business_name
                                              }
                                              onChange={
                                                handleRegisterInputChange
                                              }
                                              className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                message &&
                                                message?.message?.business_name
                                                  ? "border border-red-400"
                                                  : "border-0"
                                              }`}
                                            />
                                          </div>

                                          {message &&
                                            message?.message?.business_name &&
                                            message.message.business_name.map(
                                              (error, index) => (
                                                <p
                                                  style={{
                                                    color: "red",
                                                    fontSize: "13px",
                                                  }}
                                                >
                                                  {error}
                                                </p>
                                              )
                                            )}
                                        </div>

                                        <div className="mt-4">
                                          <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Email address
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="email"
                                              name="email"
                                              type="text"
                                              autoComplete="email"
                                              value={registerFormData.email}
                                              onChange={
                                                handleRegisterInputChange
                                              }
                                              className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                message &&
                                                message?.message?.email
                                                  ? "border border-red-400"
                                                  : "border-0"
                                              }`}
                                            />
                                          </div>

                                          {message &&
                                            message?.message?.email &&
                                            message.message.email.map(
                                              (error, index) => (
                                                <p
                                                  style={{
                                                    color: "red",
                                                    fontSize: "13px",
                                                  }}
                                                >
                                                  {error}
                                                </p>
                                              )
                                            )}
                                        </div>

                                        <div className="mt-4">
                                          <label
                                            htmlFor="phone_number"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Phone Number
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="phone_number"
                                              name="phone_number"
                                              type="text"
                                              autoComplete="phone_number"
                                              value={
                                                registerFormData.phone_number
                                              }
                                              onChange={
                                                handleRegisterInputChange
                                              }
                                              className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                message &&
                                                message?.message?.phone_number
                                                  ? "border border-red-400"
                                                  : "border-0"
                                              }`}
                                            />
                                          </div>

                                          {message &&
                                            message?.message?.phone_number &&
                                            message.message.phone_number.map(
                                              (error, index) => (
                                                <p
                                                  style={{
                                                    color: "red",
                                                    fontSize: "13px",
                                                  }}
                                                >
                                                  {error}
                                                </p>
                                              )
                                            )}
                                        </div>

                                        <div className="mt-4">
                                          <label
                                            htmlFor="address"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Address
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="address"
                                              name="address"
                                              type="text"
                                              autoComplete="address"
                                              value={registerFormData.address}
                                              onChange={
                                                handleRegisterInputChange
                                              }
                                              className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                message &&
                                                message?.message?.address
                                                  ? "border border-red-400"
                                                  : "border-0"
                                              }`}
                                            />
                                          </div>

                                          {message &&
                                            message?.message?.address &&
                                            message.message.address.map(
                                              (error, index) => (
                                                <p
                                                  style={{
                                                    color: "red",
                                                    fontSize: "13px",
                                                  }}
                                                >
                                                  {error}
                                                </p>
                                              )
                                            )}
                                        </div>

                                        <div className="mt-4">
                                          <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Password
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="password"
                                              name="password"
                                              type="password"
                                              autoComplete="password"
                                              value={registerFormData.password}
                                              onChange={
                                                handleRegisterInputChange
                                              }
                                              className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                message &&
                                                message?.message?.password
                                                  ? "border border-red-400"
                                                  : "border-0"
                                              }`}
                                            />
                                          </div>

                                          {message &&
                                            message?.message?.password &&
                                            message.message.password.map(
                                              (error, index) => (
                                                <p
                                                  style={{
                                                    color: "red",
                                                    fontSize: "13px",
                                                  }}
                                                >
                                                  {error}
                                                </p>
                                              )
                                            )}
                                        </div>

                                        <div className="mt-4">
                                          <label
                                            htmlFor="password_confirmation"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Password Again
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="password_confirmation"
                                              name="password_confirmation"
                                              type="password"
                                              value={
                                                registerFormData.password_confirmation
                                              }
                                              onChange={
                                                handleRegisterInputChange
                                              }
                                              className="block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                          </div>
                                        </div>

                                        <div class="-mx-2 mt-6 flex items-center">
                                          <button
                                            type="submit"
                                            class="mx-2 flex w-full transform items-center justify-center rounded-lg bg-red-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none"
                                          >
                                            {loading ? (
                                              <span>Loading...</span>
                                            ) : (
                                              <span>Register</span>
                                            )}
                                          </button>
                                        </div>

                                        <div class="mt-4 flex items-center justify-between">
                                          <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                                          <span class="text-center text-xs uppercase text-gray-500 hover:underline dark:text-gray-400">
                                            or register with Social Media
                                          </span>

                                          <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                                        </div>

                                        <div class="-mx-2 mt-6 flex items-center">
                                          <button
                                            disable={googleLoading}
                                            onClick={handleGoogleLogin}
                                            href="#"
                                            className="mx-2 flex w-full transform items-center justify-center rounded-lg bg-red-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none"
                                          >
                                            {googleLoading
                                              ? "Loading..."
                                              : "Register with Google"}
                                          </button>

                                          <button
                                            onClick={handleFacebookLogin}
                                            disabled={facebookLoading}
                                            type="button"
                                            className="mx-2 transform rounded-lg bg-red-200 p-2 text-sm font-medium text-gray-900 transition-colors duration-300 hover:bg-red-100"
                                          >
                                            <span>
                                              {facebookLoading ? (
                                                "Loading"
                                              ) : (
                                                <svg
                                                  className="fill-current mx-2 h-5 w-5"
                                                  fill="currentColor"
                                                  style={{ color: "#1877f2" }}
                                                  viewBox="0 0 24 24"
                                                >
                                                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                                </svg>
                                              )}
                                            </span>
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </section>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Header;
