import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
	XMarkIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/outline";

const PreviewPopup = ({
	open,
	setOpen,
	previewImage,
	product,
	getImagePath,
	handleSetSelectedImagePath,
        handlePreviousPreviewImage,
        handleNextPreviewImage,
	imgIndex,
}) => {

  const buttonControlStyle = {
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)'
}

  const handleShowSelectedImage = (productImage, index) => {
    const thumbnail = getImagePath(productImage.name);

    return (
        <img
          onClick={(e) => handleSetSelectedImagePath(e, thumbnail, index)}
          src={thumbnail}
          alt={product.name}
          className="object-contain w-full h-full"
        />
    );
  };


  return (
    <>
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
            <div className="h-full w-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="h-full w-full transition">
                  <div className="h-full">
                    <button
                      type="button"
                      className="absolute right-4 top-4 z-10 text-gray-400 hover:text-gray-500 sm:right-6 md:right-6 lg:right-[1.4rem]"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-8 w-8 rounded-full p-1 hover:bg-gray-200 transition-all ease-in-out duration-300" aria-hidden="true" />
                    </button>

                    <div className="flex flex-col w-full h-full bg-white p-4">
	  		{product?.images && <p className="text-xl mb-4 font-bold text-center">
				{imgIndex + 1} of {product.images?.length}
			</p>}
                    	<div className="flex gap-4 flex-1 max-h-[88vh]">
                    	    <div className="relative flex-1 bg-[#f2f2f2] rounded-2xl">
	  <div
	    style={buttonControlStyle}
	     onClick={handlePreviousPreviewImage}
	     className="absolute m-auto top-0 bottom-0 flex justify-center items-center bg-white hover:bg-[#ededed] transition duration-300 h-[48px] w-[48px] cursor-pointer rounded-full"
	  >
	 	<ChevronLeftIcon className="w-6 h-6" />
	  </div>
	  <div
	    style={buttonControlStyle}
	     onClick={handleNextPreviewImage}
	     className="absolute m-auto top-0 bottom-0 right-0 flex justify-center items-center bg-white hover:bg-[#ededed] transition duration-300 h-[48px] w-[48px] cursor-pointer rounded-full"
	  >
	 	<ChevronRightIcon className="w-6 h-6" />
	  </div>
	  			<img src={previewImage} className="w-full h-full object-contain" alt="Preview" />
                    	    </div>

                    	    <div className="w-[213px] gap-4 flex flex-col">

				    {product &&
				      product.images.map((productImage, index) => (
					  <div key={productImage.id} className={`h-[11rem] cursor-pointer hover:border hover:border-1 hover:border-[#191919] border-[#191919] rounded-2xl bg-[#f2f2f2] ${
						  index === imgIndex ? "border-2":"border-transparent"
					    }`}>
					    {handleShowSelectedImage(productImage, index)}
					  </div>
				      ))}

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
