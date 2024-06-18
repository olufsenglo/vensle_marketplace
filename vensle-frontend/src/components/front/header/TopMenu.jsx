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
import ProductTypeMenu from "./ProductTypeMenu";

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

const TopMenu = ({
	isAuthenticated,
	handleUploadClick,
	handleRegisterDriverClick,
	handleTopNavClick,
        storedCountryFlag,
	handleGetUserCountry,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user?.user);
  const cartItems = useSelector((state) => state.cart.items);
  const storedCountry = localStorage.getItem("userCountry") || "Unknown";

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

  const [forgotFormData, setForgotFormData] = useState({
    forgot_email: "",
  });

  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

    return (
      <div className="hidden bg-white md:block">
        <div className="mx-auto max-w-2xl p-2 lg:max-w-7xl lg:px-8">
          <div
            className="flex justify-between"
            style={{ fontSize: "15px" }}
          >
            <ul className="flex justify-between">
              <li className="mr-6 hidden lg:block">
                Welcome to our Online Store!
              </li>
              {isAuthenticated ? (
                <li
                  className="mr-6 text-primaryColor hover:text-secondaryColor hover:underline hidden md:flex"
                >
                  <Link to="/admin/upload-product?redirect=modal">
                    Upload Your Product
                  </Link>
                </li>
              ) : (
	       <>
                <li
                  onClick={(e) => handleUploadClick(e)}
                  className="mr-6 hidden cursor-pointer text-primaryColor hover:text-secondaryColor hover:underline lg:flex"
                >
                  Upload Your Product
                </li>
                <li
                  onClick={(e) => handleRegisterDriverClick(e)}
                  className="hidden cursor-pointer text-primaryColor hover:text-secondaryColor hover:underline lg:block"
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
    )
}

export default TopMenu