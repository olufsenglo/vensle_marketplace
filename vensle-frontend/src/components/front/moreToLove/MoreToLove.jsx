import { Fragment, useState, useEffect } from "react";
import axios from "axios";

import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";

import Product from "components/front/product/Product";
import Grocery from "components/front/product/Grocery";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const baseURL = "https://nominet.vensle.com/backend";
const MoreToLove = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(15);

  const [open, setOpen] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/products/top-by-column`,
        {
          params: {
            per_page: perPage,
            column: "sold",
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
  }, [perPage]);

  return (
    <div style={{ minHeight: "30rem" }} className="relative bg-white">
      {!products && (
        <div
          style={{ zIndex: "5", left: "0", right: "0", top: "0", bottom: "0" }}
          className="absolute flex items-center justify-center"
        >
          <p>Loading...</p>
        </div>
      )}
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2
          style={{ borderBottom: "2px solid red" }}
          className="block pb-1 text-center text-xl font-normal uppercase tracking-tight text-gray-900 md:inline md:text-left md:text-2xl"
        >
          More to Love
        </h2>
        {products && (
          <>
            <div className="relative mt-6 grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
              {products.map((product) => (
                <>
                  {product.type == "product" ? (
                    <Product product={product} />
                  ) : (
                    <Grocery product={product} />
                  )}
                </>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                type="submit"
                onClick={() => setPerPage(perPage + 5)}
		disabled={loading}

              className="bg-transparent hover:border-transparent rounded border border-red-500 py-1 px-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white uppercase"
              >
		{loading ? "Loading..." : "Show More"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoreToLove;
