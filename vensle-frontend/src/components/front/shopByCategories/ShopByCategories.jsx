import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

import SectionTitle from "components/front/sectionTitle/SectionTitle"

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

export default function ShopByCategories() {
  return (
      <div className="relative bg-white">
         <div className="mx-auto max-w-2xl px-4 pb-3 lg:pt-6 lg:pb-6 sm:px-6 lg:max-w-7xl lg:px-8">
	    <SectionTitle>Shop by Categories</SectionTitle>
	    <div className="mt-3 lg:mt-10 overflow-hidden">
	      <Swiper
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
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={cat1}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Computing</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={ball2}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Women's Fashion</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={cat2}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Men's Fashion</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={ball3}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Sporting Goods</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={cat3}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Appliances</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={cat4}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Computing</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={ball}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Men's Fashion</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={cat5}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Men's Fashion</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={cat6}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Men's Fashion</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={cat7}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Men's Fashion</p>
           	    </div>
		</SwiperSlide>
	      </Swiper>
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
