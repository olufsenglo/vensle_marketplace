import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  MdHome,
  MdFileCopy,
} from "react-icons/md";
import {
  StarIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/20/solid";

import MessageForm from "components/front/message/MessageForm";
import { SET_MESSAGE } from "actions/types";
import CustomDialog from 'views/admin/users/CustomDialog'

const baseURL = "http://localhost:8000";
//const baseURL = "https://nominet.vensle.com/backend";
const PreviewPopup = ({ selectedUser, open, setOpen }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);

  const [actionOpen, setActionOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [userProfile, setUserProfile] = useState({
    name: selectedUser.name,
    email: selectedUser.email,
    phone_number: selectedUser.phone_number,
    address: selectedUser.address,
    profile_picture: selectedUser.profile_picture,
    imageStatus: "old",
  });

  const userProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

    const deleteTransaction = async () => {
      setLoading(true)
      try {
        /*const response = await axios.get(`${baseURL}/api/v1/transactions/${selectedTransaction}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });*/

        setActionOpen(false)
      } catch (error) {
        console.error("Error fetching users:", error);
	setLoading(false)
      }
    };

  const getImagePath = (name) => {
    return `${baseURL}/uploads/${name}`;
  };

  if (!selectedUser) return <></>;

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
                    className="absolute right-4 top-2 z-10 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-4 md:right-6 md:top-6 lg:right-8 lg:top-4"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="w-full bg-white">
                    <div className="mx-auto max-w-7xl">

	  	      <div className="mt-8 mx-4 flex justify-between items-center">
			<div className="flex items-center">
	  		    <h1 className="text-2xl font-bold">Profile</h1>
			    <span className="py-1 px-3 text-xs font-300 flex items-center bg-red-200 rounded-xl text-red-600">
				<div className="rounded-full w-2 h-2 bg-red-500 mr-2"></div>
				Blocked
			    </span>
			</div>
	  		<span className="bg-blue-100/50 rounded-lg px-3 py-3">
	  		   This user was blocked due to posting of deficit content and inappropriate goods detail
	  		</span>
	  	      </div>

      		      <div className="bg-blue-100/50 mx-4 rounded-lg py-8 px-2 md:px-4 lg:px-8 mb-4 mt-3 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6">
			  <div className="flex">
			     <div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
			       <MdHome className="h-5 w-5" />
			     </div>
			     <div>
				<p>Total Expenses</p>
				<p className="font-bold text-lg">$2,000.00</p>
			     </div>
			  </div>
			  <div className="flex">
			     <div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
			       <MdHome className="h-5 w-5" />
			     </div>
			     <div>
				<p>Total Expenses</p>
				<p className="font-bold text-lg">$2,000.00</p>
			     </div>
			  </div>
			  <div className="flex">
			     <div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
			       <MdHome className="h-5 w-5" />
			     </div>
			     <div>
				<p>Total Expenses</p>
				<p className="font-bold text-lg">$2,000.00</p>
			     </div>
			  </div>
			  <div className="flex">
			     <div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
			       <MdHome className="h-5 w-5" />
			     </div>
			     <div>
				<p>Total Expenses</p>
				<p className="font-bold text-lg">$2,000.00</p>
			     </div>
			  </div>
	  	      </div>
                      <div className="mx-auto rounded-3xl lg:mx-0 lg:flex lg:max-w-none">
                        <div className="w-full">
                          <div className="">
                            <div className="relative px-8 py-4 mb-4 mx-4 border rounded-2xl">


		<CustomDialog
	  	   deleteTransaction={deleteTransaction}
	  	   open={actionOpen}
	  	   setOpen={setActionOpen}
	  	   deleteLoading={loading}
	 	/>


                  <div className="my-6 flex flex-col space-y-4">
	  	    <div className="flex justify-between">
	  		<img
	  		  src={userProfile?.profile_picture ? getImagePath(userProfile.profile_picture) : 'Blank user'}
	  		  alt="Profile"
	      		  className="w-[8rem] h-[8rem] object-cover border border-[5px] border-rounded border-blue-400/50 rounded-full"
	  		/>
	  		<div className="flex">
	  		   <ChatBubbleLeftRightIcon className="cursor-pointer text-green-600 w-5 h-5 mr-4" />
	  		   <span onClick={() => setIsEditing(!isEditing)} className="cursor-pointer">
	  		      Edit
	  		   </span>
	  		</div>
	  	    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="text-gray-501 text-xs font-semibold"
                      >
                        Name
                      </label>
	  	      {isEditing ?
			  <>
			      <input
				type="text"
				id="name"
				value={userProfile.name}
				onChange={userProfileChange}
				name="name"
				className={`mt-2 block w-full rounded border-gray-300 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${
				  profileError && profileError?.name
				    ? "bg-red-50"
				    : "bg-gray-50"
				}`}
			      />
			      {profileError &&
				profileError?.name &&
				profileError.name.map((error, index) => (
				  <p
				    key={index}
				    style={{ color: "red", fontSize: "13px" }}
				    className="mt-1"
				  >
				    {error}
				  </p>
				))}
			  </> 
			  : <p>{userProfile.name}</p>
		      }
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-gray-501 text-xs font-semibold"
                      >
                        Email
                      </label>
	  	      {isEditing ?
			   <>
			      <input
				type="text"
				id="email"
				name="email"
				value={userProfile.email}
				onChange={userProfileChange}
				className={`mt-2 block w-full rounded border-gray-300 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${
				  profileError && profileError?.email
				    ? "bg-red-50"
				    : "bg-gray-50"
				}`}
			      />

			      {profileError &&
				profileError?.email &&
				profileError.email.map((error, index) => (
				  <p
				    key={index}
				    style={{ color: "red", fontSize: "13px" }}
				    className="mt-1"
				  >
				    {error}
				  </p>
				))}
			   </>
			   : <p>{userProfile.email}</p>
		      }
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="phoneNumber"
                        className="text-gray-501 text-xs font-semibold"
                      >
                        Phone number
                      </label>
	  	      
	  	      {isEditing ?
			  <> 
			      <input
				type="text"
				id="phoneNumber"
				name="phone_number"
				value={userProfile.phone_number}
				onChange={userProfileChange}
				className={`mt-2 block w-full rounded border-gray-300 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${
				  profileError && profileError?.phone_number
				    ? "bg-red-50"
				    : "bg-gray-50"
				}`}
			      />

			      {profileError &&
				profileError?.phone_number &&
				profileError.phone_number.map((error, index) => (
				  <p
				    key={index}
				    style={{ color: "red", fontSize: "13px" }}
				    className="mt-1"
				  >
				    {error}
				  </p>
				))}
			  </> : <p>{userProfile.phone_number}</p>
		      }
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="address"
                        className="text-gray-501 text-xs font-semibold"
                      >
                        Address
                      </label>
	  	     
	  	      {isEditing ?
			   <>
			      <input
				type="text"
				id="address"
				name="address"
				value={userProfile.address}
				onChange={userProfileChange}
				className={`mt-2 block w-full rounded border-gray-300 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${
				  profileError && profileError?.address
				    ? "bg-red-50"
				    : "bg-gray-50"
				}`}
			      />

			      {profileError &&
				profileError?.address &&
				profileError.address.map((error, index) => (
				  <p
				    key={index}
				    style={{ color: "red", fontSize: "13px" }}
				    className="mt-1"
				  >
				    {error}
				  </p>
				))}
			   </> : <p>{userProfile.address}</p>
		      }
                    </div>
	            {isEditing && <div className="mt-5">
                      <button
                        disabled={loading ? true : false}
                        type="submit"
                        className="linear mt-3 w-full rounded-xl bg-blue-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-300 dark:active:bg-blue-200"
                      >
                        {loading ? "Loading..." : "Update details"}
                      </button>
                    </div>}
		  </div>





                            </div>
                          </div>
                        </div>

                        <div className="px-4 pb-4 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                          <div className="h-full rounded-2xl bg-gray-50 py-4 ring-1 ring-inset ring-gray-900/5">
                            <div
                              id="parent"
                              className="flex h-full w-full overflow-hidden"
                            >
                              <div
                                id="left"
                                className={"flex h-full w-full shrink-0 flex-col pl-6 pr-8 translate-x-0"}
                              >
	  			<div className="flex-1">
					<h3
					  style={{ fontWeight: "500" }}
					  className="mb-5 text-2xl line-clamp-2 tracking-tight"
					>
					  Customer reviews
					</h3>
					<div className="flex items-center">
	  				      <h3 className="text-4xl">4.5</h3>
					      <div className="flex items-center mx-2">
						{[0, 1, 2, 3, 4].map((rating) => (
						  <StarIcon
						    key={rating}
						    className="mr-1 h-5 w-5 flex-shrink-0 text-orange-900"
						    aria-hidden="true"
						  />
						))}
					      </div>
	  				      <h3 className="text-lg text-gray-600">1534 reviews</h3>
					</div>
	  			</div>

                                <div className="mt-4">
                                  <Link
                  		    className="mt-4 block w-full rounded-md border border-blue-600 bg-white px-3 py-3 text-center text-sm text-blue-600 shadow-sm hover:border-blue-500 hover:bg-blue-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
	  			    onClick={() => setActionOpen(true)}
                                  >
                                    Unblock Vendor
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
