import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

import Product from "./Product";
import Grocery from "./Grocery";

const product = {
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Products = () => {
  const baseURL = "http://nominet.vensle.com/backend";
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const searchTerm = queryParams.get('searchTerm') || '';
  const category_id = queryParams.get('category_id') || '';

 const initialDistance = queryParams.get('distance') || '';	

  const storedLocation = JSON.parse(localStorage.getItem('userLocation')) || { lat: 0, lng: 0 };
  const storedCountry = localStorage.getItem('userCountry') || 'Unknown';
	



  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  // State for filter form inputs
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [type, setType] = useState('');
  const [sort, setSort] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [loading, setLoading] = useState([]);


  const [distance, setDistance] = useState(initialDistance);
  const [userLocation, setUserLocation] = useState({
	lat: storedLocation.lat,
	lng: storedLocation.lng
  });
  const [userCountry, setUserCountry] = useState(storedCountry);

  const handleDistanceChange = (event) => {
    const newDistance = parseInt(event.target.value, 10);
    setDistance(newDistance);
    //fetchProducts(userLocation, newDistance, userCountry);
    //console.log("coounnt", userLocation)
  };


  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle checkbox input separately
      if (checked) {
        setSelectedSizes((prevSizes) => [...prevSizes, value]);
      } else {
        setSelectedSizes((prevSizes) => prevSizes.filter((size) => size !== value));
      }
    } else {
      // Handle other input types
      switch (name) {
        case 'minPrice':
          setMinPrice(value);
          break;
        case 'maxPrice':
          setMaxPrice(value);
          break;
        case 'type':
          setType(value);
          break;
        case 'sort':
          setSort(value);
          break;
        default:
          break;
      }
    }
  };

  const handleApplyFilter = () => {
    // Make API call with filter parameters
    fetchFilteredProducts();
  };

  const handleClearFilters = (e) => {
	  e.preventDefault();

	  setMinPrice('');
	  setMaxPrice('');
	  setType('');
	  setSort('');
	  setSelectedSizes([]);
  }

  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      // Customize the API endpoint and parameters based on your backend
      const response = await axios.get(`${baseURL}/api/v1/products/filter`, {
        params: {
          searchTerm,
          category_id,
          minPrice,
          maxPrice,
	  distance,
	  lat: userLocation.lat,
	  lng: userLocation.lng,
	  country: userCountry,
	  type,
	  sort,
          sizes: selectedSizes.join(','), // Convert array to comma-separated string
        },
      });

      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();


  }, [searchTerm, category_id, minPrice, maxPrice, distance, userLocation, userCountry, type, sort, selectedSizes]);

  return (
 <div className="bg-white">

      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
	  	    <div className="px-2 py-3">
                        <h3 className="text-xl flow-root">Price</h3>
	  		<div className="block px-2 py-3">
	  		    input
	  		</div>
	  	    </div>
	  	
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        <nav className="pt-8" aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 lg:max-w-7xl">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>




          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
	  {console.log('fillltaa',filteredProducts)}
            <p className="text-gray-500">{filteredProducts.total} Ads</p>
            <h1 className="flex items-center justify-between text-xl font-semi-bold tracking-tight text-gray-900">
      <select
	name="type"
        value={type}
	onChange={handleInputChange}
        className="border p-2 rounded-md h-full"
      >
        <option value="">Everything</option>
        <option value="product">Products</option>
        <option value="grocery">Groceries</option>
      </select>

            </h1>

            <div className="flex items-center">

      <select
	name="sort"
        value={sort}
	onChange={handleInputChange}
        className="border p-2 rounded-md h-full text-gray-700"
      >
        <option
	  value=""
	>Sort</option>
        <option value="views">Most Popular</option>
        <option value="ratings">Rating</option>
        <option value="created_at">Newest Upload</option>
        <option value="price_lowest">Price: Low to High</option>
        <option value="price_highest">Price: High to Low</option>
      </select>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">

 <h3 className="text-xl mb-2 flow-root">Distance</h3>
      <label className="block mb-4">
        <select
          className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
	  value={distance}
	  onChange={handleDistanceChange}
	>
          <option value={20}>20 km</option>
          <option value={30}>30 km</option>
          <option value={500}>500 km</option>
        </select>
      </label>


          <h3 className="text-xl mb-2 flow-root">Price</h3>
	  <div className="mb-7 flex justify-between items-center">
	  	<div className="flex items-center">
	  		<span className="mr-2">
	  			$
	  		</span>
			<label>
			  <input
              		      className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
	  		      type="text"
	  		      name="minPrice"
	  		      value={minPrice}
	  		      onChange={handleInputChange} />
			</label>
	  	</div>
	  	<div className="mx-3">
	  	    -
	  	</div>
	  	<div>
			<label>
				<input
              		        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
	  			type="text"
	  			name="maxPrice"
	  			value={maxPrice}
	  			onChange={handleInputChange} />
			</label>
	  	</div>
	  </div>

	  
          <h3 className="mb-2 text-xl flow-root">Size</h3>
	  
	  <div>
	  	<ul>
	  		<li>
			  <input className="mr-3" type="checkbox" name="small" value="small" onChange={handleInputChange} />
			  <span>Small</span>
	  		</li>
	  		<li>
          		   <input className="mr-3" type="checkbox" name="small" value="small" onChange={handleInputChange} />
          		   <span>Medium</span>
	  		</li>
	  		<li>
          		   <input className="mr-3" type="checkbox" name="medium" value="medium" onChange={handleInputChange} />
          		   <span>Large</span>
	  		</li>
	  	</ul>
	  </div>
        <br />


	<div className="mt-4 flex items-center justify-between">
		<button onClick={handleClearFilters} className="text-gray-900">CLEAR ALL</button>

		<button
		  type="button"
		  className="bg-transparent hover:bg-orange-500 text-orange-500 hover:text-white py-1 px-5 border border-orange-500 hover:border-transparent rounded"
		  onClick={handleApplyFilter}>
		  APPLY
		</button>


	</div>



              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 relative">

{loading &&
<div style={{"zIndex":"5", left:"0", right:"0", top:"0", bottom: "0"}} className="absolute flex justify-center items-center">
	
	<p>Loading...</p>
</div>
}

{!loading && filteredProducts?.data?.length === 0 &&
<div style={{"zIndex":"5", left:"0", right:"0", top:"0", bottom: "0"}} className="absolute flex justify-center items-center">
	<p>Your filter returned no products</p>
</div>
}

{/*----------*/}	  

      {/* Display the filtered products */}
      <div className="bg-white">


        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-3 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
            {filteredProducts.data && filteredProducts.data.map((product) => (
		    <>
		    {product.type == 'product' ? <Product product={product} /> : <Grocery product={product} />}
		    </>
            ))}
          </div>
        </div>
      </div>




              </div>
            </div>
          </section>

	{/*<Pagination />*/}
        </main>
      </div>




</div>
  );
};

export default Products;
