import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

import SectionTitle from "components/front/sectionTitle/SectionTitle"
import SkeletonLoader from 'components/front/skeletonLoader/shopCategoryLoader'; 

import cat1 from "assets/img/front/shop-by-category/cat1.png";
import cat2 from "assets/img/front/shop-by-category/cat2.png";
import cat3 from "assets/img/front/shop-by-category/cat3.png";
import cat4 from "assets/img/front/shop-by-category/cat4.png";
import cat5 from "assets/img/front/shop-by-category/cat5.png";
import cat6 from "assets/img/front/shop-by-category/cat6.png";
import cat7 from "assets/img/front/shop-by-category/cat7.png";
import ball from "assets/img/front/shop-by-category/ball-1.png";
import ball2 from "assets/img/front/shop-by-category/ball-2.png";
import ball3 from "assets/img/front/shop-by-category/ball-3.webp";

const baseURL = "https://nominet.vensle.com/backend";
export default function ShopByCategories() {
  const [categories, setCategories] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
	setLoading(true);
        const response = await fetch(`${baseURL}/api/v1/categories`);
        const data = await response.json();
        setCategories(data.categories);
	setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
	setLoading(false);
      }
    };

    fetchCategories();
  }, []);
	
  const getImagePath = (name) => {
    return `${baseURL}/uploads/categories/${name}`;
  };

  return (
      <div className="relative bg-white">
         <div className="mx-auto max-w-2xl px-4 pb-3 lg:pt-6 lg:pb-6 sm:px-6 lg:max-w-7xl lg:px-8">
	    <SectionTitle>Shop by Categories</SectionTitle>
	    <div className="mt-3 lg:mt-10 overflow-hidden">
	      {loading && (
		// Show Skeleton loading while data is being fetched
				<div className="w-full">
				      <div className="lg:hidden">
				         <SkeletonLoader itemNumber="5" />
				      </div>
				      <div className="hidden lg:block">
				         <SkeletonLoader itemNumber="7" />
				      </div>
				</div>
	      )}
	      {categories.length > 0 && !loading && <Swiper
		  slidesPerView={4}
		  spaceBetween={20}
		  navigation={true}
		  modules={[Navigation]}
		  breakpoints={{
			640: {
				slidesPerView: 4,
				spaceBetween: 4,
			},
			768: {
				slidesPerView: 6,
				spaceBetween: 6,
			},
			1080: {
				slidesPerView: 8,
				spaceBetween: 10,
			},
		}}
		  className="mySwiper !w-[106%]"
	      >
	       {categories.map((category) =>
		<SwiperSlide>
	            <Link to={`/filter?searchTerm=&category_id=${category.id}&distance=20&nav_type=category`} className="flex flex-col items-center text-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={getImagePath(category.image)}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">{category.name}</p>
           	    </Link>
		</SwiperSlide>)}
		<SwiperSlide>
	            <div className="invisible">
	                  <div className="w-[2px]">
           	          </div>
           	    </div>
		</SwiperSlide>
	      </Swiper>}
	    </div>
	 </div>
      </div>
  );
}




/*import ball from "assets/img/front/shop-by-category/ball-3.webp";
import ball2 from "assets/img/front/shop-by-category/ball-2.png";

const ShopByCategories = () => {
   return (
       <div className="relative bg-white">
           <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
	        <div className="flex">
	            <div className="flex flex-col items-center">
	   		<img
	   		     src={ball}
	   		     className="w-[5rem] h-[5rem] p-3 object-cover rounded-full bg-green-300"
	   		     alt="suggested categories"
	   	    	/>
	   	    	<p>Sporting Goods</p>
           	    </div>
	            <div className="flex flex-col items-center">
	   		<img
	   		     src={ball2}
	   		     className="w-[5rem] h-[5rem] p-3 object-cover rounded-full bg-green-300"
	   		     alt="suggested categories"
	   	    	/>
	   	    	<p>Sporting Goods</p>
           	    </div>
           	</div>
           </div>
       </div>
  )
}

export default ShopByCategories;*/
