import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper/modules';
import {
  StarIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { SET_MESSAGE } from "actions/types";

import MessageForm from "components/front/message/MessageForm"; 
import SignInRegisterModal from "../header/SignInRegisterModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const baseURL = "https://nominet.vensle.com/backend";
const PreviewPopup = ({ selectedProduct, open, setOpen, from="front", children }) => {
	console.log('sell me', selectedProduct)
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth?.user?.token);
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);

  const [msgContent, setMsgContent] = useState("");
  const [viewIncrease, setViewIncrease] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imgIndex, setImgIndex] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [driverRegister, setDriverRegister] = useState(false);

  const [isLeftVisible, setLeftVisible] = useState(true);

  useEffect(() => {
    const defaultImagePath =
      selectedProduct.display_image && selectedProduct.display_image.name
        ? `${baseURL}/uploads/${selectedProduct.display_image.name}`
        : "";
    setPreviewImage(defaultImagePath);
  }, [selectedProduct]);

  const toggleVisibility = (e) => {
    e.preventDefault();
    setMsgContent("");
    setLeftVisible(!isLeftVisible);
  };

  const handleIncreaseView = async (id) => {
    try {
      //TODO: change to post request
      const response = await axios.get(
        `${baseURL}/api/v1/products/${id}/increase-views`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      );
    } catch (error) {
      console.error("Error increasing product view", error);
    }
  };


  const handleShowNumber = (e, id) => {
    e.preventDefault();
    setShowNumber(!showNumber);
    if (!viewIncrease) {
      handleIncreaseView(id)
    }
    setViewIncrease(true)
  };

  const handleUnAuthMessage = (e) => {
    e.preventDefault();
    setLoginOpen(true)
    dispatch({
      type: SET_MESSAGE,
      payload: { type: "success", message: "Please Login to send message" },
    });
  };

  const getImagePath = (name) => {
    return `${baseURL}/uploads/${name}`;
  };

  const handleNextPreviewImage = () => {
    const selectedIndexLen = selectedProduct.images.length - 1;
    const index = imgIndex + 1 > selectedIndexLen ? 0 : imgIndex + 1;
    setImgIndex(index);
    const path = getImagePath(selectedProduct.images[index].name);
    setPreviewImage(path);
  };

  const handlePreviousPreviewImage = () => {
    const selectedIndexLen = selectedProduct.images.length - 1;
    const index = imgIndex - 1 < 0 ? selectedIndexLen : imgIndex - 1;
    setImgIndex(index);
    const path = getImagePath(selectedProduct.images[index].name);
    setPreviewImage(path);
  };

  const handleSetPreviewImage = (e, image, index) => {
    e.preventDefault();
    setImgIndex(index);
    setPreviewImage(getImagePath(image));
  };

  const handleShowSelectedImage = (image, index) => {
    return (
      <Link
        onClick={(e) => handleSetPreviewImage(e, image.name, index)}
        to="#"
        className={`dark:border-transparent block w-full h-full overflow-hidden rounded-md border hover:border-primaryColor dark:hover:border-primaryColor ${index == imgIndex ? "border-primaryColor" : "border-transparent"
          }`}
      >
        <img
          src={getImagePath(image.name)}
          alt="Preview"
          className="!object-contain lg:!h-16 lg:!w-20"
        />
      </Link>
    );
  };

  function formatPrice(price) {
    return Number(parseFloat(price).toFixed(2)).toLocaleString('en', {
      minimumFractionDigits: 2
    });
  }

  if (!selectedProduct) return <></>;

  return (
    <>
      <SignInRegisterModal
        setLoginOpen={setLoginOpen}
        loginOpen={loginOpen}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        driverRegister={driverRegister}
        setDriverRegister={setDriverRegister}
        redirect="/"
      />    
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
                <Dialog.Panel className="flex w-full p-2 transform text-left text-base transition md:my-8 md:max-w-6xl md:px-4 lg:max-w-7xl">
                  <div className="relative flex w-full items-center overflow-hidden rounded-3xl bg-white shadow-2xl p-2 pt-8 lg:pt-2">
                    <button
                      type="button"
                      className="absolute right-4 top-1 z-10 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-2 md:right-6 md:top-4 lg:right-[1.4rem] lg:top-[1.4rem]"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-8 w-8 rounded-full p-1 hover:bg-gray-200 transition-all ease-in-out duration-300" aria-hidden="true" />
                    </button>

                    <div className="w-full bg-white">
                      <div className="mx-auto max-w-7xl">
                        <div className="mx-auto rounded-3xl lg:mx-0 lg:flex lg:max-w-none">
                          <div className="lg:w-[55%] lg:flex-1">
                            <div className="">
                              <div className="relative mb-2 lg:mb-4 border rounded-2xl m-2 lg:h-[28rem] lg:pl-[6%] lg:pr-[6%]">
                                <span
                                  style={{ borderTopLeftRadius: "1rem", borderBottomLeftRadius: "1rem" }}
                                  className="absolute top-0 bottom-0 left-0 bg-gray-50 bg-opacity-50 hover:bg-gray-100 w-[2rem] lg:w-[3rem] flex justify-center items-center cursor-pointer"
                                  onClick={handlePreviousPreviewImage}
                                >
                                  <ChevronLeftIcon className="h-8 w-8" />
                                </span>
                                <img
                                  src={previewImage}
                                  alt=" /"
                                  className="w-full object-contain rounded-2xl h-[19rem] lg:h-full"
                                />
                                <span
                                  style={{ borderTopRightRadius: "1rem", borderBottomRightRadius: "1rem" }}
                                  className="absolute top-0 bottom-0 right-0 bg-gray-50 bg-opacity-50 hover:bg-gray-100 w-[2rem] lg:w-[3rem] flex justify-center items-center cursor-pointer"
                                  onClick={handleNextPreviewImage}
                                >
                                  <ChevronRightIcon className="h-8 w-8" />
                                </span>
                              </div>
<div className="pl-2 lg:pl-0 absolute top-0 lg:relative w-[80vw] lg:w-full">

	  			{selectedProduct.images?.length > 0 && <Swiper
                                  slidesPerView={8}
                                  spaceBetween={1}
                                  navigation={true}
                                  modules={[Navigation]}
                                  className="mySwiper mt-2 lg:mt-6"
                                >
                                  {selectedProduct.images[0] &&
                                    selectedProduct.images.map((image, index) => (
                                      <SwiperSlide>
                                        <div className="lg:p-2 h-[25px] lg:h-[5rem] w-[25px] lg:w-[5rem]">
                                          {handleShowSelectedImage(image, index)}
                                        </div>
                                      </SwiperSlide>
                                    ))}
                                </Swiper>}
</div>	  
                            </div>
                          </div>

                          <div className="p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                            <div className="h-full ring-0 lg:rounded-2xl lg:bg-gray-50 lg:py-4 lg:ring-1 ring-inset ring-gray-900/5">
                              <div
                                id="parent"
                                className="flex h-full w-full overflow-hidden"
                              >
                                <div
                                  id="left"
                                  className={`flex h-full w-full shrink-0 transform flex-col p-0 lg:pl-6 lg:pr-8 transition-transform duration-300 ${isLeftVisible
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                                    }`}
                                >
                                  <h3
                                    className="mb-1 lg:mb-5 text-base lg:text-2xl md:font-medium line-clamp-2 tracking-tight"
                                  >
                                    {selectedProduct.name}
                                  </h3>
                                  <div className="flex items-center">
                                    {selectedProduct.total_feedback > 0 ? (
                                      <>
                                        <div className="flex items-center">
                                          {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                              key={rating}
                                              className={classNames(
                                                selectedProduct.ratings > rating ? 'text-orange-900' : 'text-orange-200',
                                                'mr-1 h-3 w-3 flex-shrink-0'
                                              )}
                                              aria-hidden="true"
                                            />
                                          ))}
                                        </div>

                                        <p className="text-[13px] lg:text-sm leading-5">
                                          <span className="mx-1">
					    {typeof selectedProduct?.ratings === 'number' ? selectedProduct.ratings.toFixed(1) : '0.0'}
                                          </span>{" "}
                                          (
                                          {selectedProduct &&
                                            selectedProduct.total_feedback}{" "}
                                          Feedback
                                          {selectedProduct &&
                                            selectedProduct.total_feedback > 1 &&
                                            "s"}
                                          )
                                        </p>
                                      </>)
                                      :
                                      (<p className="text-[13px] lg:text-sm leading-5">No Feedback</p>)}
                                  </div>
                                  <h4 className="mt-2 lg:mt-3 mg-3 lg:mb-5 text-xl text-primaryColor">
                                    {selectedProduct.currency}{" "}
                                    {formatPrice(selectedProduct.price)}
                                  </h4>
                                  <h4 className="text-xl hidden lg:block">Product Details</h4>

                                  <p className="!hidden lg:block mt-1 line-clamp-7 text-base leading-7">
                                    {selectedProduct.description}
                                  </p>

                                  <p className="text-gray-400 lg:text-black mt-3 lg:mt-5 flex items-center text-xs lg:text-sm lg:font-medium">
                                    <MapPinIcon className="mr-1 lg:mr-2 h-3 lg:h-4 w-3 lg:w-4" />
                                    {selectedProduct.city}
                                  </p>
                                  <p className="text-gray-400 lg:text-black mt-1 lg:mt-3 flex items-center text-xs lg:text-sm lg:font-medium">
                                    <ClockIcon className="mr-1 lg:mr-2 h-3 lg:h-4 w-3 lg:w-4" />
                                    Posted{" "}
                                    {moment(selectedProduct.created_at).format(
                                      "Do MMM YYYY"
                                    )}
                                  </p>

  {children}
                                  {from === "front" && <div className="mt-4 relative flex flex-1 items-end">
                                    <Link
                                      to={`/product-detail/${selectedProduct.id}`}
                                      onClick={() => setOpen(false)}
                                      className="block w-full rounded-md bg-primaryColor px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor"
                                    >
                                      MORE DETAILS
                                    </Link>
                                    {showNumber && <div className="absolute left-0 text-right right-0 bottom-[55px]">
                                      <span className="border border-gray-400 py-1 px-2 rounded-md bg-white">
                                        {showNumber && selectedProduct.phone_number}
                                      </span>
                                    </div>}
                                    <a
                                      href="#"
                                      onClick={(e) => handleShowNumber(e, selectedProduct.id)}
                                      className="ml-3 block rounded-md border border-red-500 px-3 py-3 text-center text-sm font-semibold text-red-500 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor"
                                    >
                                      <PhoneIcon className="h-5 w-5" />
                                    </a>
                                    <a
                                      href="#"
                                      onClick={isAuthenticated ? toggleVisibility : handleUnAuthMessage}
                                      className="ml-3 block rounded-md border border-red-500 px-3 py-3 text-center text-sm font-semibold text-red-500 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor"
                                    >
                                      <ChatBubbleLeftRightIcon className="h-5 w-5" />
                                    </a>
                                  </div>}

                                </div>
                                <div
                                  id="right"
                                  className={`flex w-full shrink-0 transform flex-col lg:pl-6 lg:pr-8 transition-transform duration-300 ${isLeftVisible
                                    ? "translate-x-full"
                                    : "-translate-x-full"
                                    }`}
                                >
	  			<div className="flex justify-end flex-row-reverse lg:block">
                                  <h4 className="lg:mt-3 lg:mb-5 text-[15px] lg:text-xl">
                                    Send a message
                                  </h4>
                                  <p
                                    className="flex mr-1 lg:mr-0 text-sm lg:text-base cursor-pointer items-center"
                                    onClick={() => setLeftVisible(!isLeftVisible)}
                                  >
                                    <ArrowLeftIcon className="mr-1 lg:mr-2 h-4 w-4" />
                                  </p>
				</div>
                                  <MessageForm
                                    receiverId={selectedProduct.user_id}
                                    productId={selectedProduct.id}
                                    type="sendMessageHomePage"
                                    setLeftVisible={setLeftVisible}
                                  />

                                </div>
                              </div>

                              <div className="flex h-full flex-col pl-6 pr-8"></div>
                            </div>
                          </div>
                        </div>
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

export default PreviewPopup;
