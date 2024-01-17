import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const baseURL = "https://nominet.vensle.com/backend";
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchTerm, setSearchTerm] = useState(queryParams.get('searchTerm') || '');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const inputRef = useRef(null);


  const [categories, setCategories] = useState('');
  const [distance, setDistance] = useState(20);

  const handleDistanceChange = (event) => {
    const newDistance = parseInt(event.target.value, 10);
    setDistance(newDistance);
  };



  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    try {
      const response = await axios.get(`${baseURL}/api/v1/products/filter`, {
        params: { searchTerm: value, category_id: selectedCategory, distance },
      });

      const fetchedSuggestions = response.data.data; // Use the 'data' property
      setSuggestions(fetchedSuggestions);
      setSelectedSuggestionIndex(-1);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSelectSuggestion = (selectedSuggestion) => {
    setSearchTerm(selectedSuggestion.name);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedSuggestionIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === 'ArrowUp') {
      setSelectedSuggestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === 'Enter' && selectedSuggestionIndex !== -1) {
      handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleOutsideClick = (e) => {
    const isClickInsideInput = inputRef.current && inputRef.current.contains(e.target);
    const isClickInsideSuggestions = e.target.closest('.suggestions-list');

    if (!isClickInsideInput && !isClickInsideSuggestions) {
      //setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    // Navigate to the filter page with the appropriate query parameters
    const encodedSearchTerm = encodeURIComponent(searchTerm);

    navigate(`/filter?searchTerm=${encodedSearchTerm}&category_id=${selectedCategory}`);
  };

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/categories`);
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectedSuggestionIndex(-1);
  }, [suggestions]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
     <form className="flex w-full lg:flex-1 lg:w-auto my-8 lg:my-2 items-center h-full relative" style={{ "height":"51px" }} onSubmit={handleSearchButtonClick}>


        <select style={{fontSize: "14px"}} className="pl-1 h-full border" value={distance} onChange={handleDistanceChange}>
          <option value={10}>10 km</option>
          <option value={20}>20 km</option>
          <option value={30}>30 km</option>
        </select>


      <input
        style={{ "height": "100%", "flex": "1", borderLeft: "none", borderRight: "none", "padding-left":"20px" }}
	className="border"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search products, brands and categories"
        ref={inputRef}
      />
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border border-r-0 p-2 h-full"
      >
                <option value="">Everything</option>
                {categories && categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
	  
      </select>
      {searchTerm && suggestions.length > 0 && (
        <ul style={{ "top": "2.8rem", "width": "100%" }} className="suggestions-list absolute z-10 right-0 left-0 bg-white border p-2 mt-1 w-64">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`cursor-pointer p-2 ${selectedSuggestionIndex === index ? 'bg-gray-200' : ''} hover:bg-gray-200`}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
      <button
	  className="h-full text-white"
        style={{ "background": "#ff5959", "padding-right": "22px", "padding-left": "22px" }}
        type="submit"
      >
        SEARCH
      </button>
      </form> 
  );
}

export default Search;
