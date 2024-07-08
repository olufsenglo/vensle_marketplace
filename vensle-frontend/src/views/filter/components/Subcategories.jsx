import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

import SectionTitle from "components/front/sectionTitle/SectionTitle"

const baseURL = "https://nominet.vensle.com/backend";
export default function Subcategories({ loading, subcategories }) {
	
  const getImagePath = (name) => {
    return `${baseURL}/uploads/categories/${name}`;
  };

  return (
      <div className="relative bg-white border-b border-b-gray-200 pb-6 mb-10">
	  <h2 className="pr-3 md:text-xl font-semibold tracking-tight text-gray-900">
            Categories to shop from
        </h2>
	    <div className="mt-3 lg:mt-5 overflow-hidden">
	      {loading && <div className="h-[5rem] w-[5rem] bg-gray-200 rounded-full animate-pulse">
 	      </div>}
	      {!loading && subcategories.length > 0 && <Swiper
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
				slidesPerView: 4,
				spaceBetween: 6,
			},
			1080: {
				slidesPerView: 5,
				spaceBetween: 10,
			},
		}}
		  className="mySwiper !w-[106%]"
	      >
	       {subcategories.map((subcategory) =>
		<SwiperSlide>
	            <Link
		       to={`/filter?searchTerm=&category_id=${subcategory.category_id}&subcategory_id=${subcategory.id}&nav_type=subcategory&distance=20`}
		       className="flex flex-col items-center text-center"
		    >
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={getImagePath(subcategory.image)}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">{subcategory.name}</p>
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
  );
}
