import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import debounce from 'lodash.debounce';
import {
  ArrowLeftIcon,
  ArrowUpLeftIcon,
} from "@heroicons/react/20/solid";

import MyComponent from "./MyComponent";

const baseURL = "https://nominet.vensle.com/backend";
const Search = ({ position = 'sticky' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedLocation = JSON.parse(localStorage.getItem("userLocation")) || {
    lat: 0,
    lng: 0,
  };
  const storedCountry = localStorage.getItem("userCountry") || "Unknown";
  const storedCity = localStorage.getItem("userCity");

  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    queryParams.get("searchTerm") || ""
  );


  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userLocation, setUserLocation] = useState({
    lat: storedLocation.lat,
    lng: storedLocation.lng,
  });
  const [categories, setCategories] = useState("");
  const [distance, setDistance] = useState(20);
  const [userCountry, setUserCountry] = useState(storedCountry);
  const [previousSearchTerm, setPreviousSearchTerm] = useState(storedCountry);
  const [previousSearchResult, setPreviousSearchResult] = useState(storedCountry);

  const [address, setAddress] = useState('');
  const [center, setCenter] = useState({ lat: userLocation.lat, lng: userLocation.lng });
  const [map, setMap] = React.useState(null)

  const [zoom, setZoom] = useState(10);

  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Load recent searches from localStorage on component mount
    const savedRecentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedRecentSearches);
  }, []);

  const filterRecent = () => {
    // Filter recentSearches based on searchTerm
    return recentSearches.filter(search =>
      search.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 3); // Return top 3 matches
  };	

  const handleRemoveSearch = (e, searchToRemove) => {
    e.stopPropagation();
    // Remove search term from recentSearches in localStorage
    const updatedRecentSearches = recentSearches.filter(search => search !== searchToRemove);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
    setRecentSearches(updatedRecentSearches);
  };	

  const searchBoxInsertSuggestion = (e, word) => {
    e.stopPropagation();
    setSearchTerm(word);
  };	

  const handleDistanceChange = (event) => {
    const newDistance = parseInt(event.target.value, 10);
    setDistance(newDistance);

    let newZoom;
    if (newDistance * 1000 <= 10000) {
      newZoom = 12;
    } else if (newDistance <= 20000) {
      newZoom = 10;
    } else {
      newZoom = 8;
    }
    setZoom(newZoom);

  };

  const handleChangeDistanceWithMap = (e) => {
    e.preventDefault();
    setShowDropdown(false);
  }

  let timer = null;
	
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setLoading(true);

    if (timer) {
        clearTimeout(timer);
    }	  

    // Set a new timer to make the request after 500ms of user inactivity
    timer = setTimeout(async () => {	  
	    try {
	      setLoading(true);
	      //TODO: temp distance
	      const response = await axios.get(`${baseURL}/api/v1/products/filter`, {
		params: {
		  searchTerm: value,
		  category_id: selectedCategory,
		  distance,
		  country: userCountry,
		  lat: userLocation.lat,
		  lng: userLocation.lng,
		},
	      });

	      const fetchedSuggestions = response.data.data;


	      if (fetchedSuggestions.length > 0) {
		setPreviousSearchResult(fetchedSuggestions)
		setPreviousSearchTerm(value)
		setSuggestions(fetchedSuggestions);
	      } else {
		setSuggestions(previousSearchResult)
	      }



	      setSelectedSuggestionIndex(-1);
	      } catch (error) {
		    console.error('Error fetching suggestions:', error);
	      } finally {
		    setLoading(false); // Stop loading after request completes
	      }
     }, 500);

  };

  const handleSelectSuggestion = (selectedSuggestion) => {
    setSearchTerm(selectedSuggestion.name);

    const encodedSearchTerm = encodeURIComponent(selectedSuggestion.name);
    navigate(
      `/filter?searchTerm=${encodedSearchTerm}&category_id=${selectedCategory}&distance=${distance}`
    );

    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && selectedSuggestionIndex !== -1) {
      handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };


  const setLocationRef = useRef(null);
  useEffect(() => {
    // Function to handle clicks outside the div
    const handleClickOutsideLocationDiv = (event) => {
      if (setLocationRef.current && !setLocationRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Event listener for clicks outside the div
    document.addEventListener('mousedown', handleClickOutsideLocationDiv);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideLocationDiv);
    };
  }, []);

  const handleOutsideClick = (e) => {
    const isClickInsideInput =
      inputRef.current && inputRef.current.contains(e.target);
    const isClickInsideSuggestions = e.target.closest(".suggestions-list");

    if (!isClickInsideInput && !isClickInsideSuggestions) {
      //setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  const handleNewSearchButtonClick = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === '') return;

    // Add current searchTerm to recentSearches in localStorage
    const updatedRecentSearches = [...recentSearches];
    updatedRecentSearches.unshift(searchTerm); // Add at the beginning
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
    setRecentSearches(updatedRecentSearches);
  };

  const handleSearchButtonClick = (e) => {
    e.preventDefault();

    const encodedSearchTerm = encodeURIComponent(searchTerm);

    //TODO:  &distance=20
    if (encodedSearchTerm.trim() !== '') {

	    
    // Check if searchTerm already exists in recentSearches
    if (!recentSearches.includes(searchTerm)) {
      // Add current searchTerm to recentSearches in localStorage
      const updatedRecentSearches = [searchTerm, ...recentSearches.slice(0, 9)]; // Limit to 10 recent searches
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
      setRecentSearches(updatedRecentSearches);
    }


      navigate(
        `/filter?searchTerm=${encodedSearchTerm}&category_id=${selectedCategory}&distance=${distance}`
      );

      //setSearchTerm('');

      //TODO: Temp solution
      //if (window.location.pathname === '/') {
        //window.location.reload();
      //}
      setSuggestions([])
    } else {
      console.error('Search term is empty.');
    }

  };

  useEffect(() => {
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
    setSelectedSuggestionIndex(-1);
  }, [suggestions]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

//TODO:Store in .env
  const fetchGeocode = async (address) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address,
          key: 'AIzaSyBYcfW7ae2_1VSTj_F4V3opH_fD8YCADSk'
        }
      });

      const results = response.data.results;

      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setCenter({ lat, lng });
        map.panTo({ lat, lng });
      } else {
        console.error('No results found');
      }

    } catch (error) {
      console.error('Error fetching geocode:', error);
    }
  };

  const debouncedFetchGeocode = useCallback(debounce(fetchGeocode, 300), []);

  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    debouncedFetchGeocode(newAddress);
  };

  return (
    <form
      style={{ zIndex: "2" }}
      className={`relative mb-0 flex h-10 w-auto items-center md:h-[51px] md:px-0 lg:flex-1 ${position === 'relative' ? "mt-4 lg:mt-0 lg:mx-[2%]" : "mt-0"
        }`}
      onSubmit={handleSearchButtonClick}
    >

      {/*<select
        style={{ fontSize: "14px" }}
        className="hidden h-full border pl-1 lg:block"
        value={distance}
        onChange={handleDistanceChange}
      >
        <option value={10}>10 km</option>
        <option value={20}>20 km</option>
        <option value={30}>30 km</option>
      </select>*/}
      {position === 'relative' &&
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="hidden w-[7.5rem] h-full border border-r-0 p-2 lg:block"
        >
          <option value="">Everything</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      }

      {/*place in component*/}
      {showDropdown && (
        <ul ref={setLocationRef} className={`w-full z-[11] suggestions-list right-0 left-0 mt-1 lg:mt-0 bg-white ${
	    position === 'sticky' ? "fixed lg:absolute top-[38px] lg:top-[47px] lg:border lg:border-t-0 bottom-0 lg:bottom-auto py-3 px-6" : "absolute p-3 top-[33px] lg:top-[3.2rem] border border-t-0"
	}`}>
	      <div>
		  {loading && <li className="absolute inset-0 w-full flex justify-center items-center bg-white/50 text-center">Loading...</li>}

	      <div
		className="mb-4 lg:mb-1 inline-flex items-center cursor-pointer text-sm font-medium transition-all duration-300 ease-in-out hover:text-gray-700"
	      >
		<ArrowLeftIcon onClick={() =>setShowDropdown(false)} className="h-4 w-4 mr-1" />
	      </div>

		  <p className="text-gray-400 text-xs lg:text-sm">Location</p>
		  <input
		    type="text"
		    value={address}
		    onChange={handleAddressChange}
		    className="py-2 px-3 mt-1 w-full text-[15px] border border-gray-200 rounded-sm"
		    placeholder="Search Location"
		  />
		  <select
		    className="w-full border border-gray-200 rounded-sm flex items-center text-[15px] justify-center gap-x-2.5 p-3 mt-2 text-gray-400 hover:bg-gray-100"
		    value={distance}
		    onChange={handleDistanceChange}
		  >
		    <option selected value={20}>Radius</option>
		    <option value={10}>10 km</option>
		    <option value={20}>20 km</option>
		    <option value={30}>30 km</option>
		  </select>
		  <div>


		  </div>
		  <div className="bg-gray-200 mt-4 w-full h-[15rem] flex justify-center items-center">
		    <MyComponent
		      lat={userLocation.lat}
		      lng={userLocation.lng}
		      distance={distance}
		      zoom={zoom}
		      center={center}
		      setMap={setMap}
		      map={map}
		    />
		  </div>
		  <div className="flex justify-end">
		    <button onClick={handleChangeDistanceWithMap} className="bg-primaryColor mt-4 py-[0.5rem] px-12 rounded-md text-white uppercase hover:bg-red-500">
		      Apply
		    </button>
		  </div>
	      </div>
        </ul>
      )}
      <input
        className={`h-[34px] lg:rounded-none md:h-full text-[13px] md:text-base flex-1 border ${position === 'relative' ? "border-r-0 lg:border-l-0 pl-[20px]" : "pl-4 rounded-md"
          }`}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search products, brands and categories"
        ref={inputRef}
      />
      {searchTerm && <span onClick={() => setSearchTerm("")} className={`z-[2] absolute ${
	position === "sticky" ? "right-[10px]" : "right-[40px] lg:right-28"
      }`}>
        <XMarkIcon className="h-7 w-7 cursor-pointer rounded-full p-1 hover:bg-gray-200 transition-all ease-in-out duration-300" aria-hidden="true" />
      </span>}

      {searchTerm && suggestions.length > 0 && (
        <ul
          className={`w-full suggestions-list right-0 left-0 z-10 mt-1 border border-t-0 bg-white ${
	    position === 'sticky' ? "py-3 px-6 lg:px-0 fixed lg:absolute top-[38px] lg:top-[47px] lg:border lg:border-t-0 bottom-0 lg:bottom-auto" : "absolute top-[33px] lg:top-[3.2rem] border border-t-0"
	  }`}
        >

	      <div>
		  <div className={`${
			position === 'sticky' ? "mr-2 flex justify-between lg:block lg:text-right":"mt-2 text-right mr-6"
		  }`}>
		      {position === "sticky" && <div
			onClick={() => setSearchTerm("")}
			className="mb-4 lg:hidden inline-flex items-center cursor-pointer text-sm font-medium transition-all duration-300 ease-in-out hover:text-gray-700"
		      >
			<ArrowLeftIcon className="h-4 w-4 mr-1" />
			Back
		      </div>}
		    <span
		      onClick={() => setShowDropdown(true)}
		      className="text-sm underline text-primaryColor cursor-pointer"
		    >
		      Update Location
		    </span>
		  </div>


      {searchTerm && filterRecent().map((search, index) => (
	    <li
	      key={index}
	      onClick={() => handleSelectSuggestion({name: search})}
	      className="flex relative justify-between cursor-pointer text-sm px-2 mb-1 py-1 hover:bg-gray-200"
	    >
		 <p className="line-clamp-1">
                    {search}
	         </p>
        	 <XMarkIcon
	      	     onClick={(e) => handleRemoveSearch(e, search)}
		     className="h-5 w-5 mr-6 cursor-pointer rounded-full p-1 hover:bg-gray-300 transition-all ease-in-out duration-300"
	      	     aria-hidden="true"
	      	 />
  		      <ArrowUpLeftIcon
			  onClick={(e) => searchBoxInsertSuggestion(e, search)}
			  style={{right: "9px", top: "4px"}}
			  className="absolute z-[1] w-5 h-5 rounded-full p-1 hover:bg-gray-300 transition-all ease-in-out duration-300"
		      />
	    </li>
        ))}

		  {suggestions && Array.isArray(suggestions) && suggestions.length > 0 && suggestions.map((suggestion, index) => (
		    <li
		      key={index}
		      onClick={() => handleSelectSuggestion(suggestion)}
		      className={`cursor-pointer relative line-clamp-1 text-sm py-1 px-2 mb-1 hover:bg-gray-200 ${
			      selectedSuggestionIndex === index ? "bg-gray-200" : ""
			}`}
		    >
		      {suggestion.name}
  		      <ArrowUpLeftIcon
			  onClick={(e) => searchBoxInsertSuggestion(e, suggestion.name)}
			  style={{right: "9px", top: "4px"}}
			  className="absolute z-[1] w-5 h-5 rounded-full p-1 hover:bg-gray-300 transition-all ease-in-out duration-300"
		      />
		    </li>
		  ))}
		  <li className="grid grid-cols-2 gap-4 divide-x divide-gray-900/5 bg-gray-50 py-4 px-2 lg:hidden">
		    <select
		      className="flex items-center text-[13px] justify-center rounded-md gap-x-2.5 px-3 py-1 text-gray-900 hover:bg-gray-100"
		      value={distance}
		      onChange={handleDistanceChange}
		    >
		      <option value={10}>10 km</option>
		      <option value={20}>20 km</option>
		      <option value={30}>30 km</option>
		    </select>

		    <select
		      value={selectedCategory}
		      onChange={handleCategoryChange}
		      className="flex items-center justify-center rounded-md gap-x-2.5 px-3 py-1 text-gray-900 hover:bg-gray-100"
		    >
		      <option value="">Everything</option>
		      {categories &&
			categories.map((category) => (
			  <option key={category.id} value={category.id}>
			    {category.name}
			  </option>
			))}
		    </select>
		  </li>
	      </div>

        </ul>
      )}

      {position === 'relative' &&
        <>
          <button
            className="search__button relative pr-[22px] pl-[22px] hidden h-full text-white md:block"
            type="submit"
          >
            <span className="relative" style={{ zIndex: 2 }}>SEARCH</span>
          </button>
          <button
            className="block h-[34px] md:h-full px-2 text-white md:hidden md:px-[22px]"
            style={{ background: "#ff5959" }}
            type="submit"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </>
      }
    </form>
  );
};

export default Search;
