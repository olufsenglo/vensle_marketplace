import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import sliderImg2 from 'assets/img/front/slider/2.png';

// import required modules
import { Navigation } from 'swiper/modules';

const GrocerySlider = () => {
  return (
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
		<SwiperSlide>
		    <img src={sliderImg2} alt="slider" />
		</SwiperSlide>
	  </Swiper>
  );
}

export default GrocerySlider
