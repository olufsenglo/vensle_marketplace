import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Autosuggest = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Fetch suggestions from Laravel backend using Axios
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/products/filter`, {
        params: { searchTerm: value, category_id: selectedCategory },
      });

      const fetchedSuggestions = response.data.data; // Use the 'data' property
      console.log(fetchedSuggestions);
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
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setSearchTerm('');
      setSuggestions([]);
    }
  };

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
    <div className="relative" ref={inputRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        className="border p-2 rounded-md w-64"
      />
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border p-2 rounded-md ml-2"
      >
        <option value="">All Categories</option>
        <option value="1">Category 1</option>
        <option value="2">Category 2</option>
        {/* Add more options as needed */}
      </select>
      {searchTerm && suggestions.length > 0 && (
        <ul className="absolute z-10 left-0 bg-white border p-2 mt-1 w-64">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`cursor-pointer p-2 ${selectedSuggestionIndex === index ? 'bg-gray-200' : ''}`}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autosuggest;

