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
import img1 from "assets/img/front/all/front_007.png"
import img2 from "assets/img/front/all/front_008.png"
import img3 from "assets/img/front/all/front_069.png"

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
	  	    <Request image={img3}  />
		</SwiperSlide>
		<SwiperSlide>
	  	    <Request image={img1} />
		</SwiperSlide>
		<SwiperSlide>
	  	    <Request image={img2}  />
		</SwiperSlide>
		<SwiperSlide>
	  	    <Request  />
		</SwiperSlide>
	      </Swiper>
	</div>
      </div>
    )
}

export default NewTopRequests;
