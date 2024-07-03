import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "components/card";
import axios from "axios";

import {
   XMarkIcon,
   ArrowUpTrayIcon,
   ArrowLeftIcon,
   ChevronDownIcon,
} from "@heroicons/react/24/outline";
import currencySymbolMap from "currency-symbol-map";

import uploadImage from "assets/img/dashboards/upload.png";
import UploadPreview from "./components/UploadPreview";


const baseURL = "https://nominet.vensle.com/backend";

const Tables = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  const [jsValidateErrors, setJsValidateErrors] = useState({});
  const [uploadPreview, setUploadPreview] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingPreviews, setLoadingPreviews] = useState(false);
  const [urlProductType, setUrlProductType] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [activeSubcategoryName, setActiveSubcategoryName] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSubcategories, setActiveSubcategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState([]);
  const [isLeftVisible, setLeftVisible] = useState(true);

  const [subcategoryFiltersLoading, setSubcategoryFiltersLoading] = useState(false);
  const [subcategoryFilters, setSubcategoryFilters] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    subcategory_id: "",
    condition: "",
    price: "",
    max_price: "",
    address: "",
    phone_number: "",
    description: "",
    type: "product",
    ratings: 0,
    product_quantity: 1,
    sold: 1,
    views: 1,
    status: "Active",
    images: [],
    single_specifications: "",
    latitude: storedLocation.lat,
    longitude: storedLocation.lng,
    currency: "",
    city: storedCity,
    country: storedCountry,
    key_specifications: "",
    ramSize: "",
    storageCapacity: "",
    size: "",
    color: "",
    skinType: "",
    fuelType: "",
    transmission: "",
    processorType: "",
    material: "",
    material2: "",
    fit: "",
    racketType: "",
    swimsuitType: "",	  
  });

  const handleSetCategory = (category) => {
	setActiveCategory(category)
	setActiveSubcategories(category.subcategories)
	setLeftVisible(!isLeftVisible)

        setFormData({
           ...formData,
           category_id: category.id,
        });
	//validateField(name, value);
  }

  const handleBackToCategories = () => {
        setLeftVisible(!isLeftVisible)
	setActiveSubcategories('')
	setActiveCategory('')
  }

  const handleSetSubcategory = (subcategory) => {
        setFormData({
           ...formData,
           subcategory_id: subcategory.id,
        });
	setActiveSubcategoryName(subcategory.name)
	setIsOpen(false)
	//Make api call to get filters by subcategory id
	getFiltersForSubcategory(subcategory.id)
	//validateField(name, value);
  }

    const getFiltersForSubcategory = async (id) => {
        setSubcategoryFiltersLoading(true)
	try {
		const response = await axios.get(
			`${baseURL}/api/v1/subcategory/${id}/product-filters`
		);
        	setSubcategoryFilters(response.data);
        	setSubcategoryFiltersLoading(false)
	} catch (error) {
        	console.error("Error fetching categories filter", error);
        	setSubcategoryFiltersLoading(false)
	}
    };

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

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "name":
      case "location":
      case "phone_number":
      case "address":
      case "condition":
        if (!value.trim()) {
          errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace('_', ' ')} is required`;
        }
        break;
     case "price":
        if (!value.trim()) {
	   errorMessage = "Price is required";
        } else {
	   const priceValue = parseFloat(value);
	   if (isNaN(priceValue) || priceValue < 0 || priceValue > 999999.99) {
	      errorMessage = "Price must be a valid number between 0 and 999,999.99";
	   }
        }
    break;		    
      case "images":
        // Validate if images are required and check if there are any uploaded
        if (value.length === 0) {
          errorMessage = "Images are required";
        } else {
          // Validate each file (size, type, etc.) if needed
          const allowedTypes = ['image/jpeg', 'image/png'];
          const maxSize = 5 * 1024 * 1024; // 5MB

          for (let i = 0; i < value.length; i++) {
            const file = value[i];

            // Check file type
            if (!allowedTypes.includes(file.type)) {
              errorMessage = "Only JPEG and PNG image files are allowed";
              break;
            }

            // Check file size
            if (file.size > maxSize) {
              errorMessage = "File size exceeds 5MB limit";
              break;
            }
          }

          // Additional checks: Limit number of images
          if (value.length > 5) { // Example: Limit to 5 images
            errorMessage = "Maximum of 5 images allowed";
          }
        }
      case "category_id":
      case "subcategory_id":
        if (!value) {
          errorMessage = "Category is required";
        }
        break;
      default:
        break;

    }

    setJsValidateErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage
    }));

    return errorMessage;
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

const handleFilterChange = (filterName, selectedValue) => {
    setFormData({
        ...formData,
        [filterName]: selectedValue,
    });
};
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
  
    // Combine existing files with newly selected files
    const existingFiles = formData.images ? [...formData.images] : [];
    const newFiles = [...existingFiles, ...files];
  
    // Validate each file individually
    const newErrors = {};
    const previews = [];
    let loadedCount = 0;
  
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
  
      // Validate the file
      const errorMessage = validateFile(file);
      if (errorMessage) {
        newErrors[name] = errorMessage;
        continue; // Skip processing invalid file
      }
  
      // Read and store image previews
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        loadedCount++;
        // Set image previews and clear loading state when all previews are loaded
        if (loadedCount === newFiles.length) {
          setImagePreviews(previews);
          setLoadingPreviews(false);
        }
      };
      reader.onerror = () => {
        setLoadingPreviews(false);
        console.error('Error loading image preview');
      };
      reader.readAsDataURL(file);
    }
  
    // Update errors state with validation results
    setJsValidateErrors({
      ...jsValidateErrors,
      [name]: newErrors[name] || null, // Set or clear error message
    });
  
    // Update formData only with valid files
    if (Object.keys(newErrors).length === 0) {
      setFormData({
        ...formData,
        images: newFiles,
      });
    }
  };
  
  // Function to validate each file
  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
  
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return "Only JPEG and PNG image files are allowed";
    }
  
    // Check file size
    if (file.size > maxSize) {
      return "File size exceeds 5MB limit";
    }
  
    // Add more validations if needed
    return ""; // No error
  };
  


  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;

  //   const existingFiles = formData.images ? [...formData.images] : [];
  //   const newFiles = [...existingFiles, ...files];

  //   setFormData({
  //     ...formData,
  //     images: newFiles,
  //   });

  //   setLoadingPreviews(true);

  //   const previews = [];
  //   for (let i = 0; i < newFiles.length; i++) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       previews.push(event.target.result);
  //       if (previews.length === newFiles.length) {
  //         setImagePreviews(previews);
  //         setLoadingPreviews(false);
  //       }
  //     };
  //     reader.onerror = () => {
  //       // Handle error
  //       setLoadingPreviews(false);
  //       console.error('Error loading image preview');
  //     };
  //     reader.readAsDataURL(newFiles[i]);
  //   }

  //   const errorMessage = validateField(name, newFiles); // Pass newFiles array for validation
  //   setJsValidateErrors(prevErrors => ({
  //     ...prevErrors,
  //     [name]: errorMessage
  //   }));
  // };

  const renderImagePreviews = () => {
    return imagePreviews.map((preview, index) => (
      <>
        <div className="group relative">
          <div className="relative aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className={`h-full w-full rounded-lg object-cover object-center group-hover:opacity-75 ${index === mainImageIndex ? "border-2 border-green-500" : ""
                }`}
            />
            {!isMainPreview(index) ? (
              <h3
                style={containerStyle}
                className="absolute z-[2] cursor-pointer bottom-0 left-0 right-0 rounded-lg pt-4 text-sm text-white"
                onClick={(e) => handleSetMainImageIndex(e, index)}
              >
                <span className="block p-1 w-full text-center hover:underline">Set as Display</span>
              </h3>
            ) : (
              <h3
                style={containerStyle}
                className="absolute bottom-0 left-0 right-0 cursor-pointer rounded-lg pt-4 text-center text-sm text-white"
              >
                <span className="block p-1 w-full text-center hover:underline">Display</span>
              </h3>
            )}
          </div>
          {/* {!isMainPreview(index) && ()} */}
          <button
            className="absolute top-[3px] right-[3px] cursor-pointer rounded-full bg-red-500 hover:bg-red-600 text-white"
            onClick={(e) => handleRemoveImage(e, index)}
          >
            <XMarkIcon className="h-6 w-6 p-[3px]" aria-hidden="true" />
          </button>

        </div>
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

    // Validate all fields before submitting
    const newErrors = {};
    Object.keys(formData).forEach(fieldName => {
      const value = formData[fieldName];
      const errorMessage = validateField(fieldName, value);
      if (errorMessage) {
        newErrors[fieldName] = errorMessage;
      }
    });


    // Update errors state
    setJsValidateErrors(newErrors);

    // If there are no errors, proceed to preview
    if (Object.keys(newErrors).length === 0) {
      setUploadPreview(true);
      setError(null);
    } else {
      console.log("Form has validation errors. Please fix them.");
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

      setLoading(false);
      navigate("/admin/products");
    } catch (error) {
      if (error.response) {
        if (error.response.data.error) {
          setError(error.response.data.error);
          setUploadPreview(false);
        } else if (error.response.data.errors) {
          const errorMessages = Object.values(
            error.response.data.errors
          ).flat();
          setError(errorMessages);
          setUploadPreview(false);
        } else {
          setError("An unexpected error occurred.");
        }
      }

      console.error("Error creating product:", error);

      setLoading(false);
    }
  };




  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };


  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const combinedFiles = [...formData.images, ...droppedFiles];

    setFormData({
      ...formData,
      images: combinedFiles,
    });

    setLoadingPreviews(true);

    const previews = [];
    for (let i = 0; i < combinedFiles.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === combinedFiles.length) {
          setImagePreviews(previews);
          setLoadingPreviews(false);
        }
      };
      reader.onerror = () => {
        // Handle error
        setLoadingPreviews(false);
        console.error('Error loading image preview');
      };
      reader.readAsDataURL(combinedFiles[i]);
    }
  };




  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paramProductType = queryParams.get("type");
    setUrlProductType(paramProductType)
    if (paramProductType) {
      console.log("Product type:", paramProductType);
    }
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
	setCategoriesLoading(true)
        const response = await fetch(`${baseURL}/api/v1/categories`);
        const data = await response.json();
        setCategories(data.categories);
	setCategoriesLoading(false)
      } catch (error) {
        console.error("Error fetching categories:", error);
	setCategoriesLoading(false)
      }
    };

    fetchCategories();
  }, [location.search]);

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




  const [selectedCategory, setSelectedCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const options = ['Select Category'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
	setLeftVisible(true)
	setActiveCategory('')
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedCategory(option);
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
{console.log('dateeher',formData)}
        <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
          <div className="col-span-12 lg:!mb-0">
            <Card extra={"w-full p-4 h-full"}>
              <div className="grid grid-cols-1 space-y-2">
                <div
                  className={`flex w-full relative items-center justify-center border-2 border-dashed  rounded-lg p-4 ${dragging ? 'bg-gray-200' : ''}  ${jsValidateErrors.images
                    ? "border-red-200"
                    : "border-gray-400"
                    }`}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {loadingPreviews &&
                    <p className="bg-white flex justify-center items-center m-6 absolute top-0 bottom-0 left-0 right-0">Loading...</p>
                  }
                  {imagePreviews?.length > 0 && (
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-center sm:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 xl:gap-x-2">
                      {renderImagePreviews()}
                      <label
                        className="flex flex-col items-center justify-center min-h-[5rem] cursor-pointer items-center justify-center rounded-lg border border-gray-100"
                        htmlFor="images"
                      >
                        <ArrowUpTrayIcon className="w-6 h-6 mb-2" />
                        <div>+ Add more</div>
                      </label>
                    </div>
                  )}

                  {imagePreviews?.length === 0 && (
                    <label
                      htmlFor="images"
                      className="group flex h-60 w-full flex-col rounded-lg text-center"
                    >
                      <div className="flex cursor-pointer h-full w-full flex-col items-center items-center justify-center text-center  ">
                        <img
                          className="has-mask h-36 object-center"
                          src={uploadImage}
                          alt="freepik image"
                        />

                        <p className="pointer-none text-gray-500 ">
                          Drag and drop images or click to select
                        </p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
              <p className="text-sm mt-2 text-gray-300">
                <span>File type: jpg, jepg, png, gif or svg </span>
              </p>
              <input
                id="images"
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              {jsValidateErrors.images &&
                <p
                  style={{ color: "red", fontSize: "13px" }}
                  className="mt-1"
                >
                  {jsValidateErrors.images}
                </p>
              }
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
                      Product Name*
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
                        className={`mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${jsValidateErrors.name
                          ? "bg-red-50"
                          : "bg-gray-50"
                          }`}
                      />
                      {jsValidateErrors.name &&
                        <p
                          style={{ color: "red", fontSize: "13px" }}
                          className="mt-1"
                        >
                          {jsValidateErrors.name}
                        </p>
                      }
                    </div>
                  </div>

                  <div className="mt-2 sm:col-span-3">
                    <label
                      htmlFor="category_id"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Product Category*
                    </label>







    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full" ref={dropdownRef}>
        <div
          className={`flex justify-between items-center w-full mt-1 block rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 bg-gray-50 cursor-pointer ${
		isOpen && "ring-2 ring-teal-500"
	  } ${!activeSubcategoryName && "text-gray-500"}`}
          onClick={toggleDropdown}
        >
          {activeSubcategoryName || 'Select Category'} <ChevronDownIcon className="w-4 h-4" />
        </div>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full border border-blue-300 border-t-0 bg-gray-50 py-1 shadow-lg">


		    <h3 className="flex items-center text-base font-semibold text-sm px-2">
	  		{activeSubcategories.length > 0 && <ArrowLeftIcon
	  			onClick={handleBackToCategories}
	  			className="mr-2 p-[2px] h-5 w-5 rounded-full hover:bg-gray-200 cursor-pointer transition duration-300"
	  		    />}
	  		{activeCategory ? activeCategory.name : "Categories"}
	  	    </h3>
	  	    <div className="flex h-full w-full overflow-hidden">
			    <ul className={`text-[14px] flex h-full w-full shrink-0 transform flex-col transition-transform duration-300 translate-x-0  ${isLeftVisible
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                                    }`}>
				{categoriesLoading && <li className="px-4">Loading...</li>}
				{categories.length > 0 && categories.map((category) => 
				    <li
					onClick={()=>handleSetCategory(category)}
					key={category.id}
					className="py-1 px-4 cursor-pointer hover:text-white hover:bg-[#1967d2]"
				    >
					{category.name}
				    </li>
				)}
			    </ul>
	  		    <ul className={`text-[14px] flex w-full shrink-0 transform flex-col transition-transform duration-300 ${isLeftVisible
                                    ? "translate-x-full"
                                    : "-translate-x-full"
                                    }`}>
				{activeSubcategories.length > 0 && activeSubcategories.map((subcategory) => 
				    <li
					onClick={()=>handleSetSubcategory(subcategory)}
					key={subcategory.id}
					className={`py-1 px-4 cursor-pointer hover:text-white hover:bg-[#1967d2] ${
						subcategory.id === formData.subcategory_id && "text-white bg-[#1967d2]"
					}`}
				    >
					{subcategory.name}
				    </li>
				)}
	  		    </ul>
		  </div>


          </div>
        )}
      </div>
      {/* Additional content for the upload product form */}
      <form className="mt-4">
        {/* Your upload product form elements go here */}
      </form>
    </div>	  



	  {subcategoryFilters.length > 0 && <div className="relative border border-gray-200 rounded-lg pt-3 pb-2 px-3">
		<label
		    htmlFor="category_id"
		    className="absolute bg-white px-2 py-1 text-xs top-[-13px] font-semibold text-gray-500"
		>
		    Features
		</label>
	  
		{subcategoryFilters.map((subFilter)=> (
			    <div key={subFilter.id} className="mb-4">
				<label
			  	    htmlFor="category_id"
				    className="text-xs text-gray-500 italic"
				>
				    {subFilter.name}
				</label>
			    	<select
			            value={formData[subFilter.name.toLowerCase()]}
				    onChange={(e) => {
					const selectedValue = e.target.value;
					handleFilterChange(subFilter.name, selectedValue);
				    }}
                        	    className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm text-gray-500 placeholder-gray-300 shadow-sm outline-none transition bg-gray-50 focus:ring-2 focus:ring-teal-500 ${jsValidateErrors.category_id"
				>
				    <option value="">Select {subFilter.name}</option>
				    {subFilter.value.split(',').map((value, index) => (
					<option key={index} value={value.trim()}>{value.trim()}</option>
				    ))}
	  		    	</select>
			    </div>
		))}
</div>}





                    <div className="mt-2">
                      <select
                        id="category_id"
                        name="category_id"
                        autoComplete="category"
                        value={formData.category_id}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${jsValidateErrors.category_id
                          ? "bg-red-50"
                          : "bg-gray-50"
                          }`}
                      >
                        <option value="">Select Category</option>
                        {categories &&
                          categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                      {(jsValidateErrors.category_id || jsValidateErrors.subcategory_id) &&
                        <p
                          style={{ color: "red", fontSize: "13px" }}
                          className="mt-1"
                        >
                          {jsValidateErrors.category_id || jsValidateErrors.subcategory_id}
                        </p>
                      }
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
                      {jsValidateErrors.condition &&
                        <p
                          style={{ color: "red", fontSize: "13px" }}
                          className="mt-1"
                        >
                          {jsValidateErrors.condition}
                        </p>
                      }
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
                          urlProductType == "request"
                            ? "Min price"
                            : "Add Price"
                        }
                        autoComplete="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${jsValidateErrors.price
                          ? "bg-red-50"
                          : "bg-gray-50"
                          }`}
                      />
                      {urlProductType == "request" && (
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
                    {jsValidateErrors.price &&
                      <p
                        style={{ color: "red", fontSize: "13px" }}
                        className="mt-1"
                      >
                        {jsValidateErrors.price}
                      </p>
                    }
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
                        className={`mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${jsValidateErrors.address
                          ? "bg-red-50"
                          : "bg-gray-50"
                          }`}
                      />
                      {jsValidateErrors.address &&
                        <p
                          style={{ color: "red", fontSize: "13px" }}
                          className="mt-1"
                        >
                          {jsValidateErrors.address}
                        </p>
                      }
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
                        className={`mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${jsValidateErrors.phone_number
                          ? "bg-red-50"
                          : "bg-gray-50"
                          }`}
                      />
                      {jsValidateErrors.phone_number &&
                        <p
                          style={{ color: "red", fontSize: "13px" }}
                          className="mt-1"
                        >
                          {jsValidateErrors.phone_number}
                        </p>
                      }
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

              <div className="flex flex-col flex-1 col-span-full mt-2">
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
                          <li key={index} className="relative">
                            {specification.trim()}
                            <button
                              type="button"
                              className="ml-2 text-red-500 absolute"
                              onClick={() => handleRemoveSpecification(index)}
                            >
                              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Hit enter to add each specification
                </p>
                <div className="flex-1 flex items-end">
                  <button
                    onClick={handleUploadPreview}
                    className="linear mt-8 w-full rounded-[5px] bg-[#ff5959] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-400 active:bg-red-600 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
                  >
                    PREVIEW & SUBMIT
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Tables;
