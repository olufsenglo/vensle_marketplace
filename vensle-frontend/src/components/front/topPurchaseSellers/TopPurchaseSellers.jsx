import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TabTopRequests from "./TabTopRequests";
import TabTopCategories from "./TabTopCategories";
import Categories from "./Categories";
import PreviewPopup from "components/front/previewPopup/PreviewPopup";
import Product from "components/front/product/Product";
import Grocery from "components/front/product/Grocery";

import { addToCart } from "actions/actions";

import { StarIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

//const baseURL = "https://nominet.vensle.com/backend";
const baseURL = "https://nominet.vensle.com/backend";

const TopPurchaseSellers = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
		centerPadding: "50px"
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activePill, setActivePill] = useState(1);
  const [activeTab, setActiveTab] = useState(1);
  const [type, setType] = useState("");

  const [selectedImagePath, setSelectedImagePath] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleModal = (e, product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setOpen(true);
    const sldImgPath = getImagePath(product.display_image.name);
    setSelectedImagePath(sldImgPath);
  };

  const handleProductQuickView = (e, product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const getDisplayImage = (product) => {
    const displayImage = product.images.find(
      (image) => image.id === product.display_image_id
    );
    return displayImage ? `${baseURL}/uploads/${displayImage.name}` : "";
  };

  const getImagePath = (name) => {
    return `${baseURL}/uploads/${name}`;
  };

  const handleSetSelectedImagePath = (e, thumbnail) => {
    e.preventDefault();
    setSelectedImagePath(thumbnail);
  };

  const handlePillClick = (pillNumber, tabNumber, productType) => {
    setActivePill(pillNumber);
    setActiveTab(tabNumber);
    setType(productType);
  };

  const handleTabClick = (tabNumber, productType) => {
    setActiveTab(tabNumber);
    setType(productType);
  };

  const topProductsByType = async () => {
    setLoading(true);
    const apiUrl = `${baseURL}/api/v1/products/top-by-type`;
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/products/top-by-type`,
        {
          params: {
            per_page: 8,
            type,
          },
        }
      );

      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    topProductsByType();
  }, [type]);

  return (
    <div className="z-1 relative bg-white">
      {selectedProduct && (
        <PreviewPopup
          open={open}
          setOpen={setOpen}
          selectedProduct={selectedProduct}
        />
      )}

      <div className="flex items-center justify-center gap-2 pt-10 md:gap-5">
        <button
          className={`rounded py-1 px-4 text-xs transition duration-300 md:px-10 md:text-sm lg:py-2 ${
            activePill === 1 ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handlePillClick(1, 1, "")}
        >
          FOR SALE
        </button>
        <button
          className={`rounded py-1 px-4 text-sm transition duration-300 md:px-10 lg:py-2 ${
            activePill === 2 ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handlePillClick(2, 3, "request")}
        >
          REQUESTS
        </button>
        <button
          className={`rounded py-1 px-4 text-sm transition duration-300 md:px-10 lg:py-2 ${
            activePill === 3 ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handlePillClick(3, 4, "grocery")}
        >
          GROCERIES
        </button>
      </div>

      {activePill === 1 && <Categories />}
      {activePill === 2 && <TabTopRequests />}
      {activePill === 3 && <TabTopCategories />}

      <div
        style={{ minHeight: "30rem" }}
        className="relative mx-auto max-w-2xl px-4 py-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        {loading && (
          <div
            style={{
              zIndex: "5",
              left: "0",
              right: "0",
              top: "6rem",
              bottom: "0",
            }}
            className="bg-transparent absolute flex items-center justify-center lg:bg-white"
          >
            <p>Loading...</p>
          </div>
        )}

        {!loading && products.length == 0 && (
          <div
            style={{
              zIndex: "5",
              left: "0",
              right: "0",
              top: "90px",
              bottom: "0",
            }}
            className="absolute flex items-center justify-center"
          >
            {activeTab == 1 ||
              (activeTab == 2 && <p>There are currently no products</p>)}
            {activeTab == 3 && <p>There are Requests no products</p>}
            {activeTab == 4 && <p>There are Groceries</p>}
          </div>
        )}

        <div className="mx-auto lg:mx-0 lg:flex lg:max-w-none">
          <div className="topPurchases__wrapper mb-10 flex min-h-[15rem] flex-col items-start bg-white lg:mb-0 lg:mt-0 lg:w-full lg:max-w-[26rem] lg:flex-shrink-0 lg:pr-8">
            <h2
              style={{ borderBottom: "2px solid red" }}
              className="block w-full pb-1 text-center text-xl font-normal uppercase tracking-tight text-gray-900 md:w-auto md:text-left md:text-2xl"
            >
              Top Purchases
            </h2>

<div className="top-purchase__wrapper mt-6 relative h-full w-full flex-col md:mt-10 w-full">

	  <Slider {...settings}>
	  	  {/*Temp solution*/}
		  {!loading && products.length > 0 && (products[0].type == "grocery" ? 
				  <Grocery wrapper="slick" lineClamp="2" product={products[0]} />
				  :
				  <Product wrapper="slick" lineClamp="2" product={products[0]} />
		  )}
		  {!loading && products.length > 0 && (products[1].type == "grocery" ? 
				  <Grocery wrapper="slick" lineClamp="2" product={products[1]} />
				  :
				  <Product wrapper="slick" lineClamp="2" product={products[1]} />
		  )}
	  </Slider>

</div>	  
          </div>

          <div className="w-full bg-white">
            <div className="items-center justify-between lg:flex">
              <h2
                style={{ borderBottom: "2px solid red" }}
                className="block w-full pb-1 text-center text-xl font-normal uppercase tracking-tight text-gray-900 md:w-auto md:text-left md:text-2xl"
              >
                Best Sellers
              </h2>

              <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
                <button
                  className={`bg-transparent h-10 w-full items-center whitespace-nowrap border-b-2 px-2 text-center text-sm transition duration-300 focus:outline-none md:w-auto ${
                    activeTab === 1
                      ? "border-red-500 text-red-600 dark:border-red-400 dark:text-red-300"
                      : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
                  }`}
                  onClick={() => handleTabClick(1, "")}
                >
                  All Products
                </button>

                <button
                  className={`bg-transparent h-10 w-full items-center whitespace-nowrap border-b-2 px-2 text-center text-sm focus:outline-none md:w-auto ${
                    activeTab === 2
                      ? "border-red-500 text-red-600 dark:border-red-400 dark:text-red-300"
                      : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
                  }`}
                  onClick={() => handleTabClick(2, "product")}
                >
                  For Sale
                </button>

                <button
                  className={`bg-transparent h-10 w-full items-center whitespace-nowrap border-b-2 px-2 text-center text-sm focus:outline-none md:w-auto ${
                    activeTab === 3
                      ? "border-red-500 text-red-600 dark:border-red-400 dark:text-red-300"
                      : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
                  }`}
                  onClick={() => handleTabClick(3, "request")}
                >
                  Requests
                </button>

                <button
                  className={`px-2 bg-transparent h-10 w-full items-center whitespace-nowrap border-b-2 text-center text-sm focus:outline-none md:w-auto ${
                    activeTab === 4
                      ? "border-red-500 text-red-600 dark:border-red-400 dark:text-red-300"
                      : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
                  }`}
                  onClick={() => handleTabClick(4, "grocery")}
                >
                  Groceries
                </button>
              </div>
            </div>

            <div className="topSellers__wrapper mt-6 grid min-h-[15rem] grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-2 md:mt-10 lg:grid-cols-4 xl:gap-x-8">
              {!loading &&
                products.length > 0 &&
                products.map((product) => (
		      <>
			{product.type == "grocery" ? (
			  <Grocery product={product} btnSize="sm" />
			) : (
			  <Product product={product} />
			)}
		      </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPurchaseSellers;
