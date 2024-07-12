import { useEffect, useState, useRef } from "react"
import axios from "axios"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import SkeletonLoader from 'components/front/skeletonLoader/SkeletonLoader'; 
import SingleProduct from "components/front/singleProduct/SingleProduct"
import SectionTitle from "components/front/sectionTitle/SectionTitle"
import PreviewPopup from "components/front/previewPopup/PreviewPopup";

import img1 from "assets/img/front/all/grocery/Image_014.jpg"
import img2 from "assets/img/front/all/grocery/Image_017.jpg"
import img3 from "assets/img/front/all/grocery/Image_026.jpg"
import img4 from "assets/img/front/all/grocery/Image_073.jpg"
import img5 from "assets/img/front/all/grocery/Image_057.jpg"
import img6 from "assets/img/front/all/grocery/Image_045.jpg"
import img7 from "assets/img/front/all/grocery/Image_067.jpg"
import img8 from "assets/img/front/all/grocery/Image_029.jpg"

const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

const MostPopular = () => {
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
        `${apiBaseURL}/products/top-sellers-grocery`,
        {
          params: {
            duration: 'subYear',
            per_page: 9,
          },
        }
      );

      const products = response.data.top_products.data;
	    console.log('feee', products)
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

			<div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="overflow-hidden">
					<SectionTitle>Most Popular Groceries</SectionTitle>
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
								slidesPerView: 5,
								spaceBetween: 15,
							},
						}}
						modules={[Navigation]}
						className="mySwiper mt-2 lg:mt-6 !w-[110%]"
					>
				      	     {products.length > 0 && products.map((product) =>
						<SwiperSlide>
							<SingleProduct section="popularGrocery" product={product} type="grocery"  image={img5} numberOfProducts={6} handleProductQuickView={handleProductQuickView} />
						</SwiperSlide>

					     )}
					</Swiper>
      			    )}
				</div>
			</div>
		</div>
	)
}

export default MostPopular;
