import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

import SectionTitle from "components/front/sectionTitle/SectionTitle"

import image1 from "assets/img/front/all/grocery/Image_032.jpg";
import image2 from "assets/img/front/all/grocery/Image_025.jpg";
import image3 from "assets/img/front/all/grocery/Image_024.jpg";
import image4 from "assets/img/front/all/grocery/Image_023.jpg";
import image5 from "assets/img/front/all/grocery/Image_027.jpg";
import image6 from "assets/img/front/all/grocery/Image_034.jpg";
import image7 from "assets/img/front/all/grocery/Image_030.jpg";
import image8 from "assets/img/front/all/grocery/Image_054.jpg";
import image9 from "assets/img/front/all/grocery/Image_068.jpg";
import image10 from "assets/img/front/all/grocery/Image_061.jpg";
import image11 from "assets/img/front/all/grocery/Image_071.jpg";


export default function ShopByGroceryCategories() {
  return (
      <div className="relative bg-white">
         <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
	    <SectionTitle>Shop by Categories</SectionTitle>
	    <div className="mt-10 overflow-hidden">
	      <Swiper
		  slidesPerView={8}
		  spaceBetween={10}
		  navigation={true}
		  modules={[Navigation]}
		  className="mySwiper !w-[106%]"
	      >
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="rounded-full p-[0.2rem] p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image9}
				     className="!w-[8rem] !h-[8rem] p-4 !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-[16px] mt-1">Computing</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="rounded-full p-[0.2rem] p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image1}
				     className="!w-[8rem] !h-[8rem] p-4 !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-[16px] mt-1">Computing</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="rounded-full p-[0.2rem] p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image2}
				     className="!w-[8rem] !h-[8rem] p-4 !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-[16px] mt-1">Men's Fashion</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="rounded-full p-[0.2rem] p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image3}
				     className="!w-[8rem] !h-[8rem] p-4 !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-[16px] mt-1">Computing</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="rounded-full p-[0.2rem] p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image4}
				     className="!w-[8rem] !h-[8rem] p-4 !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
	   	    	  <p className="p-2 text-[16px] mt-1">Women's Fashion</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="rounded-full p-[0.2rem] p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image5}
				     className="!w-[8rem] !h-[8rem] p-4 !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
	   	    	  <p className="p-2 text-[16px] mt-1">Men's Fashion</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="rounded-full p-[0.2rem] p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image6}
				     className="!w-[8rem] !h-[8rem] p-4 !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
	   	    	  <p className="p-2 text-[16px] mt-1">Men's Fashion</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="rounded-full p-[0.2rem] p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image7}
				     className="!w-[8rem] !h-[8rem] p-4 !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
	   	    	  <p className="p-2 text-[16px] mt-1">Men's Fashion</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="rounded-full p-[0.2rem] p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image8}
				     className="!w-[8rem] !h-[8rem] p-4 !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
	   	    	  <p className="p-2 text-[16px] mt-1">Women's Fashion</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="rounded-full p-[0.2rem] p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image1}
				     className="!w-[8rem] !h-[8rem] p-4 !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
	   	    	  <p className="p-2 text-[16px] mt-1">Women's Fashion</p>
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

const ShopByGroceryCategories = () => {
   return (
       <div className="relative bg-white">
           <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
	        <div className="flex">
	            <div className="flex flex-col items-center">
	   		<img
	   		     src={image}
	   		     className="w-[5rem] h-[5rem] p-3 object-cover rounded-full bg-green-300"
	   		     alt="suggested categories"
	   	    	/>
	   	    	<p>Sporting Goods</p>
           	    </div>
	            <div className="flex flex-col items-center">
	   		<img
	   		     src={image}
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
