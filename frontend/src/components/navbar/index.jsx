import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
  IoMdNotificationsOutline,
} from "react-icons/io";
import { logout } from "actions/auth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const baseURL = "https://nominet.vensle.com/backend";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramRedirect = queryParams.get("redirect");
  const paramType = queryParams.get("type");

  /**-Notification-**/
  const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
  const user = useSelector((state) => state.auth?.user?.user);
  const isSocialProfile = useSelector(
    (state) => state.auth?.user?.socialProfile
  );
  const accessToken = useSelector((state) => state?.auth?.user?.token);

  const [unreadCount, setUnreadCount] = useState(0);
  const [userAlerts, setUserAlerts] = useState([]);
  /**-Notification-**/

  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  const [open, setOpen] = useState(false);

  const getDisplayImage = (image) => {
    const name = image
      ? `${baseURL}/uploads/${image}`
      : "https://www.flaticon.com/free-icons/user";
    return name;
  };

	const handleUploadRedirect = (url) => {
		setOpen(false);
		navigate(url);
	}

  useEffect(() => {
    if (paramRedirect == "modal") setOpen(true);
  });

  /**-Notification-**/
  const markAsRead = () => {
    axios
      .put(
        `${baseURL}/api/v1/user-alerts/mark-as-read`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        setUnreadCount(0);
        setUserAlerts([]);
      })
      .catch((error) => console.error("Error marking alerts as read:", error));
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/v1/user-alerts/unread-count`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => setUnreadCount(response.data.unreadCount))
      .catch((error) => console.error("Error fetching unread count:", error));

    axios
      .get(`${baseURL}/api/v1/user-alerts/unread`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => setUserAlerts(response.data.userAlerts))
      .catch((error) => console.error("Error fetching unread alerts:", error));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
        <div className="ml-[6px]">
          <div className="h-6 w-[224px] pt-1">
            <Link
              className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
              to=" "
            >
              Pages
              <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
                {" "}
                /{" "}
              </span>
            </Link>
            <Link
              className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
              to="#"
            >
              {paramType ? <span>Upload {paramType}</span> : brandText}
            </Link>
          </div>
          <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
            <Link
              to="#"
              className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
            >
              {paramType ? <span>Upload {paramType}</span> : brandText}
            </Link>
          </p>
        </div>

        <div className="relative mt-[3px] flex h-[61px] w-[405px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[415px] md:flex-grow-0 md:gap-1 xl:w-[415px] xl:gap-2">
          <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
            <p className="pl-3 pr-2 text-xl">
              <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
            </p>
            <input
              type="text"
              placeholder="Search..."
              class="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
            />
          </div>
          <span
            className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
            onClick={onOpenSidenav}
          >
            <FiAlignJustify className="h-5 w-5" />
          </span>

          <p
            className="cursor-pointer rounded-full py-1 px-4 hover:bg-gray-200 dark:text-white"
            onClick={() => setOpen(true)}
          >
            Upload
          </p>
          {/* start Notification */}
          <Dropdown
            button={
              <p className="relative cursor-pointer">
                <IoMdNotificationsOutline className="h-4 w-4 text-gray-600 dark:text-white" />
                {unreadCount > 0 && (
                  <span
                    style={{
                      top: "-0.3rem",
                      left: "0.6rem",
                      fontSize: "0.6rem",
                      padding: "0.4rem",
                      borderRadius: "50%",
                      background: "red",
                    }}
                    className="absolute flex h-2 w-2 items-center justify-center text-white"
                  >
                    {unreadCount}
                  </span>
                )}
              </p>
            }
            animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
            children={
              <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-navy-700 dark:text-white">
                    Notification
                  </p>
                  <p
                    onClick={markAsRead}
                    style={{ cursor: "pointer" }}
                    className="text-sm font-bold text-navy-700 dark:text-white"
                  >
                    Mark all read
                  </p>
                </div>

                {userAlerts.length > 0 ? (
                  <>
                    {userAlerts.map((alert) => (
                      <button
                        key={alert.id}
                        className="flex w-full items-center"
                      >
                        <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                          <BsArrowBarUp />
                        </div>
                        <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                          <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                            {alert.title}
                          </p>
                          <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                            {alert.message}
                          </p>
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-500">No new notifications.</p>
                )}
              </div>
            }
            classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
          />

          <div
            className="cursor-pointer text-gray-600"
            onClick={() => {
              if (darkmode) {
                document.body.classList.remove("dark");
                setDarkmode(false);
              } else {
                document.body.classList.add("dark");
                setDarkmode(true);
              }
            }}
          >
            {darkmode ? (
              <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
            ) : (
              <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
            )}
          </div>

          {/* Profile & Dropdown */}
          <Dropdown
            button={
              <img
                className="h-10 w-10 cursor-pointer rounded-full border border-4 border-white hover:border-gray-200"
                src={
                  isSocialProfile
                    ? user.profile_picture
                    : getDisplayImage(user?.profile_picture)
                }
                alt="Elon Musk"
              />
            }
            children={
              <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      👋 Hey, {user?.name}
                    </p>{" "}
                  </div>
                </div>
                <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

                <div className="flex flex-col p-4">
                  <Link
                    to="/admin/profile"
                    className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                  >
                    Profile Settings
                  </Link>
                  <Link
                    to="/"
                    className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                  >
                    Homepage
                  </Link>
                  <Link
                    to=" "
                    onClick={handleLogout}
                    className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                  >
                    Log Out
                  </Link>
                </div>
              </div>
            }
            classNames={"py-2 top-8 -left-[180px] w-max"}
          />
        </div>
      </nav>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <section class="bg-white">
                      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h3 class="text-black mb-8 text-center text-lg font-semibold">
                          What would you like to upload?
                        </h3>
                        <div class="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
                            <div className="cursor-pointer" onClick={() =>handleUploadRedirect("/admin/upload-product")}>
                              <div class="relative mx-auto flex items-center justify-center">
                                <svg
                                  class="text-purple-100"
                                  width="66"
                                  height="68"
                                  viewBox="0 0 66 68"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                                </svg>
                                <svg
                                  class="absolute h-9 w-9 text-purple-600"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                  />
                                </svg>
                              </div>
                              <h3 class="text-black mt-8 text-lg font-semibold">
                                Regular Products
                              </h3>
                              <p class="mt-4 text-base text-gray-600">
                                Amet minim mollit non deserunt ullamco est sit
                                aliqua dolor do amet sint
                              </p>
                            </div>

                            <div className="cursor-pointer" onClick={() =>handleUploadRedirect("/admin/upload-product?type=request")}>
                              <div class="relative mx-auto flex items-center justify-center">
                                <svg
                                  class="text-orange-100"
                                  width="62"
                                  height="64"
                                  viewBox="0 0 62 64"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z" />
                                </svg>
                                <svg
                                  class="absolute h-9 w-9 text-orange-600"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                              </div>
                              <h3 class="text-black mt-8 text-lg font-semibold">
                                Request a Product
                              </h3>
                              <p class="mt-4 text-base text-gray-600">
                                Amet minim mollit non deserunt ullamco est sit
                                aliqua dolor do amet sint.
                              </p>
                            </div>

                            <div className="cursor-pointer" onClick={() =>handleUploadRedirect("/admin/upload-product?type=grocery")}>
                              <div class="relative mx-auto flex items-center justify-center">
                                <svg
                                  class="text-green-100"
                                  width="66"
                                  height="68"
                                  viewBox="0 0 66 68"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                                </svg>
                                <svg
                                  class="absolute h-9 w-9 text-green-600"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                  />
                                </svg>
                              </div>
                              <h3 class="text-black mt-8 text-lg font-semibold">
                                Groceries
                              </h3>
                              <p class="mt-4 text-base text-gray-600">
                                Amet minim mollit non deserunt ullamco est sit
                                aliqua dolor do amet sint.
                              </p>
                          </div>
                        </div>
                      </div>
                    </section>
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

export default Navbar;
