import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    StarIcon,
    PencilIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/20/solid";

import { SET_MESSAGE } from "actions/types";
import ButtonLoading from "components/Loading/ButtonLoading";


export default function AttachImage({
	open,
	setOpen,
	handleSubmit,
	setMessage,
	handleImageChange,
	message,
	imagePreview,
	loading,
	error,
	fileInputRef,
}) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state?.auth?.user?.token);

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
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-xl md:px-4 lg:max-w-2xl">
                <div className="bg-gray-100 relative rounded-lg flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="w-full">
                       <p className="text-xl mt-4 mb-2 text-gray-900">Send Message</p>
		       <form onSubmit={handleSubmit}>
		           <div className="w-full h-[44vh] mb-4">
			    	{imagePreview && (
					<img className="w-full h-full object-contain" src={imagePreview} alt="Preview" />
			   	 )}
		            </div>
<div className="text-center">
			    {error && <p className="mb-1 text-sm text-red-400">{error}</p>}
			    <label className="inline-flex justify-center cursor-pointer" htmlFor="file-upload">
	  			<PencilIcon className="p-2 w-9 h-9 hover:bg-gray-300 rounded-full transition duration-300" />
				<input
				    id="file-upload"
				    type="file"
	  			    ref={fileInputRef}
				    accept="image/jpeg, image/png"
				    onChange={handleImageChange}
				    style={{ display: 'none' }}
				/>
			    </label>
</div>
<div className="flex w-full gap-4 mt-4">
			    <input
				className="flex-1 rounded-md py-2 px-3"
				type="text"
				placeholder="Type your message here..."
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			    />
			    <button
				className="py-2 px-5 rounded-md bg-[#4e5b92] hover:bg-ADashPrimary text-white cursor-pointer"
				type="submit"
				disabled={loading || message === ""}
			    >
	  			{loading ? <ButtonLoading /> : <PaperAirplaneIcon className="w-4 h-4" />}
	  		    </button>
</div>
			</form>

                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
