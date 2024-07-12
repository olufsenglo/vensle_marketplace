import React, { useRef, useEffect, useState } from 'react';
import axios from "axios"
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
import PreviewPopup from "components/front/previewPopup/PreviewPopup";

import img1 from "assets/img/front/all/front_056.png"
import img2 from "assets/img/front/all/front_057.png"
import img3 from "assets/img/front/all/front_001.png"
import img4 from "assets/img/front/all/front_007.png"

const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

const TopPurchases = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductQuickView = (e, product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setOpen(true);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiBaseURL}/products/top-by`,
        {
          params: {
	    column: 'ratings',
            duration: 'subYear',
            per_page: 5,
          },
        }
      );

      const products = response.data.data;
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

      {selectedProduct && (
        <PreviewPopup
          open={open}
          setOpen={setOpen}
          selectedProduct={selectedProduct}
        />
      )}
		

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
	       			{products.length > 0 && products.map((product) => 
					<SwiperSlide key={product.id}>
						<SingleProduct product={product} type={product.type} numberOfProducts={3} image={img1} handleProductQuickView={handleProductQuickView} />
					</SwiperSlide>
	       			)}

					<SwiperSlide>
						<SingleProduct numberOfProducts={3} image={img2} type="grocery" />
					</SwiperSlide>
				</Swiper>
      			    )}
			</div>
		</div>
	)
}

export default TopPurchases;
