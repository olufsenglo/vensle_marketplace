import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCartItems,
} from "actions/actions";

import Search from "./Search";
import NavLinks from "./NavLinks";
import CartLink from "./CartLink";
import HeaderTop from "./HeaderTop";
import SignInRegisterModal from "./SignInRegisterModal";
import SmallScreensLoginRegister from "./SmallScreensLoginRegister";

import logo from "assets/img/front/logo.PNG";
import person from "assets/img/front/person.PNG";

const Header = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user?.user);
  const storedCountry = localStorage.getItem("userCountry") || "Unknown";
  const storedCountryFlag = localStorage.getItem("countryFlag") || "";

  const [loginOpen, setLoginOpen] = useState(false);
  const [driverRegister, setDriverRegister] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const handleSignInClick = (e) => {
    setLoginOpen(true);
    setActiveTab(1);
  };

  const handleRegisterClick = (e) => {
    setLoginOpen(true);
    setActiveTab(2);
  };

  const handleGetUserCountry = () => {
    //Place in util function
    if (storedCountry === "UK") return <>United Kingdom</>;
    else if (storedCountry === "US") return <>United States</>;
    else if (storedCountry === "NG") return <>Nigeria</>;
  };

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <>
      <HeaderTop
        driverRegister={driverRegister}
        setDriverRegister={setDriverRegister}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-4 pt-4 md:pt-2 md:pb-4 lg:py-8 lg:max-w-7xl lg:px-8">
          <div
            className="flex flex-col justify-between md:items-center lg:flex-row"
            style={{ gap: "1%" }}
          >
            <Link to="/" className="relative px-6 md:z-10 md:px-0">
              <img className="w-40 md:w-[218px]" src={logo} alt="vensle home" />
            </Link>
            <Search />
            <div
              className="absolute right-0 left-0 mr-auto ml-auto flex max-w-2xl items-center justify-end px-6 md:px-0 lg:relative lg:max-w-none lg:justify-start"
              style={{ fontSize: "0.9rem" }}
            >
              <div className="flex items-center">
                <SmallScreensLoginRegister
                  isAuthenticated={isAuthenticated}
                  handleSignInClick={handleSignInClick}
                  user={user}
                />
                <img src={person} className="mr-[4px] hidden lg:block" alt="profile" />

                <div className="justify-space-between flex hidden h-full flex-col lg:block">
                  {isAuthenticated && (
                    <p className="mt-0 mb-[3px]" style={{ fontSize: "12px" }}>
                      Hello {user.name}
                    </p>
                  )}
                  <h2 className="pointer mt-[-3px]" style={{ fontWeight: "600" }}>
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
      {loginOpen && <SignInRegisterModal
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
        driverRegister={driverRegister}
        setDriverRegister={setDriverRegister}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />}
    </>
  );
};

export default Header;
