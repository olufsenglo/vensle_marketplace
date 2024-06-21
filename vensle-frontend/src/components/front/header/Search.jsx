import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const baseURL = "https://nominet.vensle.com/backend";
const Search = ({ position = 'sticky' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchTerm, setSearchTerm] = useState(
    queryParams.get("searchTerm") || ""
  );
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  const [categories, setCategories] = useState("");
  const [distance, setDistance] = useState(20);

  const handleDistanceChange = (event) => {
    const newDistance = parseInt(event.target.value, 10);
    setDistance(newDistance);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setLoading(false);
    try {
      setLoading(true);
      //TODO: add distance
      const response = await axios.get(`${baseURL}/api/v1/products/filter`, {
        params: { searchTerm: value, category_id: selectedCategory, distance },
      });

      const fetchedSuggestions = response.data.data; // Use the 'data' property
      setSuggestions(fetchedSuggestions);
      setSelectedSuggestionIndex(-1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (selectedSuggestion) => {
    setSearchTerm(selectedSuggestion.name);

    const encodedSearchTerm = encodeURIComponent(selectedSuggestion.name);
    navigate(
      `/filter?searchTerm=${encodedSearchTerm}&category_id=${selectedCategory}`
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

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  const handleSearchButtonClick = (e) => {
    e.preventDefault();

    const encodedSearchTerm = encodeURIComponent(searchTerm);

    //TODO:  distance
    navigate(
      `/filter?searchTerm=${encodedSearchTerm}&category_id=${selectedCategory}&distance=20`
    );
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

  return (
    <form
      style={{ zIndex: "1" }}
      className={`relative mt-4 mb-0 flex h-10 w-full items-center md:h-[51px] md:px-0 lg:mt-0 lg:w-auto lg:flex-1 ${position === 'relative' && "mx-6 lg:mx-[2%]"
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

      <input
        className={`h-full flex-1 border ${position === 'relative' ? "border-r-0 lg:border-l-0  pl-[20px]" : "pl-4"
          }`}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(true)}
        placeholder="Search products, brands and categories"
        ref={inputRef}
      />
      {showDropdown && (
        <ul className="w-full p-3 top-[2.8rem] suggestions-list absolute right-0 left-0 mt-1 border bg-white">
          {loading && <li className="absolute inset-0 w-full flex justify-center items-center bg-white/50 text-center">Loading...</li>}
          <p className="text-gray-400 text-sm">Location</p>
          <input
            type="text"
            placeholder="Search Location"
            className="py-2 px-3 mt-2 w-full text-[15px] border border-gray-200 rounded-sm"
          />
          <select
            className="w-full border border-gray-200 rounded-sm flex items-center text-[15px] justify-center gap-x-2.5 p-3 mt-2 text-gray-400 hover:bg-gray-100"
            value={distance}
            onChange={handleDistanceChange}
          >
            <option className="text-red-900" selected value={20}>Radius</option>
            <option value={10}>10 km</option>
            <option value={20}>20 km</option>
            <option value={30}>30 km</option>
          </select>
          <div className="bg-gray-200 mt-4 w-full h-[15rem] flex justify-center items-center">
            Google map
          </div>
          <div className="flex justify-end">
            <button className="bg-gray-400 mt-4 py-[0.5rem] px-12 rounded-md text-white uppercase">
              Apply
            </button>
          </div>
        </ul>
      )}

      {searchTerm && suggestions.length > 0 && (
        <ul
          className="w-full top-[2.8rem] suggestions-list absolute right-0 left-0 z-10 mt-1 border bg-white"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`cursor-pointer p-2 md:p-4 ${selectedSuggestionIndex === index ? "bg-gray-200" : ""
                } hover:bg-gray-200`}
            >
              {suggestion.name}
            </li>
          ))}
          <li className="grid grid-cols-2 gap-4 divide-x divide-gray-900/5 bg-gray-50 py-4 px-8 lg:hidden">
            <select
              style={{ fontSize: "14px" }}
              className="flex items-center justify-center gap-x-2.5 p-3 text-gray-900 hover:bg-gray-100"
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
              className="flex items-center justify-center gap-x-2.5 p-3 text-gray-900 hover:bg-gray-100"
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
            className="block h-full px-3 text-white md:hidden md:px-[22px]"
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
