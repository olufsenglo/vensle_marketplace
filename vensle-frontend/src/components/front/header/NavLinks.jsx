import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import {
  HeartIcon,
} from '@heroicons/react/24/outline'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Navigation } from 'swiper/modules';
import NavCategories from "./NavCategories";

const baseURL = "https://nominet.vensle.com/backend";
const NavLinks = ({ storedCountryFlag, storedCountry }) => {
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

  useEffect(() => {
      setShowText(false);
  }, [location])	

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
      className="relative transition ease duration-200 bg-white border-b border-b-gray-200/50"
    >

      <div className="mx-auto mb-1.5 lg:mb-0 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <ul
          className="flex items-center justify-between lg:justify-start lg:h-[auto]"
        >
          <li className="lg:mr-6">
            <NavCategories categories={categories} />
          </li>

          <li className="flex items-center text-xs lg:hidden">
            {storedCountryFlag && (
              <img
                className="mr-2 h-4 w-4 rounded-full"
                src={storedCountryFlag}
                alt="country flg"
              />
            )}
            {storedCountry}
          </li>
          <li className="hidden lg:block mr-2">
            <Link className="px-4 mb-3 hover:underline font-medium flex border-r cursor-pointer border-r-black border-l border-l-black items-center" to="/saved-items">
              <HeartIcon className="h-5 w-5 mr-1" />
              <p>Saved</p>
            </Link>
          </li>

  {categories ? (
<div className="hidden lg:block grow overflow-hidden">
      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
	breakpoints={{
		1024: {
			slidesPerView: 3,
			spaceBetween: 0,
		},
		1100: {
			slidesPerView: 4,
			spaceBetween: 0,
		},
		1300: {
			slidesPerView: 5,
			spaceBetween: 0,
		},
	}}
        modules={[Navigation]}
        className="navSwiper !w-[100%]"
      >        
	   {categories.map((category) => (
              <SwiperSlide>
		      <li
			key={category.id}
			onMouseEnter={() => handleMouseEnter(category)}
			onMouseLeave={handleMouseLeave}
			className={`font-medium hover:underline rounded-sm ${categoryId == category.id && "underline"
			  }`}
		      >
			{/*use localstorage for distance*/}
			<Link className="block pt-[12px] pl-1 pb-6 pr-4" to={`/filter?searchTerm=&category_id=${category.id}&distance=20&nav_type=category`}>
			  {category.name}
			</Link>

		      </li>
	      </SwiperSlide>
            ))}
        </Swiper>
</div>
     ) : (
            <li className="hidden lg:block pt-[12px] pl-1 pb-6">Loading . . .</li>
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
                        <div className="mb-2 text-[14px] uppercase font-semibold">{activeCategoryName}</div>
	              <ul
			className={`${subCategories.length > 8 && 'grid grid-flow-row auto-rows-max grid-cols-2'}`}
			style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}
		      >
                        {subCategories && subCategories.map((subCategory) => 
                          <li
                            className="mb-2"
                          >
                            <Link className="hover:underline" to={`/filter?searchTerm=&category_id=${activeCategory.id}&subcategory_id=${subCategory.id}&distance=20&nav_type=subcategory`}>
                              {subCategory.name}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="flex gap-5 w-[40%] h-[19rem]">
                      {navImage?.nav_menu_image1 && 
                        <div>
                          <img
			      className="w-full h-full object-contain"
			      src={getImagePath(navImage.nav_menu_image1)}
			      alt="submenu"
			  />
                        </div>
                      }
                      {navImage?.nav_menu_image2 && 
                        <div>
                          <img
      			      className="w-full h-full object-contain"
			      src={getImagePath(navImage.nav_menu_image2)}
			      alt="submenu"
			  />
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
