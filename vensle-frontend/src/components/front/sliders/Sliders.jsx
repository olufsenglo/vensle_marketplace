import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

import PickupSlider from './PickupSlider';
import RequestSlider from './RequestSlider';
import GrocerySlider from './GrocerySlider';

const Sliders = ({
    activePill,
    setActivePill
}) => {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
		{activePill === 1 && <PickupSlider />}
	  	{activePill === 2 && <PickupSlider />}
		{activePill === 3 && <RequestSlider />}
	  	{activePill === 4 && <GrocerySlider />}
      </div>
    </div>
  );
}

export default Sliders
