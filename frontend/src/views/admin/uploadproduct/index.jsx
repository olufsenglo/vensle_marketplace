import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "components/card";
import axios from "axios";

import UploadPreview from "./components/UploadPreview";

import currencySymbolMap from "currency-symbol-map";

const baseURL = "https://nominet.vensle.com/backend";

const Tables = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramProductType = queryParams.get("type");

  const storedLocation = JSON.parse(localStorage.getItem("userLocation")) || {
    lat: 0,
    lng: 0,
  };
  const storedCountry = localStorage.getItem("userCountry") || "Unknown";
  const storedCity = localStorage.getItem("userCity") || "Unknown";

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state.auth?.user?.token);
  const user = useSelector((state) => state.auth?.user?.user);
  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loading, setLoading] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    condition: "",
    price: "",
    max_price: "",
    address: "",
    phone_number: "",
    description: "",
    type: "product",
    ratings: 0,
    quantity: 1,
    sold: 1,
    views: 1,
    status: "Active",
    images: null,
    single_specifications: "",
    latitude: storedLocation.lat,
    longitude: storedLocation.lng,
    currency: "",
    city: storedCity,
    country: storedCountry,
    key_specifications: "",
    //specifications_ids: [4,5],
  });

  const handleUseAddress = () => {
    setFormData({
      ...formData,
      address: user.address,
    });
  };

  const handleUsePhoneNumber = () => {
    setFormData({
      ...formData,
      phone_number: user.phone_number,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const delim = "^%*#$";

  const handleKeyPress = (e) => {
    if (
      e.key === "Enter" &&
      document.activeElement.id === "key_specifications"
    ) {
      e.preventDefault();
      const newKeySpecifications =
        formData.key_specifications === ""
          ? formData.single_specifications
          : `${formData.key_specifications}${delim}${formData.single_specifications}`;

      setFormData({
        ...formData,
        key_specifications: newKeySpecifications,
        single_specifications: "",
      });
    }
  };

  const handleRemoveSpecification = (indexToRemove) => {
    const updatedSpecifications = formData.key_specifications
      .split(delim)
      .filter((_, index) => index !== indexToRemove)
      .join(delim);

    setFormData({
      ...formData,
      key_specifications: updatedSpecifications,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    const existingFiles = formData.images ? [...formData.images] : [];

    const newFiles = [...existingFiles, ...files];

    setFormData({
      ...formData,
      images: newFiles,
    });

    const previews = [];
    for (let i = 0; i < newFiles.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === newFiles.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(newFiles[i]);
    }
  };

  const renderImagePreviews = () => {
    return imagePreviews.map((preview, index) => (
      <>
        <a href="#" className="group relative">
          <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className={`h-full w-full object-cover object-center group-hover:opacity-75 ${
                index === mainImageIndex ? "border-2 border-green-500" : ""
              }`}
            />
          </div>
          {!isMainPreview(index) ? (
            <h3
              style={containerStyle}
              className="absolute bottom-0 left-0 right-0 rounded-lg pt-4 text-center text-sm text-white"
              onClick={(e) => handleSetMainImageIndex(e, index)}
            >
              Set as Preview
            </h3>
          ) : (
            <h3
              style={containerStyle}
              className="absolute bottom-0 left-0 right-0 rounded-lg pt-4 text-center text-sm text-white"
            >
              Display
            </h3>
          )}
          {!isMainPreview(index) && (
            <button
              className="absolute top-0 right-0 cursor-pointer rounded-full bg-red-500 px-2 text-white"
              onClick={(e) => handleRemoveImage(e, index)}
            >
              x
            </button>
          )}
        </a>
      </>
    ));
  };

  const isMainPreview = (index) => {
    return index === mainImageIndex;
  };

  const handleSetMainImageIndex = (e, index) => {
    e.preventDefault();
    setMainImageIndex(index);
  };

  const handleRemoveImage = (e, indexToRemove) => {
    e.preventDefault();
    const updatedPreviews = [...imagePreviews];

    updatedPreviews.splice(indexToRemove, 1);

    setImagePreviews(updatedPreviews);

    setFormData({
      ...formData,
      images: formData.images.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleUploadPreview = (e) => {
    e.preventDefault();
    if (formData.images == null) {
      setError("Please upload an image");
    } else {
      setUploadPreview(true);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const data = new FormData();

    for (const key in formData) {
      if (key !== "images") {
        data.append(key, formData[key]);
      }
    }

    for (let i = 0; i < formData.images.length; i++) {
      data.append("images[]", formData.images[i]);
    }

    try {
      const response = await axios.post(`${baseURL}/api/v1/products`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      /*if (response.error) {
        setError(response.error);
      } else {
        setError(null);
      }*/

      setLoading(false);
      navigate("/admin/products");
    } catch (error) {
      if (error.response) {
        if (error.response.data.error) {
          setError(error.response.data.error);
        } else if (error.response.data.errors) {
          const errorMessages = Object.values(
            error.response.data.errors
          ).flat();
          setError(errorMessages);
        } else {
          setError("An unexpected error occurred.");
        }
      }

      console.error("Error creating product:", error);

      setLoading(false);
    }
  };

  useEffect(() => {
    if (paramProductType === "grocery") {
      setFormData({
        ...formData,
        type: "grocery",
      });
    } else if (paramProductType === "request") {
      setFormData({
        ...formData,
        type: "request",
      });
    } else {
      setFormData({
        ...formData,
        type: "product",
      });
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/categories`);
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const getUserCountry = () => {
      if (storedCountry == "NG") {
        setFormData({
          ...formData,
          currency: "₦",
        });
      } else if (storedCountry == "UK") {
        setFormData({
          ...formData,
          currency: "£",
        });
      } else if (storedCountry == "US") {
        setFormData({
          ...formData,
          currency: "$",
        });
      } else {
        setFormData({
          ...formData,
          currency: "£",
        });
      }
      // setCurrencySymbol(getCurrencySymbolForCountry(country));
    };

    getUserCountry();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const getCurrencySymbolForCountry = (country) => {
    const currencySymbol = currencySymbolMap[country] || "$"; // Default to '$' if not found

    return currencySymbol;
  };

  const containerStyle = {
    background:
      "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0))",
  };

  return (
    <div className="flex w-full flex-col gap-5">
      {error && <div className="mt-8 ml-4 text-red-500">{error}</div>}
      <form
        className={"relative h-full w-full p-4"}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="imageForm"
      >
        {uploadPreview && (
          <UploadPreview
            formData={formData}
            loading={loading}
            imagePreviews={imagePreviews}
            mainImageIndex={mainImageIndex}
            setUploadPreview={setUploadPreview}
          />
        )}

        <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
          <div className="col-span-12 lg:!mb-0">
            <Card extra={"w-full p-4 h-full"}>
              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold tracking-wide text-gray-500">
                  Attach Document
                </label>
                <div className="flex w-full items-center justify-center">
                  {imagePreviews?.length > 0 && (
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-center sm:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 xl:gap-x-2">
                      {renderImagePreviews()}
                      <label
                        className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-100"
                        htmlFor="images"
                      >
                        <div>+ Add more</div>
                      </label>
                    </div>
                  )}

                  {/*<div className="flex flex-auto max-h-48 mx-auto -mt-10">
      	{renderImagePreviews()}	
</div>*/}

                  {imagePreviews?.length === 0 && (
                    <label
                      htmlFor="images"
                      className="group flex h-60 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center"
                    >
                      <div className="flex h-full w-full flex-col items-center items-center justify-center text-center  ">
                        <img
                          className="has-mask h-36 object-center"
                          src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                          alt="freepik image"
                        />

                        <p className="pointer-none text-gray-500 ">
                          Select files from your computer
                        </p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-300">
                <span>File type: jpg,png,types of images</span>
              </p>
              <input
                id="images"
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </Card>
          </div>

          <div className="col-span-6 lg:!mb-0">
            <Card extra={"w-full p-4 h-full"}>
              <div className="mb-6 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0">
                  <div></div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Product Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Add Product Name"
                        autoComplete="product-name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="mt-2 sm:col-span-3">
                    <label
                      htmlFor="category_id"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Product Category
                    </label>
                    <div className="mt-2">
                      <select
                        id="category_id"
                        name="category_id"
                        autoComplete="category"
                        value={formData.category_id}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select Category</option>
                        {categories &&
                          categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <fieldset className="mt-2">
                    <legend className="text-xs font-semibold text-gray-500">
                      Product Condition
                    </legend>
                    <div className="mt-2 flex items-center">
                      <div className="mr-8 flex items-center gap-x-3">
                        <input
                          id="condition-new"
                          name="condition"
                          type="radio"
                          onChange={handleInputChange}
                          value="new"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="condition-new"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          New
                        </label>
                      </div>
                      <div className="mr-8 flex items-center gap-x-3">
                        <input
                          id="condition-used"
                          name="condition"
                          type="radio"
                          value="used"
                          onChange={handleInputChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="condition-used"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Faily Used
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="conditon-na"
                          name="condition"
                          type="radio"
                          value="na"
                          onChange={handleInputChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="conditon-na"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Not Applicable (N/A)
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  <div className="col-span-full mt-2">
                    <label
                      htmlFor="price"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Price*
                    </label>
                    <div className="mt-2 flex items-center">
                      <span className="mr-2">{formData.currency}</span>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        placeholder={
                          paramProductType == "request"
                            ? "Min price"
                            : "Add Price"
                        }
                        autoComplete="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      />
                      {paramProductType == "request" && (
                        <input
                          type="text"
                          name="max_price"
                          id="max_price"
                          placeholder="Max Price"
                          value={formData.max_price}
                          onChange={handleInputChange}
                          className="mt-1 ml-8 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                        />
                      )}
                    </div>
                  </div>

                  <div className="col-span-full mt-2">
                    <label
                      htmlFor="street-address"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Location*
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Add Location"
                        autoComplete="street-address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-x-3">
                      <input
                        id="use-location"
                        name="use-location"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        onClick={handleUseAddress}
                        htmlFor="use-location"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Use already existing address
                      </label>
                    </div>
                  </div>

                  <div className="col-span-full mt-2">
                    <label
                      htmlFor="street-address"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Phone Number*
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="phone_number"
                        id="phone_number"
                        placeholder="Add phone number"
                        autoComplete="phone-number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-x-3">
                      <input
                        id="use-phone"
                        name="use-phone"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        onClick={handleUsePhoneNumber}
                        htmlFor="use-phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Use already existing phone number
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-span-6 lg:!mb-0">
            <Card extra={"w-full p-4 h-full"}>
              <div className="col-span-full mt-2">
                <label
                  htmlFor="description"
                  className="text-xs font-semibold text-gray-500"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    placeholder="Describe you product in detail"
                    className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    // defaultValue={''}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full mt-2">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-gray-500"
                >
                  Key Specifications
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="single_specifications"
                    id="key_specifications"
                    placeholder="Add specifications"
                    value={formData.single_specifications}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />

                  {formData.key_specifications && (
                    <ul className="list-disc px-8 py-4">
                      {formData.key_specifications
                        .split(delim)
                        .map((specification, index) => (
                          <li key={index}>
                            {specification.trim()}
                            <button
                              type="button"
                              className="ml-2 text-red-500"
                              onClick={() => handleRemoveSpecification(index)}
                            >
                              X
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Hit enter to add each specification
                </p>
                <button
                  onClick={handleUploadPreview}
                  className="linear mt-8 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                >
                  PREVIEW & SUBMIT
                </button>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Tables;
