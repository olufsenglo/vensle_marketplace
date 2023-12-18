import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from "components/card";
import axios from 'axios';

import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";

import currencySymbolMap from 'currency-symbol-map';

const Tables = () => {
  const navigate = useNavigate();	
  const [currencySymbol, setCurrencySymbol] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const accessToken = useSelector((state) => state.auth.user.token);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState(null);


  const [formData, setFormData] = useState({
    name: '',
    category_id: 1,
    condition: 'New',
    price: '',
    address: '',
    phone_number: '',
    description: '',
    type:'x',
    ratings: 3.8,
    quantity: 1,
    sold: 1,
    views: 1,
    status: 'Active',
    images: null,
    //specifications_ids: [4,5],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      images: null,
    });
  };	

  const handleFileChange = (e) => {
	  const { name, files } = e.target;

    const previews = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(files[i]);
    }	  


	  setFormData({
		  ...formData,
		  [name]: files,
	  });
  }


  const renderImagePreviews = () => {
    return imagePreviews.map((preview, index) => (
      <img key={index} src={preview} alt={`Preview ${index}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
    ));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    for (const key in formData) {
      if (key !== 'images') {
        data.append(key, formData[key]);
      }
    }	  

    for (let i = 0; i < formData.images.length; i++) {
      data.append('images[]', formData.images[i]);
    }



    try {
      const response = await axios.post('http://localhost:8000/api/v1/products', data, {
	      headers: {
		      'Content-Type': 'multipart/form-data',
		      'Authorization': `Bearer ${accessToken}`,
	      },
      });
      console.log(response.data);

      // Redirect to another page upon success
      navigate('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      setError('An error occurred while uploading. Please try again.');	 
      // Handle error
    }	  
  

  };


  useEffect(() => {
    const getUserCountry = async () => {
      try {
        // Fetch user's country based on IP address using the IPinfo API
        const response = await axios.get('https://ipinfo.io/json?token=09389931bcf565');

        // Extract country information from the response
        const country = response.data.country;
        console.log('Country Code:', country); // Log the country code for debugging
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
    <div className="">
{error && <div className="text-red-500">{error}</div>}
      <div className="mt-5 grid h-full grid-cols-1 gap-5">


     <Card extra={"w-full p-4 h-full"}>

        <form onSubmit={handleSubmit} encType="multipart/form-data" id="imageForm">
            <div className="mb-6 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">

              <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0">

            <div>
            </div>

            <div class="grid grid-cols-1 space-y-2">
                                <label class="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                                <div class="flex items-center justify-center w-full">
                                    <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                        <div class="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                                            
                                            <div class="flex flex-auto max-h-48 mx-auto -mt-10">
    

                                              {renderImagePreviews()}	


	                                            <img class="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
                                            </div>
                                            <p class="pointer-none text-gray-500 "><span class="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" class="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                        </div>
                                        <input
                                          type="file"
                                          name="images"
                                          multiple
                                          onChange={handleFileChange}
                                          class="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                                    <p class="text-sm text-gray-300">
                                        <span>File type: doc,pdf,types of images</span>
                                    </p>

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
              id="category"
              name="category"
              autoComplete="category"
              // value={formData.category} 
              // onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
            >
              <option>Select Category</option>
              <option value="1">Electronics</option>
              <option value="2">Clothing</option>
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
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="conditon-na" className="block text-sm font-medium leading-6 text-gray-900">
                Not Aplicable (N/A)
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
              placeholder="Add Price"
              autoComplete="price"
              value={formData.price} 
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
            />
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
            <label htmlFor="use-location" className="block text-sm font-medium leading-6 text-gray-900">
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
            <label htmlFor="use-phone" className="block text-sm font-medium leading-6 text-gray-900">
              Use already existing phone number
            </label>
          </div>
        </div>

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
              name="specification"
              id="specification"
              placeholder="Add specifications"
              // value={formData.name} 
              // onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">Hit enter to add each specification</p>
        </div>

                <button type="submit" className="linear mt-8 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                  PREVIEW & SUBMIT
                </button>
              </div>
            </div>
            
        </form>
     
      </Card>




      </div>
    </div>
  );
};

export default Tables;
