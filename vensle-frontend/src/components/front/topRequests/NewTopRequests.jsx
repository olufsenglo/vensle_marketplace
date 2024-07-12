import React, { useEffect, useRef, useState } from 'react';
import axios from "axios"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import SkeletonLoader from 'components/front/skeletonLoader/SkeletonLoader'; 
import SectionTitle from "components/front/sectionTitle/SectionTitle"
import Request from "components/front/product/Request"

const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

const NewTopRequests = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiBaseURL}/products/top-sellers-products-request`,
        {
          params: {
  	    type: 'request',
            duration: 'subYear',
            per_page: 5,
          },
        }
      );

      const products = response.data.top_products.data;
      setProducts(products);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

    return (
      <div className="relative bg-white">
         <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-4 lg:pt-6 pb-6 lg:max-w-7xl lg:px-8">
	      <SectionTitle>Top Requests</SectionTitle>
			      {loading ? (
				// Show Skeleton loading while data is being fetched
				<div className="mt-2 w-full lg:mt-6">
				      <div className="">
				         <SkeletonLoader itemNumber="2" />
				      </div>
				</div>
			      ) : (
	      <Swiper
		  slidesPerView={2}
		  spaceBetween={7}
		  navigation={true}
		  breakpoints={{
			640: {
				slidesPerView: 2,
				spaceBetween: 7,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			1024: {
				slidesPerView: 2,
				spaceBetween: 45,
			},
		  }}					
		  modules={[Navigation]}
		  className="mySwiper mt-2 lg:mt-6"
	      >
	       {products.length > 0 && products.map((product) => 
			<SwiperSlide key={product.id}>
			    <Request product={product} />
			</SwiperSlide>
	       )}
	      </Swiper>
      	    )}
	</div>
      </div>
    )
}

export default NewTopRequests;
