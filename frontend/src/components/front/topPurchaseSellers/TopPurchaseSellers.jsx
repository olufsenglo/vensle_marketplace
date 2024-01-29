import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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

const baseURL = "https://nominet.vensle.com/backend";

const TopPurchaseSellers = () => {
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
            activePill === 1 ? "bg-gray-900 text-white" : "bg-gray-200"
          }`}
          onClick={() => handlePillClick(1, 1, "")}
        >
          FOR SALE
        </button>
        <button
          className={`rounded py-1 px-4 text-sm transition duration-300 md:px-10 lg:py-2 ${
            activePill === 2 ? "bg-gray-900 text-white" : "bg-gray-200"
          }`}
          onClick={() => handlePillClick(2, 3, "request")}
        >
          REQUESTS
        </button>
        <button
          className={`rounded py-1 px-4 text-sm transition duration-300 md:px-10 lg:py-2 ${
            activePill === 3 ? "bg-gray-900 text-white" : "bg-gray-200"
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
          <div className="mb-10 flex min-h-[15rem] flex-col items-start bg-white lg:mb-0 lg:mt-0 lg:w-full lg:max-w-[26rem] lg:flex-shrink-0 lg:pr-8">
            <h2
              style={{ borderBottom: "2px solid red" }}
              className="block w-full pb-1 text-center text-xl font-normal uppercase tracking-tight text-gray-900 md:w-auto md:text-left md:text-2xl"
            >
              Top Purchases
            </h2>

            {products && products[0] && (
              <div
                onClick={(e) => handleProductQuickView(e, products[0])}
                style={{ background: "#f4f4f4a3" }}
                className="group relative mt-6 flex flex-1 flex-col rounded-md md:mt-10"
              >
                <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full flex-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                  {/*<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">*/}
                  <img
                    src={
                      products[0] && products[0].display_image
                        ? getImagePath(products[0].display_image.name)
                        : ""
                    }
                    alt={products.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="p-2">
                  <h2
                    className="line-clamp-2 text-lg font-medium text-gray-900"
                    style={{ fontWeight: "500", fontSize: "1rem" }}
                  >
                    {products[0] && products[0].name}
                  </h2>

                  <div className="mt-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          products[0].ratings > rating
                            ? "text-orange-900"
                            : "text-orange-200",
                          "h-3 w-3 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <div className="mt-2 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a onClick={(e) => handleModal(e, 11)} href="">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {products[0] && products[0].currency}{" "}
                          {products[0] && products[0].price}
                        </a>
                      </h3>
                    </div>

                    {products[0] && products[0].type == "grocery" ? (
                      <button
                        type="submit"
                        onClick={() => handleAddToCart(products[0])}
                        style={{ fontSize: "0.8rem" }}
                        className="bg-transparent hover:border-transparent rounded border border-orange-500 py-1 px-2 font-semibold text-orange-500 hover:bg-orange-500 hover:text-white"
                      >
                        ADD TO CART
                      </button>
                    ) : (
                      <p
                        className="text-black-200 flex items-center text-xs font-medium text-gray-700"
                        style={{ color: "#aaa" }}
                      >
                        <svg
                          class="mr-1 h-3 w-3 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>

                        {products[0].city}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
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
                  className={`px2 bg-transparent h-10 w-full items-center whitespace-nowrap border-b-2 text-center text-sm focus:outline-none md:w-auto ${
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

            <div className="mt-6 grid min-h-[15rem] grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-2 md:mt-10 lg:grid-cols-4 xl:gap-x-8">
              {!loading &&
                products.length > 0 &&
                products.map((product) => (
		      <>
			{product.type == "grocery" ? (
			  <Grocery product={product} />
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
