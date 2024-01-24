import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { StarIcon, ArrowLeftIcon, ChevronLeftIcon, PhoneIcon, MapPinIcon, ClockIcon, ChevronRightIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/20/solid'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import {
    SET_MESSAGE,
} from "actions/types";

const baseURL = 'https://nominet.vensle.com/backend';
const PreviewPopup = ({ selectedProduct, open, setOpen }) => {
  const dispatch = useDispatch();

   const [msgContent, setMsgContent] = useState('');
   const [previewImage, setPreviewImage] = useState('');
   const [imgIndex, setImgIndex] = useState(0);
   const [showNumber, setShowNumber] = useState(false);

  const [isLeftVisible, setLeftVisible] = useState(true);

  useEffect(()=>{
     const defaultImagePath = selectedProduct.display_image && selectedProduct.display_image.name ? 
		`${baseURL}/uploads/${selectedProduct.display_image.name}` : 
		"";
  	setPreviewImage(defaultImagePath);
  }, [selectedProduct])

  const handleSendMessage = (e) => {
	e.preventDefault();
	dispatch({
	  type: SET_MESSAGE,
	  payload: {type: "success", message: "Message sent!"},
	});
	setMsgContent("");
    	setLeftVisible(!isLeftVisible);
  };	

  const toggleVisibility = (e) => {
	e.preventDefault();
	setMsgContent("");
    	setLeftVisible(!isLeftVisible);
  };	

  const handleShowNumber = (e) => {
	  e.preventDefault();
	  setShowNumber(!showNumber);
  };	

    const getImagePath = (name) => {
      return `${baseURL}/uploads/${name}`;
    };

   const handleNextPreviewImage = () => {
	   const selectedIndexLen = selectedProduct.images.length - 1
	   const index = (imgIndex + 1) > selectedIndexLen ? 0 : imgIndex + 1;
	   setImgIndex(index);
	   const path = getImagePath(selectedProduct.images[index].name)
	   setPreviewImage(path)
   }

   const handlePreviousPreviewImage = () => {
	   const selectedIndexLen = selectedProduct.images.length - 1
	   const index = (imgIndex - 1) < 0 ? selectedIndexLen : imgIndex - 1;
	   setImgIndex(index);
	   const path = getImagePath(selectedProduct.images[index].name)
	   setPreviewImage(path)
   }

   const handleSetPreviewImage = (e, image, index) => {
	e.preventDefault();
	setImgIndex(index);
	setPreviewImage(getImagePath(image));
   }

   const handleShowSelectedImage = (image, index) => {
	return (<a onClick={(e) =>handleSetPreviewImage(e, image.name, index)} href="#"
	    className={`block border overflow-hidden rounded-md dark:border-transparent dark:hover:border-red-600 hover:border-red-600 ${
		index == imgIndex ? 'border-red-600' : 'border-transparent'
	    }`}>
	    <img
	      src={getImagePath(image.name)} 
	      alt="Preview"
	      class="object-cover w-full lg:h-[5.5rem] rounded-md "
	    />
	</a>)
   }

    if (!selectedProduct)
	return <></>

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
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-1 lg:p-2 rounded-3xl">
                  <button
                    type="button"
                    className="absolute z-10 right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>





    <div className="bg-white w-full">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">



                <div class="w-full px-4">
                    <div class="sticky top-0 z-50 overflow-hidden ">
                        <div class="relative mb-4 lg:mb-6 py-2 lg:pl-[6rem] lg:pr-[6rem] lg:h-[28rem]">
	
	<span className="absolute left-0 cursor-pointer" style={{top: "50%"}} onClick={handlePreviousPreviewImage}>
		<ChevronLeftIcon className="h-8 w-8"/>
	</span>
                            <img
				src={previewImage}
				alt=" /"
                                className="object-cover rounded-md w-full lg:h-full "
		             />
	<span className="absolute right-0 cursor-pointer" style={{top: "50%"}} onClick={handleNextPreviewImage}>
		<ChevronRightIcon className="h-8 w-8"/>
	</span>
                        </div>
                        <div class="flex-wrap hidden md:flex ">
            {selectedProduct.images[0] && selectedProduct.images.map((image, index) => (
                            <div className="w-[6.5rem] p-2 sm:w-[6.5rem]">
				{handleShowSelectedImage(image, index)}
                            </div>
	     ))}


                        </div>
                    </div>
                </div>




          <div className="p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">




            <div className="rounded-2xl h-full bg-gray-50 py-4 ring-1 ring-inset ring-gray-900/5">









    <div id="parent" className="w-full h-full flex overflow-hidden">
      <div
        id="left"
        className={`w-full pl-6 pr-8 flex flex-col h-full shrink-0 transition-transform duration-300 transform ${
          isLeftVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
		<h3 style={{fontWeight: "500"}} className="text-2xl mb-5 tracking-tight">
		{selectedProduct.name}
	  	</h3>
<div className="flex items-center">
		      <div className="flex items-center">
			{[0, 1, 2, 3, 4].map((rating) => (
			  <StarIcon
			    key={rating}
			    className='text-orange-900 h-3 w-3 mr-1 flex-shrink-0'
			    aria-hidden="true"
			  />
			))}
		      </div>

                <p className="text-sm leading-5">
	  		<span className="mx-1">{selectedProduct.ratings}</span> ({selectedProduct && selectedProduct.total_feedback} Feedback{selectedProduct && selectedProduct.total_feedback > 1 && 's'})
                </p>
</div>
                <h4 className="text-xl mt-3 mb-5">
			        {selectedProduct.currency} {selectedProduct.price} 
		</h4>
                <h4 className="text-xl">Product Details</h4>

            <p className="mt-1 text-base leading-7">
		{selectedProduct.description}
            </p>
	



			<p className="text-sm flex items-center font-medium mt-5">
		  	
		<MapPinIcon className="h-4 w-4 mr-2"/>

				{selectedProduct.city}
		  	</p>
			<p className="text-sm flex items-center font-medium mt-3">
		  	
		<ClockIcon className="h-4 w-4 mr-2"/>

		  		Posted {moment(selectedProduct.created_at).format('Do MMM YYYY')}
		  	</p>



<div className="flex items-end flex-1 mt-4">
                <Link
                  to={`/product-detail/${selectedProduct.id}`}
                  className="block w-full rounded-md bg-red-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
			MORE DETAILS
                </Link>


                <a
                  href="#"
		  onClick={handleShowNumber}
                  className="ml-3 block border border-red-500 rounded-md px-3 py-3 text-center text-sm font-semibold text-red-500 hover:text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
			{showNumber ? selectedProduct.phone_number : <PhoneIcon className="h-5 w-5"/>}
                </a>
                <a
                  href="#"
		  onClick={toggleVisibility}
                  className="ml-3 block border border-red-500 rounded-md px-3 py-3 text-center text-sm font-semibold text-red-500 hover:text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
		  <ChatBubbleLeftRightIcon className="h-5 w-5"/>
                </a>
</div>	  



      </div>
      <div
        id="right"
        className={`w-full flex flex-col pl-6 pr-8 shrink-0 transition-transform duration-300 transform ${
          isLeftVisible ? 'translate-x-full' : '-translate-x-full'
        }`}
      >

        <h4 className="text-xl mt-3 mb-5">Send a message</h4>
	<p className="flex items-center cursor-pointer" onClick={() => setLeftVisible(!isLeftVisible)}>
		<ArrowLeftIcon className="h-4 w-4 mr-2"/>
		Back
	</p>


	<form onSubmit={handleSendMessage} className="flex flex-col flex-1">
			    <div className="mt-2.5 flex-1">
			      <textarea
				name="message"
				id="message"
				value={msgContent}
			        onChange={(e) => setMsgContent(e.target.value)}
			        required
				className="block h-full w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			      />
			    </div>

			    <div className="mt-3">
				<button
				  type="submit"
				  className="block w-full rounded-md bg-red-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
				>
					SEND	
				</button>
			    </div>
	</form>

      </div>
    </div>








              <div className="pl-6 pr-8 flex flex-col h-full">


              </div>
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


	)
}

export default PreviewPopup;
