import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Transition, Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "actions/auth";
import { fetchCartItems } from "actions/actions";
import { SET_MESSAGE } from "actions/types";

import SignInRegisterModal from "./SignInRegisterModal";

const sortOptions = [
  { name: "Profile", href: "/admin/profile", current: false },
  { name: "Upload a product", href: "/admin/upload-product", current: false },
  { name: "Dashboard", href: "/admin/default", current: false },
  { name: "Logout", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HeaderTop = ({
  driverRegister,
  setDriverRegister,
  setActiveTab,
  activeTab,
}) => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const storedCountry = localStorage.getItem("userCountry") || "Unknown";
  const storedCountryFlag = localStorage.getItem("countryFlag") || "";

  const [open, setOpen] = useState(false);
  const [, setRedirect] = useState("");

  const handleTopNavClick = (e, name) => {
    if (name === "Logout") {
      e.preventDefault();
      dispatch(logout());
    }
  };

  const handleGetUserCountry = () => {
    //Put in util fxn
    if (storedCountry === "UK") return <>United Kingdom</>;
    else if (storedCountry === "US") return <>United States</>;
    else if (storedCountry === "NG") return <>Nigeria</>;
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    setRedirect("?redirect=modal");
    setActiveTab(1);
    setOpen(true);

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
    setOpen(true);
  };

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
                <li
                  onClick={(e) => handleUploadClick(e)}
                  className="mr-6 hidden cursor-pointer text-red-500 lg:flex"
                  style={{ color: "#ff5959" }}
                >
                  Upload Your Product
                </li>
              )}
              {!isAuthenticated && (
                <li
                  onClick={(e) => handleRegisterDriverClick(e)}
                  className="hidden cursor-pointer text-red-500 lg:block"
                  style={{ color: "#ff5959" }}
                >
                  Register as a Driver
                </li>
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

      {open && (
        <SignInRegisterModal
          loginOpen={open}
          setLoginOpen={setOpen}
          driverRegister={driverRegister}
          setDriverRegister={setDriverRegister}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      )}
    </>
  );
};

export default HeaderTop;
