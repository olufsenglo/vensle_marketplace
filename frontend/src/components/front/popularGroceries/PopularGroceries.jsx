import React, { useEffect, useState } from "react";
import axios from "axios";

import Grocery from "components/front/product/Grocery";
import PreviewPopup from "components/front/previewPopup/PreviewPopup";

const baseURL = "http://localhost:8000"
export default function PopularGroceries() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const topProductsByType = async () => {
    const apiUrl = `${baseURL}/api/v1/products/top-by-type`;

    try {
      setLoading(true);
      const response = await axios.get(apiUrl, {
        params: {
          per_page: 5,
          type: "grocery",
        },
      });

      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    topProductsByType();
  }, []);

  return (
    <div className="relative min-h-[15rem] bg-white">
      {selectedProduct && (
        <PreviewPopup
          open={open}
          setOpen={setOpen}
          selectedProduct={selectedProduct}
        />
      )}

      {!products.length && (
        <div
          style={{ zIndex: "5", left: "0", right: "0", top: "0", bottom: "0" }}
          className="absolute flex items-center justify-center"
        >
          <p>Loading...</p>
        </div>
      )}

      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <h2
          style={{ borderBottom: "2px solid red", display: "inline" }}
          className="pb-1 text-xl font-normal uppercase tracking-tight text-gray-900 md:text-2xl"
        >
          Most Popular in Groceries
        </h2>

        <div className="relative mt-6 grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-3 md:mt-10 lg:grid-cols-5 xl:gap-x-8">
          {products && products.map((product) => <Grocery product={product} />)}
        </div>
      </div>
    </div>
  );
}
