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

const SwipeProducts = ({ title, type }) => {
    return (
	<>
	    <div className="overflow-hidden">
	     {title && <SectionTitle>{title}</SectionTitle>}
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
			slidesPerView: 7,
			spaceBetween: 15,
		     },
		  }}
		  modules={[Navigation]}
		  className="mySwiper mt-6 !w-[110%]"
	      >
		<SwiperSlide>
	   	    <SingleProduct type={type} numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type={type} numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type={type} numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type={type} numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type={type} numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type={type} numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type={type} numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type={type} numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct type={type} numberOfProducts={7} />
		</SwiperSlide>
	      </Swiper>
	    </div>
	    <div className="overflow-hidden">
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
			slidesPerView: 7,
			spaceBetween: 15,
		     },
		  }}
		  modules={[Navigation]}
		  className="mySwiper mt-6 !w-[110%]"
	      >
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={7} />
		</SwiperSlide>
		<SwiperSlide>
	   	    <SingleProduct numberOfProducts={7} />
		</SwiperSlide>
	      </Swiper>
	    </div>
	</>
    )
}

export default SwipeProducts;
