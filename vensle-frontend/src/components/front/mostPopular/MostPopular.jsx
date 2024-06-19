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

const MostPopular = () => {
    return (
      <div className="relative bg-white">
         <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
	    <div className="overflow-hidden">
	      <SectionTitle>Most Popular Groceries</SectionTitle>
	      <Swiper
		  slidesPerView={2}
		  spaceBetween={15}
		  navigation={true}
	    	  breakpoints={{
		     640: {
			slidesPerView: 2,
			spaceBetween: 15,
		     },
		     768: {
			slidesPerView: 4,
			spaceBetween: 15,
		     },
		     1024: {
			slidesPerView: 5,
			spaceBetween: 15,
		     },
		  }}
		  modules={[Navigation]}
		  className="mySwiper mt-6 !w-[110%]"
	      >
		<SwiperSlide>
	   	    <SingleProduct type="grocery" numberOfProducts={6} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type="grocery" numberOfProducts={6} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type="grocery" numberOfProducts={6} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type="grocery" numberOfProducts={6} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type="grocery" numberOfProducts={6} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type="grocery" numberOfProducts={6} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type="grocery" numberOfProducts={6} />
		</SwiperSlide>
	      </Swiper>
	    </div>
	</div>
      </div>
    )
}

export default MostPopular;
