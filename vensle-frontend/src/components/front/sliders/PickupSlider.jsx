import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import sliderImg1 from 'assets/img/front/slider/1.png';
import sliderImg2 from 'assets/img/front/slider/2.png';

// import required modules
import { Navigation } from 'swiper/modules';

const PickupSlider = () => {
  return (
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
		<SwiperSlide>
		    <img src={sliderImg1} alt="slider" />
		</SwiperSlide>
		<SwiperSlide>
		    <img src={sliderImg2} alt="slider" />
		</SwiperSlide>
	  </Swiper>
  );
}

export default PickupSlider
