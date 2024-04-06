import { useState, useEffect } from "react";
import axios from "axios";

import Product from "components/front/product/Product";
import Grocery from "components/front/product/Grocery";

const baseURL = "https://nominet.vensle.com/backend";
const NewUploads = () => {
  const [products, setProducts] = useState(null);
  const [column, setColumn] = useState("created_at");
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleTabClick = (tabNumber, column) => {
    setActiveTab(tabNumber);
    setColumn(column);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/products/top-by-column`,
        {
          params: {
            per_page: 15,
            column,
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
  }, [column]);

  return (
    <div className="relative bg-white">
      <div
        style={{ minHeight: "30rem" }}
        className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8"
      >
	  {console.log('loeaddme',loading)}
        {loading && (
          <div
            style={{
              zIndex: "5",
            }}
            className="absolute pt-[10%] top-[4rem] inset-0 bg-white flex justify-center"
          >
            <p>Loading...</p>
          </div>
        )}
        <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
	  
          <button
            className={`bg-transparent inline-flex h-10 items-center whitespace-nowrap border-b-2 pr-4 text-left font-normal text-xl transition duration-300 focus:outline-none sm:text-base md:text-2xl uppercase ${
              activeTab === 1
                ? "border-red-500 text-red-600 dark:border-red-400 dark:text-red-300"
                : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
            }`}
            onClick={() => handleTabClick(1, "created_at")}
          >
            New Uploads
          </button>

          <button
            className={`bg-transparent inline-flex h-10 items-center whitespace-nowrap border-b-2 px-4 text-center font-normal text-xl focus:outline-none sm:text-base md:text-2xl uppercase ${
              activeTab === 2
                ? "border-red-500 text-red-600 dark:border-red-400 dark:text-red-300"
                : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
            }`}
            onClick={() => handleTabClick(2, "ratings")}
          >
            Best Ratings
          </button>
        </div>

        <div className="relative mt-6 grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-10 lg:grid-cols-5 xl:gap-x-8">
          {products &&
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
  );
};

export default NewUploads;
