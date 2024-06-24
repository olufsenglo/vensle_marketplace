import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import SingleProduct from "components/front/singleProduct/SingleProduct"
import SectionTitle from "components/front/sectionTitle/SectionTitle"
import img1 from "assets/img/front/all/front_077.png"
import img2 from "assets/img/front/all/front_078.png"
import img3 from "assets/img/front/all/front_068.png"
import img4 from "assets/img/front/all/front_079.png"
import img5 from "assets/img/front/all/imgfront_048.jpg"
import img6 from "assets/img/front/all/front_061.png"
import img7 from "assets/img/front/all/front_006.png"
import img8 from "assets/img/front/all/front_004.png"
import img9 from "assets/img/front/all/front_075.png"
import img10 from "assets/img/front/all/Image_010.jpg"
import img11 from "assets/img/front/all/front_086.png"
import img12 from "assets/img/front/all/front_043.png"
import img13 from "assets/img/front/all/imgfront_015.jpg"
import img14 from "assets/img/front/all/imgfront_008.jpg"

const SwipeProducts = ({ title, type, image }) => {
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
						<SingleProduct type="pickUp" image={img1} numberOfProducts={7} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="grocery" image={img2} numberOfProducts={7} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="pickUp" image={img3} numberOfProducts={7} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="request" image={img4} numberOfProducts={7} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="grocery" image={img5} numberOfProducts={7} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="pickUp" image={img6} numberOfProducts={7} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="grocery" image={img7} numberOfProducts={7} />
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
						<SingleProduct type="request" numberOfProducts={7} image={img8} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="pickUp" numberOfProducts={7} image={img9} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="grocery" numberOfProducts={7} image={img10} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="request" numberOfProducts={7} image={img11} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="pickUp" numberOfProducts={7} image={img12} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="grocery" numberOfProducts={7} image={img13} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="grocery" numberOfProducts={7} image={img14} />
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
