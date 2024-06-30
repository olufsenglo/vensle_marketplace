import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FunnelIcon,
  MapPinIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/react/20/solid";

import Product from "components/front/product/Product";
import Grocery from "components/front/product/Grocery";

const product = {
  breadcrumbs: [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Search", href: "#" },
  ],
};

const baseURL = "https://nominet.vensle.com/backend";
const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const searchTerm = queryParams.get("searchTerm") || "";
  const category_id = queryParams.get("category_id") || "";

  const initialDistance = queryParams.get("distance") || "";

  const storedLocation = JSON.parse(localStorage.getItem("userLocation")) || {
    lat: 0,
    lng: 0,
  };
  const storedCountry = localStorage.getItem("userCountry") || "Unknown";
  const storedCity = localStorage.getItem("userCity");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // State for filter form inputs
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const [listView, setListView] = useState("grid");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [loading, setLoading] = useState([]);

  const [distance, setDistance] = useState(initialDistance);
  const [userLocation, setUserLocation] = useState({
    lat: storedLocation.lat,
    lng: storedLocation.lng,
  });
  const [userCountry, setUserCountry] = useState(storedCountry);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const handleDistanceChange = (event) => {
    const newDistance = parseInt(event.target.value, 10);
    setDistance(newDistance);
    //fetchProducts(userLocation, newDistance, userCountry);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle checkbox input separately
      if (checked) {
        setSelectedSizes((prevSizes) => [...prevSizes, value]);
      } else {
        setSelectedSizes((prevSizes) =>
          prevSizes.filter((size) => size !== value)
        );
      }
    } else {
      // Handle other input types
      switch (name) {
        case "minPrice":
          setMinPrice(value);
          break;
        case "maxPrice":
          setMaxPrice(value);
          break;
        case "type":
          setType(value);
          break;
        case "sort":
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

    setDistance(20); 
    setMinPrice("");
    setMaxPrice("");
    setType("");
    setSort("");
    setSelectedSizes([]);
    setCurrentPage(1);
  };

  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/api/v1/products/filter`, {
        params: {
          page: currentPage,
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
          sizes: selectedSizes.join(","), // Convert array to comma-separated string
        },
      });

      setFilteredProducts(response.data);
      setLastPage(response.data.last_page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [
    searchTerm,
    initialDistance,
    currentPage,
    category_id,
    minPrice,
    maxPrice,
    distance,
    userLocation,
    userCountry,
    type,
    sort,
    selectedSizes,
  ]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="bg-black fixed inset-0 bg-opacity-25" />
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
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
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

              <form className="py-4 block lg:hidden px-4 border-r border-r-200">
	  	<div className="mb-3 pb-2 pr-4 border-b border-b-gray-200">
		    <h3 className="flow-root text-base font-semibold">Categories</h3>
	  	    <ul className="text-[14px]">
	  	    	<li className="py-1 cursor-pointer hover:bg-gray-100/50 border-b border-b-gray-200">
	  		     Gadgets
	  		</li>
	  	    	<li className="py-1 cursor-pointer hover:bg-gray-100/50 border-b border-b-gray-200">
	  		     Computing
	  		</li>
	  	    	<li className="py-1 cursor-pointer hover:bg-gray-100/50 border-b border-b-gray-200">
	  		     Appliances
	  		</li>
	  	    	<li className="py-1 cursor-pointer hover:bg-gray-100/50 border-b border-b-gray-200">
	  		     Cosmetics
	  		</li>
	  	    	<li className="py-1 cursor-pointer hover:bg-gray-100/50">
	  		     Fashion
	  		</li>
	  	    </ul>
	  	</div>
<div className="pr-4 border-b border-gray-200">
		<h3 className="flow-root text-base font-semibold">Distace</h3>
                <label className="mb-3 block pb-6">
                  <select
                    className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-2 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    value={distance}
                    onChange={handleDistanceChange}
                  >
                    <option value={20}>20 km</option>
                    <option value={30}>30 km</option>
                    <option value={500}>500 km</option>
                  </select>
                </label>
</div>
<div className="pr-4 border-b border-gray-200 pr-4">
		<h3 className="flow-root text-base font-semibold">Price</h3>
                <div className="mb-3 flex items-center justify-between pb-6">
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <label>
                      <input
                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-2 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                        type="text"
                        name="minPrice"
                        value={minPrice}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div className="mx-3">-</div>
                  <div>
                    <label>
                      <input
                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-2 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                        type="text"
                        name="maxPrice"
                        value={maxPrice}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                </div>
</div>



                <div className="mt-8 mr-4 flex items-center justify-between">
                  <button
                    onClick={handleClearFilters}
                    className="text-gray-900 py-1 px-5 transition duration-300 rounded-md hover:bg-primaryColor hover:text-white border border-white hover:border-primaryColor"
                  >
                    CLEAR ALL
                  </button>

                  <button
                    type="button"
                    className="bg-transparent hover:border-transparent rounded border border-red-500 py-1 px-5 text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
                    onClick={handleApplyFilter}
                  >
                    APPLY
                  </button>
                </div>
              </form>











                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:py-4 lg:px-8">
          <nav className="hidden lg:block" aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 lg:max-w-7xl"
            >
              {product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
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
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.name}
                </a>
              </li>
            </ol>
          </nav>

          <div className="mx-auto max-w-2xl lg:max-w-7xl pt-2 md:pb-4 lg:pb-2 lg:max-w-8xl flex items-baseline justify-between border-b border-gray-200 pb-2">
            <p className="flex text-sm lg:text-md items-center">
              <span className="mr-6 text-gray-500">
                {filteredProducts?.data?.length} Ad[s]
              </span>
              <span className="flex items-center">
                <MapPinIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                {storedCity}
              </span>
            </p>
            <h1 className="text-[15px] lg:text-base md:font-semi-bold flex items-center justify-between tracking-tight text-gray-900">
              <select
                name="type"
                value={type}
                onChange={handleInputChange}
                className="h-full rounded-md border p-2"
              >
                <option value="">Everything</option>
                <option value="product">Products</option>
                <option value="grocery">Groceries</option>
              </select>
            </h1>

            <div className="fixed py-1 px-2 lg:py-0 lg:px-0 bottom-[53px] lg:bottom-0 left-[33%] lg:left-0 z-10 bg-white lg:relative flex items-center gap-3 lg:gap-0 rounded-full lg:rounded-0">
              <select
                name="sort"
                value={sort}
                onChange={handleInputChange}
                className="h-full rounded-full lg:rounded-md bg-white mr-2 lg:mr-0 lg:bg-white lg:border text-[13px] lg:text-base p-1 lg:p-2 text-gray-700"
              >
                <option value="">Sort</option>
                <option value="views">Most Popular</option>
                <option value="ratings">Rating</option>
                <option value="created_at">Newest Upload</option>
                <option value="price_lowest">Price: Low to High</option>
                <option value="price_highest">Price: High to Low</option>
              </select>
              {listView === "grid" ? (
                <button
                  onClick={() => setListView("list")}
                  type="button"
                  className="-m-2 border-l lg:border-0 border-l-gray-300 lg:ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View list</span>
                  <ListBulletIcon className="h-4 lg:h-5 w-4 lg:w-5" aria-hidden="true" />
                </button>
              ) : (
                <button
                  onClick={() => setListView("grid")}
                  type="button"
                  className="-m-2 border-l lg:border-0 border-l-gray-300 lg:ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-4 lg:h-5 w-4 lg:w-5" aria-hidden="true" />
                </button>
              )}
              <button
                type="button"
                className="-m-2 lg:ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-4 lg:h-5 w-4 lg:w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section
            aria-labelledby="products-heading"
            className="min-h-[100vh] pb-24"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="py-4 hidden lg:block border-r border-r-200">
	  	<div className="mb-3 pb-2 pr-4 border-b border-b-gray-200">
		    <h3 className="flow-root text-base font-semibold">Categories</h3>
	  	    <ul className="text-[14px]">
	  	    	<li className="py-1 cursor-pointer hover:bg-gray-100/50 border-b border-b-gray-200">
	  		     Gadgets
	  		</li>
	  	    	<li className="py-1 cursor-pointer hover:bg-gray-100/50 border-b border-b-gray-200">
	  		     Computing
	  		</li>
	  	    	<li className="py-1 cursor-pointer hover:bg-gray-100/50 border-b border-b-gray-200">
	  		     Appliances
	  		</li>
	  	    	<li className="py-1 cursor-pointer hover:bg-gray-100/50 border-b border-b-gray-200">
	  		     Cosmetics
	  		</li>
	  	    	<li className="py-1 cursor-pointer hover:bg-gray-100/50">
	  		     Fashion
	  		</li>
	  	    </ul>
	  	</div>
<div className="pr-4 border-b border-gray-200">
		<h3 className="flow-root text-base font-semibold">Distace</h3>
                <label className="mb-3 block pb-6">
                  <select
                    className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-2 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    value={distance}
                    onChange={handleDistanceChange}
                  >
                    <option value={20}>20 km</option>
                    <option value={30}>30 km</option>
                    <option value={500}>500 km</option>
                  </select>
                </label>
</div>
<div className="pr-4 border-b border-gray-200 pr-4">
		<h3 className="flow-root text-base font-semibold">Price</h3>
                <div className="mb-3 flex items-center justify-between pb-6">
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <label>
                      <input
                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-2 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                        type="text"
                        name="minPrice"
                        value={minPrice}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div className="mx-3">-</div>
                  <div>
                    <label>
                      <input
                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-2 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                        type="text"
                        name="maxPrice"
                        value={maxPrice}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                </div>
</div>


                {/* 
                <h3 className="mb-2 flow-root text-xl">Size</h3>
                <div className="border-b border-gray-200 pb-6">
                  <ul>
                    <li>
                      <input
                        className="mr-3"
                        type="checkbox"
                        name="small"
                        value="small"
                        onChange={handleInputChange}
                      />
                      <span>Small</span>
                    </li>
                    <li>
                      <input
                        className="mr-3"
                        type="checkbox"
                        name="small"
                        value="small"
                        onChange={handleInputChange}
                      />
                      <span>Medium</span>
                    </li>
                    <li>
                      <input
                        className="mr-3"
                        type="checkbox"
                        name="medium"
                        value="medium"
                        onChange={handleInputChange}
                      />
                      <span>Large</span>
                    </li>
                  </ul>
                </div> */}

                <div className="mt-8 mr-4 flex items-center justify-between">
                  <button
                    onClick={handleClearFilters}
                    className="text-gray-900 py-1 px-5 transition duration-300 rounded-md hover:bg-primaryColor hover:text-white border border-white hover:border-primaryColor"
                  >
                    CLEAR ALL
                  </button>

                  <button
                    type="button"
                    className="bg-transparent hover:border-transparent rounded border border-red-500 py-1 px-5 text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
                    onClick={handleApplyFilter}
                  >
                    APPLY
                  </button>
                </div>
              </form>

              {/* Product grid */}
              <div className="relative lg:col-span-3 pt-4">
                {loading && (
                  <div
                    style={{
                      zIndex: "5",
                      left: "0",
                      right: "0",
                      top: "0",
                      bottom: "0",
                    }}
                    className="absolute flex items-center justify-center"
                  >
                    <p>Loading...</p>
                  </div>
                )}

                {!loading && filteredProducts?.data?.length === 0 && (
                  <div
                    style={{
                      zIndex: "5",
                      left: "0",
                      right: "0",
                      top: "0",
                      bottom: "0",
                    }}
                    className="absolute flex items-center justify-center"
                  >
                    <p>
                      Your filter returned no products, you can try to widen
                      your search reach
                    </p>
                  </div>
                )}

                {/*----------*/}

                {/* Display the filtered products */}
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl lg:max-w-7xl">
                    <h2 className="sr-only">Products</h2>

                    <div
                      className={`grid ${listView === "grid"
                          ? "grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 "
                          : "grid-cols-1 gap-y-8"
                        }`}
                    >
                      {filteredProducts.data &&
                        filteredProducts.data.map((product) => (
                          <>
                            {product.type == "product" ? (
                              <Product product={product} listView={listView} />
                            ) : (
                              <Grocery product={product} listView={listView} />
                            )}
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*<Pagination />*/}

          {/*Temp pagination*/}
          {filteredProducts && filteredProducts.last_page > 1 && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`mr-2 rounded px-4 py-2 border ${currentPage === 1 ? "bg-gray-200 border-red-300" : "border-red-500"
                  }`}
              >
                &lt;
              </button>
              {[...Array(lastPage).keys()].map((page) => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={`mr-2 px-5 py-2 border ${currentPage === page + 1
                      ? "text white border-red-500 bg-red-400"
                      : "border-red-500"
                    } rounded`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className={`rounded px-4 py-2 border ${currentPage === lastPage ? "bg-gray-200 border-red-300" : "border-red-500"
                  }`}
              >
                &gt;
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
