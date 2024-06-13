import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

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
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { SET_MESSAGE } from "actions/types";

import MessageForm from "components/front/message/MessageForm";

const baseURL = "https://nominet.vensle.com/backend";
const PreviewPopup = ({ selectedProduct, open, setOpen }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);

  const [msgContent, setMsgContent] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [imgIndex, setImgIndex] = useState(0);
  const [showNumber, setShowNumber] = useState(false);

  const [isLeftVisible, setLeftVisible] = useState(true);

  const delim = "^%*#$";

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

  const handleShowNumber = (e) => {
    e.preventDefault();
    setShowNumber(!showNumber);
  };

  const handleUnAuthMessage = (e) => {
    e.preventDefault();
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
      <a
        onClick={(e) => handleSetPreviewImage(e, image.name, index)}
        href="#"
        className={`dark:border-transparent block overflow-hidden rounded-md border hover:border-red-600 dark:hover:border-red-600 ${index == imgIndex ? "border-red-600" : "border-transparent"
          }`}
      >
        <img
          src={getImagePath(image.name)}
          alt="Preview"
          class="w-full rounded-md object-cover lg:h-[5.5rem] "
        />
      </a>
    );
  };

  function formatPrice(price) {
    return Number(parseFloat(price).toFixed(2)).toLocaleString('en', {
      minimumFractionDigits: 2
    });
  }

  if (!selectedProduct) return <></>;

  return (
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
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-6xl md:px-4 lg:max-w-7xl">
                <div className="relative flex w-full items-center overflow-hidden rounded-3xl bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-1 lg:p-2">
                  <button
                    type="button"
                    className="absolute right-4 top-4 z-10 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="w-full bg-white">
                    <div className="mx-auto max-w-7xl">
	  		   <div className="flex justify-between">
	  		   	<div className="flex items-center">
	  			    <h1>Product Details</h1>
	  			    <span className="py-1 px-3 text-xs font-300 flex items-center bg-green-200 rounded-xl text-green-600">
	  				<div className="rounded-full w-2 h-2 bg-green-500 mr-2"></div>
	  				Approved
	  			    </span>
	  			</div>
	  			<h4>Uploaded by Mitchell Vendal</h4>
	  		   </div>
                      <div className="mx-auto rounded-3xl lg:mx-0 lg:flex lg:max-w-none">
                        <div className="w-full">
                          <div className="">
                            <div className="relative mb-4 border rounded-2xl m-2 lg:h-[28rem] lg:pl-[6%] lg:pr-[6%]">
                              <span
	  			style={{borderTopLeftRadius: "1rem", borderBottomLeftRadius: "1rem"}}
                                className="absolute top-0 bottom-0 left-0 bg-gray-50 hover:bg-gray-100 w-[3rem] flex justify-center items-center cursor-pointer"
                                onClick={handlePreviousPreviewImage}
                              >
                                <ChevronLeftIcon className="h-8 w-8" />
                              </span>
                              <img
                                src={previewImage}
                                alt=" /"
                                className="w-full object-cover lg:h-full "
                              />
                              <span
	  			style={{borderTopRightRadius: "1rem", borderBottomRightRadius: "1rem"}}
                                className="absolute top-0 bottom-0 right-0 bg-gray-50 hover:bg-gray-100 w-[3rem] flex justify-center items-center cursor-pointer"
                                onClick={handleNextPreviewImage}
                              >
                                <ChevronRightIcon className="h-8 w-8" />
                              </span>
                            </div>
                            <div class="hidden flex-wrap md:flex gap-2 m-2 py-2">
                              {selectedProduct.images[0] &&
                                selectedProduct.images.map((image, index) => (
                                  <div className="w-[6.5rem] sm:w-[6.5rem]">
                                    {handleShowSelectedImage(image, index)}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                          <div className="h-full rounded-2xl bg-gray-50 py-4 ring-1 ring-inset ring-gray-900/5">
                            <div
                              id="parent"
                              className="flex h-full w-full overflow-hidden"
                            >
                              <div
                                id="left"
                                className={`flex h-full w-full shrink-0 transform flex-col pl-6 pr-8 transition-transform duration-300 ${isLeftVisible
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                                  }`}
                              >
                                <h3
                                  style={{ fontWeight: "500" }}
                                  className="mb-5 text-2xl line-clamp-2 tracking-tight"
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
                                            className="mr-1 h-3 w-3 flex-shrink-0 text-orange-900"
                                            aria-hidden="true"
                                          />
                                        ))}
                                      </div>

                                      <p className="text-sm leading-5">
                                        <span className="mx-1">
                                          {selectedProduct.ratings}
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
                                    (<p className="text-sm leading-5">No Rating</p>)}
                                </div>
                                <h4 className="mt-3 mb-5 text-xl text-red-600">
                                  {selectedProduct.currency}{" "}
                                  {formatPrice(selectedProduct.price)}
                                </h4>
                                <h4 className="text-xl">Product Details</h4>

                                <p className="mt-1 line-clamp-7 text-base leading-7">
                                  {selectedProduct.description}
                                </p>
	  			
	  			  <div className="mt-2">
	  		    	    <h3>Key Specifications</h3>
				    <ul role="list" className="list-disc space-y-2 pl-6">
				      {selectedProduct.key_specifications &&
					selectedProduct.key_specifications
					  .split(delim)
					  .map((specification, index) => (
					    <li key={index} className="text-gray-900">
					      <span className="">{specification.trim()}</span>
					    </li>
					  ))}
				    </ul>
				  </div>


                                <p className="mt-5 flex items-center text-sm font-medium">
                                  <MapPinIcon className="mr-2 h-4 w-4" />
                                  {selectedProduct.city}
                                </p>
                                <p className="mt-3 flex items-center text-sm font-medium">
                                  <ClockIcon className="mr-2 h-4 w-4" />
                                  Posted{" "}
                                  {moment(selectedProduct.created_at).format(
                                    "Do MMM YYYY"
                                  )}
                                </p>

                                <div className="mt-4">
	  			  <p>Approved by Mitchell Zandeya, April 24, 2024. 2:34pm</p>
                                  <Link
                  		    className="mt-4 block w-full rounded-md border border-blue-600 bg-white px-3 py-3 text-center text-sm text-blue-600 shadow-sm hover:border-blue-500 hover:bg-blue-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                    Withdraw Approval (Disapprove)
                                  </Link>
                                </div>
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
  );
};

export default PreviewPopup;
