import React, { useRef, useEffect, useState } from 'react';
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

import img1 from "assets/img/front/all/front_056.png"
import img2 from "assets/img/front/all/front_057.png"
import img3 from "assets/img/front/all/front_001.png"
import img4 from "assets/img/front/all/front_007.png"

const TopPurchases = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching products data (replace with actual fetch logic)
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading delay
  }, []);

	return (
		<div className="relative bg-white">
		      <div className="mx-auto max-w-2xl px-4 lg:pt-6 pb-6 sm:px-6 lg:max-w-7xl lg:px-8">
			    <SectionTitle>Top Purchases</SectionTitle>
			      {loading ? (
				// Show Skeleton loading while data is being fetched
				<div className="mt-2 w-full lg:mt-6">
				      <div className="lg:hidden">
				         <SkeletonLoader size="large" itemNumber="2" />
				      </div>
				      <div className="hidden lg:block">
				         <SkeletonLoader size="large" itemNumber="3" />
				      </div>
				</div>
			      ) : (
				<Swiper
					slidesPerView={2}
					spaceBetween={10}
					navigation={true}
					breakpoints={{
						640: {
							slidesPerView: 2,
							spaceBetween: 10,
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 15,
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 45,
						},
					}}					
					modules={[Navigation]}
					className="mySwiper mt-2 lg:mt-6"
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
      			    )}
			</div>
		</div>
	)
}

export default TopPurchases;
