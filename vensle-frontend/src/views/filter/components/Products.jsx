import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FunnelIcon,
  ArrowLeftIcon,
  MapPinIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/react/20/solid";

import Product from "components/front/product/Product";
import Grocery from "components/front/product/Grocery";
import Subcategories from "./Subcategories"

import dealAdImage from "assets/img/front/product-filter-deals/1.jpg"
import categoryImage from "assets/img/front/filter-header/category_garden.png"
import subcategoryImage from "assets/img/front/filter-header/subcategory_garden.png"



const baseURL = "https://nominet.vensle.com/backend";
const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  {/*TODO: put in useEffect*/}
  const searchTerm = queryParams.get("searchTerm") || "";
  const discount = queryParams.get("discount") || "";

  const initialDistance = queryParams.get("distance") || "";

  const userLocation = useSelector((state) => state.location);	

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // State for filter form inputs
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [subcategory_id, setSubcategory_id] = useState("");
  const [displayName, setDisplayName] = useState('');	


const product = {
  breadcrumbs: [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Search", href: "#" },
    { id: 2, name: searchTerm, href: "#" },
  ],
};
  //TODO: move downwards
/* useEffect(() => {
    const queryParameters = new URLSearchParams(location.search);
    const cat_id = queryParams.get("category_id") || "";
    const subcat_id  = queryParams.get("subcategory_id") || "";
    const navType = queryParams.get('nav_type') || "";
    setCategory_id(cat_id);
    setSubcategory_id(subcat_id);

// Sample categories data
const mockCategories = [
  {
    id: 1,
    name: "Electronics",
    subcategories: [
      { id: 1, name: "Civilian" },
      { id: 2, name: "womens fashion" },
      // ... other subcategories
    ],
  },
  {
    id: 3,
    name: "Computing",
    subcategories: [
      { id: 34, name: "Desktops & All-In-One Computers" },
      { id: 59, name: "Laptops & Netbooks" },
      // ... other subcategories
    ],
  },
  // ... other categories
];
	  

    if (navType === 'category' && cat_id) {
      const categoryId = Number(cat_id);

      const category = mockCategories.find(cat => cat.id === categoryId);
      if (category) {
        setDisplayName(category.name);
      }
    } else if (navType === 'subcategory' && cat_id && subcat_id) {
      const categoryId = Number(cat_id);
      const subcategoryId = Number(subcat_id);

      const category = mockCategories.find(cat => cat.id === categoryId);
      if (category) {
        const subcategory = category.subcategories.find(subcat => subcat.id === subcategoryId);
        if (subcategory) {
          setDisplayName(subcategory.name);
        }
      }
    }	  


  }, [location]);	*/

  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const [condition, setCondition] = useState("");
  const [listView, setListView] = useState("grid");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [loading, setLoading] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSubcategories, setActiveSubcategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState([]);
  const [isLeftVisible, setLeftVisible] = useState(true);
  const [categoryFiltersLoading, setCategoryFiltersLoading] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [subcategoryFiltersLoading, setSubcategoryFiltersLoading] = useState(false);
  const [subcategoryFilters, setSubcategoryFilters] = useState([]);
  const [viewingSubcategories, setViewingSubcategories] = useState(false);
  const [navTypeViewing, setNavTypeViewing] = useState('');


  const [distance, setDistance] = useState(initialDistance);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const handleDistanceChange = (event) => {
    const newDistance = parseInt(event.target.value, 10);
    setDistance(newDistance);
    //fetchProducts(userLocation, newDistance, userCountry);
  };

  const [filters, setFilters] = useState({
    ramSize: [],
    storageCapacity: [],
    size: [],
    color: [],
    skinType: [],
    fuelType: [],
    transmission: [],
    processorType: [],
    material: [],
    material2: [],
    fit: [],
    racketType: [],
    swimsuitType: [],
    HealthBeautyFormulationAndType: [],
    HealthBeautyType: [],
    HoldStrengthHealthBeauty: [],
    VolumeHealthBeauty: [],
    BodyPartHealthBeauty: [],
    VisionFrameMaterial: [],
    color_2: [],
    desktopType: [],
    storageType: [],
    screenSize: [],
    paperSize: [],
    electronicsBrand: [],	  
  });


  const resetCategoryState = () => {
	  setFilters({
	    ramSize: [],
	    storageCapacity: [],
	    size: [],
	    color: [],
	    skinType: [],
	    fuelType: [],
	    transmission: [],
	    processorType: [],
	    material: [],
	    material2: [],
	    fit: [],
	    racketType: [],
	    swimsuitType: [],
	    HealthBeautyFormulationAndType: [],
	    HealthBeautyType: [],
	    HoldStrengthHealthBeauty: [],
	    VolumeHealthBeauty: [],
	    BodyPartHealthBeauty: [],
	    VisionFrameMaterial: [],
	    color_2: [],
	    desktopType: [],
	    storageType: [],
	    screenSize: [],
	    paperSize: [],
	    electronicsBrand: [],		  
	  })
  }

  const handleNewInputChange = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prevFilters) => {
      // Clone previous state to avoid mutation
      const updatedFilters = { ...prevFilters };

      // Update selected items based on checkbox checked status
      if (checked) {
        updatedFilters[name] = [...updatedFilters[name], value];
      } else {
        updatedFilters[name] = updatedFilters[name].filter((item) => item !== value);
      }

      return updatedFilters;
    });
  };

  const camelToTitleCase = (camelCaseStr) => {
    return camelCaseStr
      .replace(/([A-Z])/g, ' $1')  // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase());  // Capitalize the first letter
  };


  const handleSetCategory = (category) => {
	resetCategoryState()

	setCategory_id(category.id)
	setActiveCategory(category)
	setActiveSubcategories(category.subcategories)
	setLeftVisible(!isLeftVisible)
	getFiltersForCategory(category.id);
	setViewingSubcategories(true)
	setSubcategoryFilters([])
	setNavTypeViewing('')
  }

  const handleSetSubcategory = (subcategory) => {
	setCategoryFilters([])
	setSubcategory_id(subcategory.id)	  
	getFiltersForSubcategory(subcategory.id);
	setNavTypeViewing('')
  }

  const handleBackToCategories = () => {
        setLeftVisible(true)
	setActiveSubcategories('')
	setActiveCategory('')
	setViewingSubcategories(false)
	setSubcategory_id("")
  }

 const removeCategoryFilter = () => {
	 setCategory_id("")
	 setCategoryFilters([])
	 setLeftVisible(true)

	setActiveCategory('')
	setViewingSubcategories(false)
	setActiveSubcategories('')
 }

 const removeSubcategoryFilter = () => {
	 setSubcategory_id("")
	 setSubcategoryFilters([])
	 setLeftVisible(true)
 }


    const getFiltersForCategory= async (id) => {
        setCategoryFiltersLoading(true)
        try {
                const response = await axios.get(
                        `${baseURL}/api/v1/category/${id}/product-filters`
                );
         	setCategoryFilters(response.data);
        	setCategoryFiltersLoading(false)
        } catch (error) {
                console.error("Error fetching categories filter", error);
        	setCategoryFiltersLoading(false)
        }
    };

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
        case "condition":
          setCondition(value);
          break;
        default:
          break;
      }
    }
  };

  const handleApplyFilter = () => {
    // Make API call with filter parameters
    fetchFilteredProducts();
    setMobileFiltersOpen(false)
  };

const resetFilters = () => {
    setDistance(20); 
    setMinPrice("");
    setMaxPrice("");
    setType("");
    setSort("");
    setCondition("");
    setSelectedSizes([]);
    setCurrentPage(1);
	resetCategoryState()
	setCategory_id('')
	setActiveCategory('')
	setActiveSubcategories('')
	setLeftVisible(true)
	//getFiltersForCategory('');
	setViewingSubcategories(false)
	setSubcategoryFilters([])
	setCategoryFilters([])
	setSubcategory_id('')	  
	setMobileFiltersOpen(false)
}

  const handleClearFilters = (e) => {
    e.preventDefault();
    resetFilters();
  };

 useEffect(() => {
    resetFilters();
 }, [location])

  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/api/v1/products/filter`, {
        params: {
          page: currentPage,
          searchTerm,
          category_id,
          subcategory_id,
          minPrice,
          maxPrice,
          distance,
          lat: userLocation.lat,
          lng: userLocation.lng,
          country: userLocation.country,
          type,
          sort,
	  condition,
          sizes: selectedSizes.join(","), // Convert array to comma-separated string
	  ...filters,
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
    subcategory_id,
    minPrice,
    maxPrice,
    distance,
    userLocation,
    type,
    sort,
    condition,
    selectedSizes,
    filters,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchTerm]);  
  	
  useEffect(() => {
    const fetchCategories = async () => {
      try {
	setCategoriesLoading(true)
        const response = await fetch(`${baseURL}/api/v1/categories`);
        const data = await response.json();
        const categories = data.categories
        setCategories(categories);


    const queryParameters = new URLSearchParams(location.search);
    const cat_id = queryParams.get("category_id") || "";
    const subcat_id  = queryParams.get("subcategory_id") || "";
    const navType = queryParams.get('nav_type') || "";
    setCategory_id(cat_id);
    setSubcategory_id(subcat_id);
console.log('my type', navType)

    if (navType === 'category' && !subcat_id && cat_id) {
      const categoryId = Number(cat_id);

      const category = categories.find(cat => cat.id === categoryId);
      setSubcategories(category.subcategories)
      if (category) {
        setDisplayName(category.name);
	setNavTypeViewing('category')
      }
    } else if (navType === 'subcategory' && cat_id && subcat_id) {
      const categoryId = Number(cat_id);
      const subcategoryId = Number(subcat_id);

      const category = categories.find(cat => cat.id === categoryId);
      if (category) {
        const subcategory = category.subcategories.find(subcat => subcat.id === subcategoryId);
        if (subcategory) {
          setDisplayName(subcategory.name);
          setNavTypeViewing('subcategory')
        }
      }
    }else {
	  setNavTypeViewing("")
    }

	setCategoriesLoading(false)
      } catch (error) {
        console.error("Error fetching categories:", error);
	setCategoriesLoading(false)
      }
    };

    fetchCategories();
  }, [location]);


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
	  
	  	<div className="mb-3 pr-4 border-b border-b-gray-200">
		    <h3 className="flex items-center text-base font-semibold">
	  		{viewingSubcategories && <ArrowLeftIcon
	  			onClick={handleBackToCategories}
	  			className="mr-2 p-[2px] h-5 w-5 rounded-full hover:bg-gray-200 cursor-pointer transition duration-300"
	  		    />}
	  		{activeCategory ? activeCategory.name : "Categories"}
	  	    </h3>
	  	    <div className="flex h-full w-full h-[11rem] overflow-x-hidden overflow-y-auto">
			    <ul className={`text-[14px] flex h-full w-full shrink-0 transform flex-col transition-transform duration-300 translate-x-0  ${isLeftVisible
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                                    }`}>
				{categoriesLoading && <li>Loading...</li>}
				{categories.length > 0 && categories.map((category) => 
				    <li
					onClick={()=>handleSetCategory(category)}
					key={category.id}
					className="py-1 cursor-pointer hover:bg-gray-100/50 border-b border-b-gray-200 last:border-b-0"
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
					className={`py-1 cursor-pointer hover:bg-gray-100/50 border-b border-b-gray-200 last:border-b-0 ${subcategory.id ===subcategory_id && "bg-gray-100"}`}
				    >
					{subcategory.name}
				    </li>
				)}
	  		    </ul>
	  	    </div>
	  	</div>


{subcategoryFilters.length > 0 ? (<div className="mb-3 pb-2 pr-4 border-b border-b-gray-200">
	  <div className="relative">
		{subcategoryFilters.map((subcategoryFilter)=> {
			const valuesArray = subcategoryFilter.value.split(',');
			return(
			    <div className="pb-2 mb-2 border-b border-b-gray-200 last:border-b-0">
				    <h3 className="flow-root mb-1 text-base font-semibold">
				          {subcategoryFilter.name}
				    </h3>
				    <div className="h-20 overflow-y-auto">
				       {valuesArray.map((value, index) => (
					  <label className="flex mb-[2px] text-[14px] items-center" key={index}>
						<input
						    type='checkbox'
						    value={value}
					            name={subcategoryFilter.name}
                    				    onChange={handleNewInputChange}
						    className="mr-2 focus-ring border border-gray-300 focus:ring-ADashPrimary h-4 w-4"
						/>
						{value}
					  </label>
				       ))}
			    	    </div>
			    </div>
			)
		})}
	</div>

	
</div>) : (categoryFilters.length > 0 && <div className="mb-3 pb-2 pr-4 border-b border-b-gray-200">

          <div className="relative">
                {categoryFilters.map((categoryFilter)=> {
                        const valuesArray = categoryFilter.value.split(',');
                        return(
                            <div className="pb-2 mb-2 border-b border-b-gray-200 last:border-b-0">
                                    <h3 className="flow-root mb-1 text-base font-semibold">
                                          {camelToTitleCase(categoryFilter.name)}
                                    </h3>
                                    <div className="max-h-20 overflow-y-auto">
                                       {valuesArray.map((value, index) => (
                                          <label className="flex mb-[2px] text-[14px] items-center" key={index}>
                                                <input
                                                    type='checkbox'
                                                    value={value}
					            name={categoryFilter.name}
                    				    onChange={handleNewInputChange}
                                                    className="mr-2 focus-ring border border-gray-300 focus:ring-ADashPrimary h-4 w-4"
                                                />
                                                {value}
                                          </label>
                                       ))}
                                    </div>
                            </div>
                        )
                })}
        </div>
</div>)}
	  


<div className="pr-4 border-b border-gray-200 mb-3">
		<h3 className="flow-root text-base font-semibold">Distace</h3>
                <label className="block pb-4">
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
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <label>
                      <input
                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-2 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 placeholder-gray-700"
                        type="text"
                        name="minPrice"
			placeholder="Min"
                        value={minPrice}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div className="mx-3">-</div>
                  <div>
                    <label>
                      <input
                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-2 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 placeholder-gray-700"
                        type="text"
                        name="maxPrice"
                        value={maxPrice}
			placeholder="Max"
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                </div>
</div>

<div className="pr-4 border-b border-gray-200 pr-4">
		<h3 className="flow-root text-base font-semibold">Condition</h3>
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center">
                    <label>
                      <input
                        type="radio"
			name="condition"
                      />
		      New
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
			name="condition"
                      />
		      Used
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
			name="condition"
                      />
		      Not available
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

        <main className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:py-4 lg:pt-3 lg:px-8">
          <nav className="hidden lg:block" aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 lg:max-w-7xl"
            >
              {product.breadcrumbs.map((breadcrumb) => (
	      breadcrumb.name && (
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
	      )
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
{discount && <div className="mt-4 mb-6">
	  <img src={dealAdImage} alt="deal ad" className="w-full" />
</div>}


	  <div className="mb-1 mt-2 mx-auto max-w-2xl lg:max-w-7xl lg:max-w-8xl">
	{console.log('nviw',navTypeViewing)}
{displayName && (navTypeViewing === 'category' || navTypeViewing === 'subcategory') && <div className="">
    <h3 className="text-2xl font-semibold">{displayName}</h3>
    {navTypeViewing === 'category' && <img
	className="mt-1 mb-2"
	src={categoryImage}
	alt="category banner"
    />}
</div>}
	      {navTypeViewing !== "category" && navTypeViewing !== "subcategory" && <div className="flex gap-2 lg:gap-4 flex-wrap">
		  {/*TODO: put in component*/}
		  {category_id && <p className="flex items-center text-sm pl-3 pr-2 py-[0.1rem] border border-gray-300 rounded-full">
			  Category: {category_id}
			  <XMarkIcon onClick={removeCategoryFilter} className="w-4 h-4 ml-2 p-[1px] cursor-pointer rounded-full transition duration-300 hover:bg-black hover:text-white" />
		  </p>}	  
		  {subcategory_id && <p className="flex items-center text-sm pl-3 pr-2 py-[0.1rem] border border-gray-300 rounded-full">
			    Subcategory: {subcategory_id}
			  <XMarkIcon onClick={removeSubcategoryFilter} className="w-4 h-4 ml-2 p-[1px] cursor-pointer rounded-full transition duration-300 hover:bg-black hover:text-white" />
		  </p>}	  
		  {distance != 20 && distance !== '' && <p className="flex items-center text-sm pl-3 pr-2 py-[0.1rem] border border-gray-300 rounded-full">
			  {distance}
			  <XMarkIcon onClick={()=>setDistance(20)} className="w-4 h-4 ml-2 p-[1px] cursor-pointer rounded-full transition duration-300 hover:bg-black hover:text-white" />
		  </p>}	  
		  {type && <p className="flex items-center text-sm pl-3 pr-2 py-[0.1rem] border border-gray-300 rounded-full">
			  {type}
			  <XMarkIcon onClick={()=>setType("")} className="w-4 h-4 ml-2 p-[1px] cursor-pointer rounded-full transition duration-300 hover:bg-black hover:text-white" />
		  </p>}	  
		  {sort && <p className="flex items-center text-sm pl-3 pr-2 py-[0.1rem] border border-gray-300 rounded-full">
			  {sort}
			  <XMarkIcon onClick={()=>setSort("")} className="w-4 h-4 ml-2 p-[1px] cursor-pointer rounded-full transition duration-300 hover:bg-black hover:text-white" />
		  </p>}	  
		  {minPrice && <p className="flex items-center text-sm pl-3 pr-2 py-[0.1rem] border border-gray-300 rounded-full">
			  {minPrice}
			  <XMarkIcon onClick={()=>setMinPrice("")} className="w-4 h-4 ml-2 p-[1px] cursor-pointer rounded-full transition duration-300 hover:bg-black hover:text-white" />
		  </p>}	  
		  {maxPrice && <p className="flex items-center text-sm pl-3 pr-2 py-[0.1rem] border border-gray-300 rounded-full">
			  {maxPrice}
			  <XMarkIcon onClick={()=>setMaxPrice("")} className="w-4 h-4 ml-2 p-[1px] cursor-pointer rounded-full transition duration-300 hover:bg-black hover:text-white" />
		  </p>}
	      </div>}

	  </div>
          <div className="mx-auto max-w-2xl lg:max-w-7xl md:pb-4 lg:pb-2 lg:max-w-8xl flex items-baseline justify-between border-b border-gray-200 pb-2">
            <p className="flex text-sm lg:text-md items-center">
              <span className="mr-6 text-gray-500">
                {filteredProducts?.data?.length} Ad[s]
              </span>
              <span className="flex items-center">
                <MapPinIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                {userLocation.city}
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

            <div className="fixed left-1/2 transform -translate-x-1/2 md:static md:transform-none py-1 px-2 lg:py-0 lg:px-0 bottom-[65px] lg:bottom-0 lg:left-0 z-[2] bg-white lg:relative flex items-center gap-3 lg:gap-0 rounded-full md:rounded-md lg:rounded-0 border-0 md:border border-gray-200 lg:border-0 shadow-md md:shadow-none">
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
                  className="-m-2 md:ml-0 border-l lg:border-0 border-l-gray-300 lg:ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
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
                <FunnelIcon className="h-4 lg:h-5 w-4 lg:w-5 mr-2" aria-hidden="true" />
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


	  	<div className="mb-3 pr-4 border-b border-b-gray-200">
		    <h3 className="flex items-center text-base font-semibold">
	  		{viewingSubcategories && <ArrowLeftIcon
	  			onClick={handleBackToCategories}
	  			className="mr-2 p-[2px] h-5 w-5 rounded-full hover:bg-gray-200 cursor-pointer transition duration-300"
	  		    />}
	  		{activeCategory ? activeCategory.name : "Categories"}
	  	    </h3>
	  	    <div className="flex h-full w-full h-[11rem] overflow-x-hidden overflow-y-auto">
			    <ul className={`text-[14px] flex h-full w-full shrink-0 transform flex-col transition-transform duration-300 translate-x-0  ${isLeftVisible
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                                    }`}>
				{categoriesLoading && <li>Loading...</li>}
				{categories.length > 0 && categories.map((category) => 
				    <li
					onClick={()=>handleSetCategory(category)}
					key={category.id}
					className="py-1 cursor-pointer hover:bg-gray-100/50 border-b border-b-gray-200 last:border-b-0"
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
					className={`py-1 cursor-pointer hover:bg-gray-100/50 border-b border-b-gray-200 last:border-b-0 ${subcategory.id ===subcategory_id && "bg-gray-100"}`}
				    >
					{subcategory.name}
				    </li>
				)}
	  		    </ul>
	  	    </div>
	  	</div>


{subcategoryFilters.length > 0 ? (<div className="mb-3 pb-2 pr-4 border-b border-b-gray-200">
	  <div className="relative">
		{subcategoryFilters.map((subcategoryFilter)=> {
			const valuesArray = subcategoryFilter.value.split(',');
			return(
			    <div className="pb-2 mb-2 border-b border-b-gray-200 last:border-b-0">
				    <h3 className="flow-root mb-1 text-base font-semibold">
				          {subcategoryFilter.name}
				    </h3>
				    <div className="h-20 overflow-y-auto">
				       {valuesArray.map((value, index) => (
					  <label className="flex mb-[2px] text-[14px] items-center" key={index}>
						<input
						    type='checkbox'
						    value={value}
					            name={subcategoryFilter.name}
                    				    onChange={handleNewInputChange}
						    className="mr-2 focus-ring border border-gray-300 focus:ring-ADashPrimary h-4 w-4"
						/>
						{value}
					  </label>
				       ))}
			    	    </div>
			    </div>
			)
		})}
	</div>

	
</div>) : (categoryFilters.length > 0 && <div className="mb-3 pb-2 pr-4 border-b border-b-gray-200">

          <div className="relative">
                {categoryFilters.map((categoryFilter)=> {
                        const valuesArray = categoryFilter.value.split(',');
                        return(
                            <div className="pb-2 mb-2 border-b border-b-gray-200 last:border-b-0">
                                    <h3 className="flow-root mb-1 text-base font-semibold">
                                          {camelToTitleCase(categoryFilter.name)}
                                    </h3>
                                    <div className="max-h-20 overflow-y-auto">
                                       {valuesArray.map((value, index) => (
                                          <label className="flex mb-[2px] text-[14px] items-center" key={index}>
                                                <input
                                                    type='checkbox'
                                                    value={value}
					            name={categoryFilter.name}
                    				    onChange={handleNewInputChange}
                                                    className="mr-2 focus-ring border border-gray-300 focus:ring-ADashPrimary h-4 w-4"
                                                />
                                                {value}
                                          </label>
                                       ))}
                                    </div>
                            </div>
                        )
                })}
        </div>
</div>)}
	  


<div className="pr-4 border-b border-gray-200 mb-3">
		<h3 className="flow-root text-base font-semibold">Distace</h3>
                <label className="block pb-4">
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
<div className="pr-4 border-b border-gray-200 mb-3">
		<h3 className="flow-root text-base font-semibold">Price</h3>
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <label>
                      <input
                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-2 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 placeholder-gray-700"
                        type="text"
                        name="minPrice"
			placeholder="Min"
                        value={minPrice}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div className="mx-3">-</div>
                  <div>
                    <label>
                      <input
                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-50 py-2 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 placeholder-gray-700"
                        type="text"
                        name="maxPrice"
                        value={maxPrice}
			placeholder="Max"
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                </div>
</div>

<div className="pr-4 border-b border-gray-200">
		<h3 className="flow-root text-base mb-1 font-semibold">Condition</h3>
                <div className="flex items-center pb-4">
                  <div className="flex items-center">
                    <label className="mr-3">
                      <input
                        type="radio"
			name="condition"
                        value="new"
			checked={condition === 'new'}
                        onChange={handleInputChange}
			className="mr-1"
                      />
		      New
                    </label>
                  </div>
                  <div>
                    <label className="mr-3">
                      <input
                        type="radio"
			name="condition"
			className="mr-1"
                        value="used"
			checked={condition === 'used'}
                        onChange={handleInputChange}
                      />
		      Used
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
			name="condition"
			className="mr-1"
                        value="na"
			checked={condition === 'used'}
                        onChange={handleInputChange}
                      />
		      Not Available
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

              {/* Product grid */}
              <div className="relative lg:col-span-3 pt-4">
                {loading && (
                  <div className="absolute bg-white bg-opacity-70 inset-0 z-[3] flex items-center justify-center">
                    <p className="mt-[20vh] lg:mt-0">
                    	Loading...
		    </p>
                  </div>
                )}

                {!loading && filteredProducts?.data?.length === 0 && (
                  <div className="absolute inset-0 z-[1] flex items-center justify-center">
		    {navTypeViewing === "category" || navTypeViewing === "subcategory" ? <p className="mt-[20vh] lg:mt-[10rem]">
                      There are no products in this category
                    </p>
		    :
                    <p className="mt-[20vh] lg:mt-0">
                      Your filter returned no products, you can try to widen
                      your search reach
                    </p>}
                  </div>
                )}

                {/*----------*/}

                {/* Display the filtered products */}
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl lg:max-w-7xl">
                    <h2 className="sr-only">Products</h2>

	{subcategories && navTypeViewing === 'category' && <Subcategories loading={categoriesLoading} subcategories={subcategories} />}

    {navTypeViewing === 'subcategory' && <img
	className="mt-1 mb-6"
	src={subcategoryImage}
	alt="subcategory banner"
    />}
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
