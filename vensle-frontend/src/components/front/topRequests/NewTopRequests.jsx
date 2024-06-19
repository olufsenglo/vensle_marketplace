import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import Request from "components/front/product/Request"
import SectionTitle from "components/front/sectionTitle/SectionTitle"

const NewTopRequests = () => {
    return (
      <div className="relative bg-white">
         <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
	      <SectionTitle>Top Requests</SectionTitle>
	      <Swiper
		  slidesPerView={2}
		  spaceBetween={80}
		  navigation={true}
		  modules={[Navigation]}
		  className="mySwiper mt-6"
	      >
		<SwiperSlide>
	  	    <Request />
		</SwiperSlide>
		<SwiperSlide>
	  	    <Request />
		</SwiperSlide>
		<SwiperSlide>
	  	    <Request />
		</SwiperSlide>
		<SwiperSlide>
	  	    <Request />
		</SwiperSlide>
	      </Swiper>
	</div>
      </div>
    )
}

export default NewTopRequests;
