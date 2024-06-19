import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import SingleProduct from "components/front/singleProduct/SingleProduct"
import SectionTitle from "components/front/sectionTitle/SectionTitle"

const TopPurchases = () => {
    return (
      <div className="relative bg-white">
         <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
	      <SectionTitle>Top Purchases</SectionTitle>
	      <Swiper
		  slidesPerView={3}
		  spaceBetween={45}
		  navigation={true}
		  modules={[Navigation]}
		  className="mySwiper mt-6"
	      >
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={3} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={3} type="grocery" />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={3} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={3} />
		</SwiperSlide>
	      </Swiper>
	</div>
      </div>
    )
}

export default TopPurchases;
