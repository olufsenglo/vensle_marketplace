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
import img1 from "assets/img/front/all/front_056.png"
import img2 from "assets/img/front/all/front_057.png"
import img3 from "assets/img/front/all/front_001.png"
import img4 from "assets/img/front/all/front_007.png"

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
						<SingleProduct numberOfProducts={3} image={img1} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct numberOfProducts={3} image={img2} type="grocery" />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct numberOfProducts={3} image={img3} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct numberOfProducts={3} image={img4} />
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	)
}

export default TopPurchases;
