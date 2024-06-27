import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import {
  HeartIcon,
} from '@heroicons/react/24/outline'

import NavCategories from "./NavCategories";

const baseURL = "https://nominet.vensle.com/backend";
const NavLinks = ({ storedCountryFlag, handleGetUserCountry }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category_id") || "";

  const [categories, setCategories] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeCategoryName, setActiveCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [navImage, setNavImage] = useState({});


  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let timer;
    if (isHovered) {
      timer = setTimeout(() => {
        setShowText(true);
      }, 300);
    } else {
      setShowText(false);
      clearTimeout(timer); // Clear timeout if mouse leaves before 2 seconds
    }

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [isHovered]);

  const handleMouseEnter = (category) => {
    setActiveCategory(category)
    setActiveCategoryName(category.name)
    setSubCategories(category.subcategories);
    handleSetNavDisplay(category)
    setIsHovered(true);
  };

  const handleSetNavDisplay = (data) => {
    setNavImage({nav_menu_image1: data.nav_menu_image1, nav_menu_image2: data.nav_menu_image2})
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const navStyle = {
    transition: 'all 300ms ease-in',
  };

  const getImagePath = (name) => {
    return `${baseURL}/uploads/categories/${name}`;
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

  return (
    <div
      className=" relative transition ease duration-200 bg-white border-b border-b-gray-200/50"
    >

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <ul
          className="flex items-center justify-between lg:justify-start"
        >
          <li className="mr-6 mb-3">
            <NavCategories />
          </li>

          <li className="flex items-center text-xs lg:hidden">
            {storedCountryFlag && (
              <img
                className="mr-2 h-4 w-4 rounded-full"
                src={storedCountryFlag}
                alt="country flg"
              />
            )}
            {handleGetUserCountry()}
          </li>
          <li className="block pt-2 pb-6 mr-2">
            <Link className="hidden px-4 hover:underline font-medium px-4 lg:flex border-r cursor-pointer border-r-black border-l border-l-black items-center" to="/saved-items">
              <HeartIcon className="h-5 w-5 mr-1" />
              <p>Saved</p>
            </Link>
          </li>

          {categories ? (
            categories.map((category) => (
              <li
                key={category.id}
                onMouseEnter={() => handleMouseEnter(category)}
                onMouseLeave={handleMouseLeave}
                className={`hidden font-medium hover:underline rounded-sm lg:block ${categoryId == category.id && "bg-gray-400/50"
                  }`}
              >
                {/*use localstorage for distance*/}
                <Link className="px-2 block pt-2 pb-6" to={`/filter?searchTerm=&category_id=${category.id}&distance=20`}>
                  {category.name}
                </Link>

              </li>
            ))
          ) : (
            <li className="hidden lg:block mb-4">Loading . . .</li>
          )}
        </ul>

                <div
                  onMouseEnter={() => handleMouseEnter(activeCategory)}
                  onMouseLeave={handleMouseLeave}
                  className={`absolute left-0 right-0 overflow-hidden z-[3] ${showText ? "h-[21rem]" : "h-0"} top-[100%] bg-[#f8f8f8] z-[3]`
                  }
                  style={navStyle}
                >
                  <div className="flex gap-12 justify-between mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="flex-1">
                      <ul>
                        <li className="mb-1 text-[14px] uppercase font-semibold">{activeCategoryName}</li>
                        {subCategories && subCategories.map((subCategory) => 
                          <li
                            className="mb-2"
                          >
                            <Link className="hover:underline" to="/">
                              {subCategory.name}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="flex gap-5 w-[40%]">
                      {navImage?.nav_menu_image1 && 
                        <div>
                          <img src={getImagePath(navImage.nav_menu_image1)} alt="submenu" />
                        </div>
                      }
                      {navImage?.nav_menu_image2 && 
                        <div>
                          <img src={getImagePath(navImage.nav_menu_image2)} alt="submenu" />
                        </div>
                      }
                    </div>
                  </div>
                </div>
      </div>


    </div>
  );
};

export default NavLinks;
