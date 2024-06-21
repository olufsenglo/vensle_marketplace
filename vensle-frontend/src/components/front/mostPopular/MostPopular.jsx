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
import img1 from "assets/img/front/all/grocery/Image_014.jpg"
import img2 from "assets/img/front/all/grocery/Image_017.jpg"
import img3 from "assets/img/front/all/grocery/Image_026.jpg"
import img4 from "assets/img/front/all/grocery/Image_073.jpg"
import img5 from "assets/img/front/all/grocery/Image_057.jpg"
import img6 from "assets/img/front/all/grocery/Image_045.jpg"
import img7 from "assets/img/front/all/grocery/Image_067.jpg"
import img8 from "assets/img/front/all/grocery/Image_029.jpg"

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
							<SingleProduct type="grocery"  image={img5} numberOfProducts={6} />
						</SwiperSlide>
						<SwiperSlide>
							<SingleProduct type="grocery"  image={img4} numberOfProducts={6} />
						</SwiperSlide>
						<SwiperSlide>
							<SingleProduct type="grocery"  image={img3} numberOfProducts={6} />
						</SwiperSlide>
						<SwiperSlide>
							<SingleProduct type="grocery"  image={img8} numberOfProducts={6} />
						</SwiperSlide>
						<SwiperSlide>
							<SingleProduct type="grocery"  image={img7} numberOfProducts={6} />
						</SwiperSlide>
						<SwiperSlide>
							<SingleProduct type="grocery"  image={img6} numberOfProducts={6} />
						</SwiperSlide>
						<SwiperSlide>
							<SingleProduct type="grocery" image={img1} numberOfProducts={6} />
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	)
}

export default MostPopular;
