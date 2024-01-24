import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from "components/card";
import axios from 'axios';

import {
    SET_MESSAGE,
} from "actions/types";

import UploadPreview from "./components/UploadPreview";

import { updateUserProfile } from 'actions/auth';

import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";

import currencySymbolMap from 'currency-symbol-map';

const Tables = () => {
  const baseURL = 'https://nominet.vensle.com/backend';
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramProductId = queryParams.get('id');

  const storedLocation = JSON.parse(localStorage.getItem('userLocation')) || { lat: 0, lng: 0 };
  const storedCountry = localStorage.getItem('userCountry') || 'Unknown';	
	
  const [currencySymbol, setCurrencySymbol] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const accessToken = useSelector((state) => state.auth?.user?.token);
  const user = useSelector((state) => state.auth?.user?.user);
  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(false);
  const [mainImageDisplayId, setMainImageDisplayId] = useState(0);
const [mainImageIndex, setMainImageIndex] = useState('');
const [removedImages, setRemovedImages] = useState([]);

  const [productImages, setProductImages] = useState(false);


  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    condition: '',
    price: '',
    max_price: '',
    address: '',
    phone_number: '',
    description: '',
    type:'',
    ratings: 3.8,
    quantity: 1,
    sold: 1,
    views: 1,
    status: 'Active',
    display_image_id: '',
    images: null,
oldImages: null,	  
    single_specifications: '',
latitude: storedLocation.lat,
longitude: storedLocation.lng,
country: storedCountry,
    key_specifications: '',
    //specifications_ids: [4,5],
  });

  const handleUseAddress = () => {
	setFormData({
		...formData,
		address: user.address
	})
  }

  const handleUsePhoneNumber = () => {
	setFormData({
		...formData,
		phone_number: user.phone_number
	})
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };	

 useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const delim = '^%*#$';

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && document.activeElement.id === 'key_specifications') {
      e.preventDefault();
      const newKeySpecifications =
        formData.key_specifications === ''
          ? formData.single_specifications
          : `${formData.key_specifications}${delim}${formData.single_specifications}`;

      setFormData({
        ...formData,
        key_specifications: newKeySpecifications,
        single_specifications: '',
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
    <div key={index} className="relative">
      <img
        src={preview}
        alt={`Preview ${index}`}
        className={`object-cover w-full lg:h-20 ${index === mainImageIndex ? 'border-2 border-green-500' : ''}`}
      />
      {!isMainPreview(index) && (
        <button
	  style={{fontSize: "0.8rem", padding: "0.3rem", height: "1.4rem", width: "1.4rem"}}
          className="absolute flex justify-center items-center top-0 rounded-full right-0 bg-red-500 text-white cursor-pointer"
          onClick={(e) => handleRemoveImage(e, index)}
        >
          x
        </button>
      )}
      {!isMainPreview(index) && (
        <button
	  style={{fontSize: "0.6rem", padding: "0.3rem", left: "30%"}}
          className="absolute bottom-0 opacity-80 hover:opacity-100 rounded-lg p-2 bg-green-500 text-white cursor-pointer"
          onClick={(e) => handleSetMainImageIndex(e, index)}
        >
          Set as Preview
        </button>
      )}
    </div>
  ));
};

const isMainPreview = (index) => {
  return index === mainImageIndex;
};

const handleSetMainImageIndex = (e, index) => {
	e.preventDefault();
	setMainImageIndex(index);
	
	setFormData({
    	   ...formData,
    	   display_image_id: '',
  	});
}


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



const renderOldImagePreviews = (images) => {
  return images.map((image, index) => (
    <div key={index} className="relative">
      <img
        src={getImagePath(image.name)}
        alt={`Preview ${index}`}
        className={`object-cover w-full lg:h-20 ${isMainDisplayImage(image.id) ? 'border-2 border-green-500' : ''}`}
      />
      {!isMainDisplayImage(image.id) && (
        <button
	  style={{fontSize: "0.8rem", padding: "0.3rem", height: "1.4rem", width: "1.4rem"}}
          className="absolute flex justify-center items-center top-0 rounded-full right-0 bg-red-500 text-white cursor-pointer"
          onClick={(e) => handleRemoveOldImage(e, image.id, image.name)}
        >
          x
        </button>
      )}
      {!isMainDisplayImage(image.id) && (
        <button
	  style={{fontSize: "0.6rem", padding: "0.3rem", left: "30%"}}
          className="absolute bottom-0 opacity-80 hover:opacity-100 rounded-lg p-2 bg-green-500 text-white cursor-pointer"
          onClick={(e) => setMainOldImageDisplay(e, image.id)}
        >
          Set as Display
        </button>
      )}
    </div>
  ));
};

const isMainDisplayImage = (imageId) => {
  //return imageId === mainImageDisplayId;
  return imageId === formData.display_image_id;
};

const setMainOldImageDisplay = (e, imageId) => {
	e.preventDefault();

  setFormData({
    ...formData,
    display_image_id: imageId,
  });

  setMainImageIndex('');
  //setMainImageDisplayId(imageId);
};


const handleRemoveOldImage = (e, imageId, imageName) => {
  e.preventDefault();
  
  setRemovedImages((prevNames) => [...prevNames, imageName]);

  const updatedImages = formData.oldImages.filter((image) => image.id !== imageId);

  setFormData({
    ...formData,
    oldImages: updatedImages,
  });
};


    const getImagePath = (name) => {
      return `${baseURL}/uploads/${name}`;
    };

const handleUploadPreview = (e) => {
	e.preventDefault();
	//if (formData.images == null)
	//{
	//	setError("Please upload an image")
	//}
	//else {
		setUploadPreview(true);
		setError(null)
	//}
}

  const handleSubmit = async (e) => {
	e.preventDefault();

	let proofImageIndex = mainImageIndex;
	if (mainImageIndex && !imagePreviews[mainImageIndex]) {
		proofImageIndex = 0;
	}


    try {
      const response = await axios.post(`${baseURL}/api/v1/products/${paramProductId}`, {...formData, removedImages, mainImageIndex: proofImageIndex}, {
              headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${accessToken}`,
              },	      
      });
      console.log('Product updated successfully:', response.data);
	dispatch({
	  type: SET_MESSAGE,
	  payload: {type: "success", message: "Product updated successfully!"},
	});
      navigate('/admin/products');
    } catch (error) {

      if (error.response) {
        if (error.response.data.error) {
          setError(error.response.data.error);
        } else if (error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          setError(errorMessages);
        } else {
          setError('An unexpected error occurred.');
        }
      }

    }
  };


useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/v1/products/${paramProductId}`);
      const product = response.data.product;
      console.log("Product:", product);

  setFormData({
    ...formData,
    name: product.name,
    category_id: product.category_id,
    condition: product.condition,
    price: product.price,
    max_price: product.price,
    address: product.address,
    phone_number: product.phone_number,
    description: product.description,
    type: product.type,
    ratings: product.ratings,
    quantity: product.quantity,
    sold: product.sold,
    views: product.views,
    status: product.status,
    display_image_id: product.display_image_id,
    oldImages: product.images,
    single_specifications: '',
latitude: 32.45435,
longitude: 2.34902,
country: product.country,
    key_specifications: product.key_specifications,
  });

	    setProductImages(product.images);
	    setMainImageDisplayId(product.display_image_id);

    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  if (paramProductId) {
    fetchProduct();
  }
}, [paramProductId]);


  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/v1/categories`);
        const data = response.data;
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const getUserCountry = async () => {
      try {
        // Fetch user's country based on IP address using the IPinfo API
        const response = await axios.get('https://ipinfo.io/json?token=09389931bcf565');

        // Extract country information from the response
        const country = response.data.country;
        console.log('Country Code:', country); 
        if (country == 'NG') {
          setCurrencySymbol('₦')
        } else if (country == 'UK') {
          setCurrencySymbol('£')
        } else if (country == 'US') {
          setCurrencySymbol('$')
        } else {
          setCurrencySymbol('$')
        }
        // setCurrencySymbol(getCurrencySymbolForCountry(country));
      } catch (error) {
        console.error('Error fetching user country:', error);
      }
    };

    getUserCountry();
  }, []); 
  
/*  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
*/


  const getCurrencySymbolForCountry = (country) => {
    console.log('Mapped Currency Symbol:', currencySymbolMap(country)); // Log the mapped currency symbol for debugging

    // Extract the currency symbol from the map
    const currencySymbol = currencySymbolMap[country] || '$'; // Default to '$' if not found
    console.log('Mapped Currency Symbol:', currencySymbol); // Log the mapped currency symbol for debugging
    
    return currencySymbol;
  };  

  return (
    <div className="flex w-full flex-col gap-5">
{error && <div className="mt-8 ml-4 text-red-500">{error}</div>}

	  <form className={"relative w-full p-4 h-full"} onSubmit={handleSubmit} encType="multipart/form-data" id="imageForm">


{uploadPreview && <UploadPreview formData={formData} imagePreviews={formData.oldImages ? formData.oldImages : ''} newImagePreviews={imagePreviews} mainImageIndex={mainImageIndex} setUploadPreview={setUploadPreview} />}


      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">

        <div className="col-span-12 lg:!mb-0">
     		<Card extra={"w-full p-4 h-full"}>
			<div className="grid grid-cols-1 space-y-2">
				<label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
				<div className="flex items-center justify-center w-full">


							<div className="flex flex-auto max-h-48 mx-auto -mt-10">

	      	{formData?.oldImages?.length > 0 && renderOldImagePreviews(formData.oldImages)}	

		{imagePreviews && imagePreviews?.length > 0 && renderImagePreviews()}	

							</div>

		{(formData?.oldImages?.length > 0 || imagePreviews?.length > 0) ?
				    <label className="cursor-pointer" htmlFor="images">
				    	<div>
					     + Add more
			            	</div>
				    </label>
			  	    : 
			            <label htmlFor="images" class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
						<div class="h-full w-full text-center flex flex-col items-center justify-center items-center  ">

	  <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />

							<p className="pointer-none text-gray-500 ">Select files from your computer</p>
						</div>
			             </label>}
				</div>
			</div>
			<p className="text-sm text-gray-300">
				<span>Image type: jpg, jpeg, png</span>
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

            <div>
            </div>
	{console.log('data',formData)}

        <div className="sm:col-span-3">
          <label htmlFor="name" className="text-xs font-semibold text-gray-500">
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

        <div className="sm:col-span-3 mt-2">
          <label htmlFor="country" className="text-xs font-semibold text-gray-500">
            Product Category
          </label>
          <div className="mt-2">
            <select
              id="category_id"
              name="category_id"
              autoComplete="category"
              value={formData.category_id} 
              onChange={handleInputChange}
              className="mt-1 text-gray-500 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select Category</option>
	        {categories && categories.map((category) => (
		  <option key={category.id} value={category.id}>
		    {category.name}
		  </option>
		))}
            </select>
          </div>
        </div>

        <fieldset className="mt-2">
          <legend className="text-xs font-semibold text-gray-500">Product Condition</legend>
          <div className="mt-2 flex items-center">
            <div className="flex items-center gap-x-3 mr-8">
              <input
                id="condition-new"
                name="condition"
                type="radio"
                onChange={handleInputChange}
		checked={formData.condition == 'new' ? true : false }
	        value="new"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="condition-new" className="block text-sm font-medium leading-6 text-gray-900">
                New
              </label>
            </div>
            <div className="flex items-center gap-x-3 mr-8">
              <input
                id="condition-used"
                name="condition"
                type="radio"
	        value="used"
		checked={formData.condition == 'used' ? true : false }
                onChange={handleInputChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="condition-used" className="block text-sm font-medium leading-6 text-gray-900">
                Faily Used
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="conditon-na"
                name="condition"
                type="radio"
	        value="na"
		checked={formData.condition == 'na' ? true : false }
                onChange={handleInputChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="conditon-na" className="block text-sm font-medium leading-6 text-gray-900">
                Not Applicable (N/A)
              </label>
            </div>
          </div>
        </fieldset>

        <div className="col-span-full mt-2">

          <label htmlFor="price" className="text-xs font-semibold text-gray-500">
            Price*
          </label>
          <div className="mt-2 flex items-center">
            <span className="mr-2">{currencySymbol}</span>
            <input
              type="text"
              name="price"
              id="price"
              //placeholder={paramProductType == 'request' ? 'Min price' : 'Add Price'}
              autoComplete="price"
              value={formData.price} 
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
            />
	{/*paramProductType == 'request' &&
            <input
              type="text"
              name="max_price"
              id="max_price"
              placeholder="Max Price"
              value={formData.max_price} 
              onChange={handleInputChange}
              className="mt-1 ml-8 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
            />
	*/}
          </div>
        </div>

        <div className="col-span-full mt-2">
          <label htmlFor="street-address" className="text-xs font-semibold text-gray-500">
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
          <div className="flex items-center gap-x-3 mt-2">
            <input
              id="use-location"
              name="use-location"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label onClick={handleUseAddress} htmlFor="use-location" className="block text-sm font-medium leading-6 text-gray-900">
              Use already existing address
            </label>
          </div>
        </div>

        <div className="col-span-full mt-2">
          <label htmlFor="street-address" className="text-xs font-semibold text-gray-500">
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
          <div className="flex items-center gap-x-3 mt-2">
            <input
              id="use-phone"
              name="use-phone"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label onClick={handleUsePhoneNumber} htmlFor="use-phone" className="block text-sm font-medium leading-6 text-gray-900">
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
			  <label htmlFor="description" className="text-xs font-semibold text-gray-500">
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
			  <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
			</div>

			<div className="col-span-full mt-2">
			  <label htmlFor="name" className="text-xs font-semibold text-gray-500">
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

	{formData.key_specifications &&
		<ul className="list-disc px-8 py-4">
		  {formData.key_specifications.split(delim).map((specification, index) => (
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
	}


			  </div>
			  <p className="mt-3 text-sm leading-6 text-gray-600">Hit enter to add each specification</p>
			<button onClick={handleUploadPreview} className="linear mt-8 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
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
