import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

import SectionTitle from "components/front/sectionTitle/SectionTitle"

import image1 from "assets/img/front/all/grocery/Image_032.png";
import image2 from "assets/img/front/all/grocery/Image_025.png";
import image3 from "assets/img/front/all/grocery/Image_024.png";
import image4 from "assets/img/front/all/grocery/Image_023.png";
import image5 from "assets/img/front/all/grocery/Image_027.png";
import image6 from "assets/img/front/all/grocery/Image_034.png";
import image7 from "assets/img/front/all/grocery/Image_030.png";
import image8 from "assets/img/front/all/grocery/Image_054.png";
import image9 from "assets/img/front/all/grocery/Image_068.png";
import image10 from "assets/img/front/all/grocery/Image_061.png";
import image11 from "assets/img/front/all/grocery/Image_071.png";


export default function ShopByGroceryCategories() {
  return (
      <div className="relative bg-white">
         <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:pt-6 lg:pb-6 lg:max-w-7xl lg:px-8">
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
				     src={image10}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Bananas</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image1}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Grapes</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image2}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Custard</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image3}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Steak</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image4}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Deli</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image5}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Grapes</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image6}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Apples</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image11}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Grapes</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image8}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Banana Bread</p>
           	    </div>
		</SwiperSlide>
		<SwiperSlide>
	            <div className="flex flex-col items-center cursor-pointer">
	                  <div className="flex justify-center items-center min-h-[5rem] min-w-[5rem] rounded-full p-0 lg:p-[0.2rem] bg-gray-100/50 transition duration-300 hover:bg-gray-200">
				<img
				     src={image1}
				     className="!w-[4rem] p-[5px] lg:p-4 !h-[4rem] lg:!w-[8rem] lg:!h-[8rem] !object-contain"
				     alt="suggested categories"
				/>
           	          </div>
			  <p className="p-2 text-xs lg:text-[16px] mt-1">Organic Grapes</p>
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
