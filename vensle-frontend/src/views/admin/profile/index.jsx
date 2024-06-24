import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUserProfile } from "actions/auth";

import { SET_MESSAGE } from "actions/types";

import Card from "components/card";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";

const baseURL = "https://nominet.vensle.com/backend";

const ProfileOverview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state?.auth?.user?.token);
  const isSocialProfile = useSelector(
    (state) => state?.auth?.user?.socialProfile
  );
  const user = useSelector((state) => state.auth?.user?.user);

  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [activeTab, setActiveTab] = useState(1);

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    profile_picture: null,
    imageStatus: "old",
  });
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [businessError, setBusinessError] = useState("");
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [businessProfile, setBusinessProfile] = useState({
    user_id: user.id,
    business_email: "",
    business_name: "",
    business_address: "",
    business_number: "",
    bank_name: "",
    account_number: "",
    documentation: "",
    profile_picture: null,
  });

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const userProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const businessProfileChange = (e) => {
    const { name, value } = e.target;
    setBusinessProfile({
      ...businessProfile,
      [name]: value,
    });
  };

  const passwordDataChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setUserProfile({
      ...userProfile,
      profile_picture: selectedFile,
      imageStatus: "new",
    });

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    try {
      const response = await axios.post(
        `${baseURL}/api/v1/update-password`,
        passwordData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data.message);
      if (response.data.message) {
        setMessage("Password updated successfully!");
        setIsSuccess(true);

        dispatch({
          type: SET_MESSAGE,
          payload: { type: "success", message: "Password updated succesfully" },
        });

        setPasswordData({
          old_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
        setPasswordError("");

        setPasswordLoading(false);
      } else {
        setMessage("Failed to update password. Please check your credentials.");
        setIsSuccess(false);
        setPasswordLoading(false);
      }
    } catch (error) {
      console.error("Error updating password:", error);

      const errorMsgs = error.response.data.errors
        ? error.response.data.errors
        : { errorSummary: error.response.data.error };
      setPasswordError(errorMsgs);

      setIsSuccess(false);
      setPasswordLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("name", userProfile.name);
      formDataWithFile.append("email", userProfile.email);
      formDataWithFile.append("phone_number", userProfile.phone_number);
      formDataWithFile.append("address", userProfile.address);
      formDataWithFile.append("imageStatus", userProfile.imageStatus);
      formDataWithFile.append("profile_picture", userProfile.profile_picture);

      const response = await axios.post(
        `${baseURL}/api/v1/update-profile`,
        formDataWithFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data) {
        dispatch(updateUserProfile(response.data));

        console.log(response.data);

        dispatch({
          type: SET_MESSAGE,
          payload: {
            type: "success",
            message: "Profile updated successfully!",
          },
        });

        setProfileError("");
        setLoading(false);
      } else {
        console.log("Failed to update profile. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMsgs = error.response.data.errors
        ? error.response.data.errors
        : { errorSummary: error.response.data.message };
      setProfileError(errorMsgs);
      setLoading(false);
      /**
      if (error.response) {
        if (error.response.data.error) {
          setProfileError(error.response.data.error);
        } else if (error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          setProfileError(errorMessages);
        } else {
          setProfileError('An unexpected error occurred.');
        }
      }
      */
    }
  };

  useEffect(() => {
    setUserProfile({
      name: user.name || "",
      email: user.email || "",
      phone_number: user.phone_number || "",
      address: user.address || "",
      profile_picture: user.profile_picture || "",
      imageStatus: "old",
    });
    // Display the current profile picture
    if (user.profile_picture) {
      const path = isSocialProfile
        ? user.profile_picture
        : `${baseURL}/uploads/${user.profile_picture}`;
      setImgPath(path);
      setImagePreview(path);
    }
  }, [user]);

  const [businessDetails, setBusinessDetails] = useState({});
  const [businessDetailsError, setBusinessDetailsError] = useState("");
  const [businessDetailsLoading, setBusinessDetailsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [certificatePreview, setCertificatePreview] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/v1/business-details`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setBusinessDetails({
          ...response.data.businessDetails,
          profile_picture_status: "old",
          certificate_status: "old",
        });
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };

    fetchBusinessDetails();
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "certificate") {
      const file = files[0];
      setBusinessDetails({
        ...businessDetails,
        certificate_status: "new",
        [name]: file,
      });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCertificatePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setCertificatePreview(null);
      }
    } else if (name === "profile_picture") {
      const file = files[0];
      setBusinessDetails({
        ...businessDetails,
        profile_picture_status: "new",
        [name]: file,
      });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicturePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setProfilePicturePreview(null);
      }
    } else {
      setBusinessDetails({
        ...businessDetails,
        [name]: value,
      });
    }
  };

  const handleBusinessDetailsSubmit = async (e) => {
    e.preventDefault();
    setBusinessDetailsLoading(true);
    try {
      const formData = new FormData();
      formData.append("business_name", businessDetails.business_name || "");
      formData.append("business_email", businessDetails.business_email || "");
      formData.append("phone", businessDetails.phone || "");
      formData.append(
        "business_address",
        businessDetails.business_address || ""
      );
      formData.append("bank_name", businessDetails.bank_name || "");
      formData.append("account_number", businessDetails.account_number || "");
      formData.append("certificate", businessDetails.certificate || null);
      formData.append(
        "profile_picture",
        businessDetails.profile_picture || null
      );
      formData.append(
        "profile_picture_status",
        businessDetails.profile_picture_status || null
      );
      formData.append(
        "certificate_status",
        businessDetails.certificate_status || null
      );

      await axios.post(`${baseURL}/api/v1/business-details/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: {
          type: "success",
          message: "Business Details updated successfully!",
        },
      });

      setIsEditing(false);
      setBusinessDetailsError("");
      setBusinessDetailsLoading(false);
    } catch (error) {
      console.error("Error updating business details:", error);
      const errorMsgs = error.response.data.error;
      setBusinessDetailsError(errorMsgs);
      setBusinessDetailsLoading(false);
    }
  };

  const getImagePath = (name) => {
    return `${baseURL}/uploads/${name}`;
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex justify-center overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
        <button
          className={`bg-transparent -mb-px inline-flex h-10 w-full items-center justify-center whitespace-nowrap border-b-2 pr-4 text-left text-2xl transition duration-300 focus:outline-none sm:text-base ${activeTab === 1
            ? "border-red-500 text-red-600 dark:border-red-400 dark:text-red-300"
            : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
            }`}
          onClick={() => handleTabClick(1)}
        >
          Account
        </button>
        <button
          className={`bg-transparent -mb-px inline-flex h-10 w-full items-center justify-center whitespace-nowrap border-b-2 px-4 text-center text-2xl focus:outline-none sm:text-base ${activeTab === 2
            ? "border-red-500 text-red-600 dark:border-red-400 dark:text-red-300"
            : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
            }`}
          onClick={() => handleTabClick(2)}
        >
          Business
        </button>
        <button
          className={`bg-transparent -mb-px inline-flex h-10 w-full items-center justify-center whitespace-nowrap border-b-2 px-4 text-center text-2xl focus:outline-none sm:text-base ${activeTab === 3
            ? "border-red-500 text-red-600 dark:border-red-400 dark:text-red-300"
            : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
            }`}
          onClick={() => handleTabClick(3)}
        >
          Notifications
        </button>
      </div>

      {activeTab === 1 && (
        <>
          <div className="w-full mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
            <div className="relative col-span-6 lg:!mb-0">
              {profileError && profileError?.profile_picture && (
                <div
                  style={{ zIndex: "5" }}
                  className="absolute bottom-0 right-0 left-0 m-4 bg-white pt-4"
                >
                  {profileError.profile_picture.map((error, index) => (
                    <p
                      key={index}
                      style={{ color: "red", fontSize: "13px" }}
                      className="mb-1"
                    >
                      {error}
                    </p>
                  ))}
                </div>
              )}

              <Banner
                user={user}
                setImagePreview={setImagePreview}
                path={imgPath}
                imagePreview={imagePreview}
                handleFileChange={handleFileChange}
              />
            </div>
            <div className="col-span-6 lg:!mb-0">
              <Storage />
            </div>
            <form
              onSubmit={handleProfileSubmit}
              className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4"
            >
              <Card extra={"w-full p-4 h-full"}>
                <div className="mb-8 w-full">
                  <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                    Update Details
                  </h4>

                  {profileMessage && (
                    <p style={{ color: "green" }}>{profileMessage}</p>
                  )}
                  <div class="mt-11 flex flex-col space-y-4">
                    <div>
                      <label
                        for="name"
                        class="text-gray-501 text-xs font-semibold"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={userProfile.name}
                        onChange={userProfileChange}
                        name="name"
                        className={`mt-2 block w-full rounded border-gray-300 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${profileError && profileError?.name
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
                    </div>

                    <div>
                      <label
                        for="email"
                        class="text-gray-501 text-xs font-semibold"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={userProfile.email}
                        onChange={userProfileChange}
                        className={`mt-2 block w-full rounded border-gray-300 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${profileError && profileError?.email
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
                    </div>

                    <div class="relative">
                      <label
                        for="phoneNumber"
                        class="text-gray-501 text-xs font-semibold"
                      >
                        Phone number
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phone_number"
                        value={userProfile.phone_number}
                        onChange={userProfileChange}
                        className={`mt-2 block w-full rounded border-gray-300 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${profileError && profileError?.phone_number
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
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="address"
                        className="text-gray-501 text-xs font-semibold"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={userProfile.address}
                        onChange={userProfileChange}
                        className={`mt-2 block w-full rounded border-gray-300 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${profileError && profileError?.address
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
                    </div>
                    <div className="mt-5">
                      <button
                        disabled={loading ? true : false}
                        type="submit"
                        className="linear mt-3 w-full rounded-xl bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
                      >
                        {loading ? "Loading..." : "Update details"}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </form>
            <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
              <Card extra={"w-full p-4 h-full"}>
                <div className="mb-8 w-full">
                  <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                    Change password
                  </h4>
                  <div className="mt-2">
                    {/*message && (
        <p style={{ color: isSuccess ? 'green' : 'red' }}>{message}</p>
      )*/}
                    <form
                      onSubmit={handleSubmit}
                      class="mt-10 flex flex-col space-y-4"
                    >
                      {passwordError?.errorSummary && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {passwordError.errorSummary}
                        </p>
                      )}
                      <div>
                        <label
                          for="old_password"
                          class="text-xs font-semibold text-gray-500"
                        >
                          Old Password
                        </label>
                        <input
                          type="password"
                          id="old_password"
                          name="old_password"
                          value={passwordData.old_password}
                          onChange={passwordDataChange}
                          className={`mt-2 block w-full rounded border-gray-300 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${passwordError && passwordError?.old_password
                            ? "bg-red-50"
                            : "bg-gray-50"
                            }`}
                        />
                        {passwordError &&
                          passwordError?.old_password &&
                          passwordError.old_password.map((error, index) => (
                            <p
                              key={index}
                              style={{ color: "red", fontSize: "13px" }}
                              className="mt-1"
                            >
                              {error}
                            </p>
                          ))}
                      </div>

                      <div class="relative">
                        <label
                          for="new_password"
                          class="text-xs font-semibold text-gray-500"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="new_password"
                          name="new_password"
                          value={passwordData.new_password}
                          onChange={passwordDataChange}
                          className={`mt-2 block w-full rounded border-gray-300 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${passwordError && passwordError?.new_password
                            ? "bg-red-50"
                            : "bg-gray-50"
                            }`}
                        />
                        {passwordError &&
                          passwordError?.new_password &&
                          passwordError.new_password.map((error, index) => (
                            <p
                              key={index}
                              style={{ color: "red", fontSize: "13px" }}
                              className="mt-1"
                            >
                              {error}
                            </p>
                          ))}
                      </div>
                      <div class="relative">
                        <label
                          for="new_password_confirmation"
                          class="text-xs font-semibold text-gray-500"
                        >
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="new_password_confirmation"
                          name="new_password_confirmation"
                          value={passwordData.new_password_confirmation}
                          onChange={passwordDataChange}
                          className={`mt-2 block w-full rounded border-gray-300 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${passwordError &&
                            passwordError?.new_password_confirmation
                            ? "bg-red-50"
                            : "bg-gray-50"
                            }`}
                        />
                        {passwordError &&
                          passwordError?.new_password_confirmation &&
                          passwordError.new_password_confirmation.map(
                            (error, index) => (
                              <p
                                key={index}
                                style={{ color: "red", fontSize: "13px" }}
                                className="mt-1"
                              >
                                {error}
                              </p>
                            )
                          )}
                      </div>
                      <div className="mt-4">
                        <button
                          disabled={passwordLoading ? true : false}
                          type="submit"
                          className="linear mt-3 w-full rounded-xl bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
                        >
                          {passwordLoading ? "Loading..." : "Update Password"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
      {activeTab === 2 && (
        <form
          onSubmit={handleBusinessDetailsSubmit}
          className="w-full mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12"
        >
          <div className="col-span-6 lg:!mb-0">
            <Card extra={"w-full p-4 h-full"}>
              <div className="mb-8 w-full">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                  Edit Business Profile
                </h4>

                <div class="mt-11 flex flex-col space-y-4">
                  {businessDetailsError && (
                    <p
                      style={{ color: "red", fontSize: "13px" }}
                      className="mb-1"
                    >
                      {businessDetailsError}
                    </p>
                  )}

                  <label htmlFor="profile_picture">Profile Picture:</label>
                  <input
                    type="file"
                    id="profile_picture"
                    name="profile_picture"
                    onChange={handleChange}
                  />
                  {profilePicturePreview ? (
                    <img
                      src={profilePicturePreview}
                      alt="Profile Picture Preview"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  ) : businessDetails.profile_picture ? (
                    <img
                      src={getImagePath(businessDetails.profile_picture)}
                      alt="Business Profile"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  ) : (
                    ""
                  )}

                  <div>
                    <label
                      for="businessName"
                      class="text-xs font-semibold text-gray-500"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      value={businessDetails.business_name || ""}
                      onChange={handleChange}
                      name="business_name"
                      class="mt-2 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label
                      for="businessEmail"
                      class="text-xs font-semibold text-gray-500"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="businessEmail"
                      name="business_email"
                      value={businessDetails.business_email || ""}
                      onChange={handleChange}
                      required
                      class="mt-2 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div class="relative">
                    <label
                      for="phone"
                      class="text-xs font-semibold text-gray-500"
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={businessDetails.phone || ""}
                      onChange={handleChange}
                      class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div class="relative">
                    <label
                      for="businessAddress"
                      class="text-xs font-semibold text-gray-500"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="businessAddress"
                      name="business_address"
                      value={businessDetails.business_address || ""}
                      onChange={handleChange}
                      class="border-gray-301 block w-full rounded bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-6 lg:!mb-0">
            <Card extra={"w-full p-4 h-full"}>
              <div className="mb-8 w-full">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                  Business Documentation
                </h4>

                <div class="mt-11 flex flex-col space-y-4">
                  <label htmlFor="certificate">Certificate:</label>
                  <input
                    type="file"
                    id="certificate"
                    name="certificate"
                    onChange={handleChange}
                  />
                  {certificatePreview && (
                    <img
                      src={certificatePreview}
                      alt="Certificate Preview"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}

                  <div class="relative">
                    <label
                      for="bankName"
                      class="text-xs font-semibold text-gray-500"
                    >
                      Bank Name:
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      name="bank_name"
                      value={businessDetails.bank_name || ""}
                      onChange={handleChange}
                      class="border-gray-301 block w-full rounded bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                    <img
                      src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                      alt=""
                      class="absolute bottom-3 right-3 max-h-4"
                    />
                  </div>

                  <div class="relative">
                    <label
                      for="accountNumber"
                      class="text-xs font-semibold text-gray-500"
                    >
                      Account Number:
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="account_number"
                      value={businessDetails.account_number || ""}
                      onChange={handleChange}
                      class="border-gray-301 block w-full rounded bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                    <img
                      src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                      alt=""
                      class="absolute bottom-3 right-3 max-h-4"
                    />
                  </div>

                  <div className="mt-5">
                    <button
                      type="submit"
                      className="linear mt-3 w-full rounded-xl bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
                    >
                      {businessDetailsLoading
                        ? "Loading..."
                        : "Update business details"}
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </form>
      )}
      {activeTab === 3 && (
        <div className="w-full mt-3 h-fit h-full">
            <Notification />
        </div>
      )}

    </div>
  );
};

export default ProfileOverview;
