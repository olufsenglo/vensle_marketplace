import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import SingleProduct from "components/front/singleProduct/SingleProduct"
import SectionTitle from "components/front/sectionTitle/SectionTitle"
import SkeletonLoader from 'components/front/skeletonLoader/SkeletonLoader'; 

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

const SwipeProducts = ({
	title, type, image, loading=false, products, handleProductQuickView
}) => {
	return (
			<div className="overflow-hidden">
				{title && <SectionTitle>{title}</SectionTitle>}
			      {loading ? (
				// Show Skeleton loading while data is being fetched
				<div className="mt-2 w-full lg:mt-6">
				      <div className="md:hidden lg:hidden">
				         <SkeletonLoader itemNumber="2" />
				      </div>
				      <div className="hidden md:block lg:hidden">
				         <SkeletonLoader itemNumber="3" />
				      </div>
				      <div className="hidden lg:block">
				         <SkeletonLoader itemNumber="6" />
				      </div>
				</div>
			      ) : (
				<Swiper
					slidesPerView={2}
					spaceBetween={8}
					navigation={true}
					breakpoints={{
						640: {
							slidesPerView: 2,
							spaceBetween: 8,
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
					className="mySwiper mt-2 lg:mt-6 !w-[110%]"
				>
				      {products && products.map((product) => 
				            <SwiperSlide>
						<SingleProduct product={product} type={product.type} image={img2} numberOfProducts={7} handleProductQuickView={handleProductQuickView} />
					    </SwiperSlide>
				      )}
					<SwiperSlide>
						<SingleProduct type="pickUp" image={img1} numberOfProducts={7} />
					</SwiperSlide>
					<SwiperSlide>
						<SingleProduct type="pickUp" image={img1} numberOfProducts={7} />
					</SwiperSlide>
				</Swiper>
      			    )}
			</div>
	)
}

export default SwipeProducts;
