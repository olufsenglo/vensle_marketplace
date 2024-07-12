import { useEffect, useState } from "react"
import axios from "axios"

import useFetch from "hooks/useFetch"
import SwipeProducts from "components/front/swipeProducts/SwipeProducts"
import PreviewPopup from "components/front/previewPopup/PreviewPopup";

const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

const NewUploadsBestRatings = () => {
  const [products, setProducts] = useState(null);
  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);

  const [column, setColumn] = useState("created_at");
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductQuickView = (e, product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleTabClick = (tabNumber, column) => {
    setActiveTab(tabNumber);
    setColumn(column);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiBaseURL}/products/top-by-column`,
        {
          params: {
            per_page: 18,
            column,
          },
        }
      );

      const fetchedProducts = response.data.data;
      setProducts(fetchedProducts);

	// Only divide the products if there are more than 9
	if (fetchedProducts.length > 9) {
	    const half = Math.ceil(fetchedProducts.length / 2);
	    setFirstHalf(fetchedProducts.slice(0, half));
	    setSecondHalf(fetchedProducts.slice(half));
	} else {
	    setFirstHalf(fetchedProducts);
	    setSecondHalf([]);
	}

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

      {selectedProduct && (
        <PreviewPopup
          open={open}
          setOpen={setOpen}
          selectedProduct={selectedProduct}
        />
      )}

         <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:pt-6 pb-6 lg:max-w-7xl lg:px-8">
	    <div>
	        <h2
            	   onClick={() => handleTabClick(1, "created_at")}
	    	   className={`pr-3 cursor-pointer border-b-2 hover:border-primaryColor/50 lg:text-xl font-semibold uppercase tracking-tight text-gray-900 inline text-left ${activeTab === 1 ? "border-primaryColor":"text-gray-700 border-white"}`}
                >
	            New Uploads
                </h2>
	        <h2
            	   onClick={() => handleTabClick(2, "ratings")}
	    	   className={`pr-3 ml-3 cursor-pointer border-b-2 hover:border-primaryColor/50 lg:text-xl md:text-xl font-semibold uppercase tracking-tight text-gray-900 inline text-left ${activeTab === 2 ? "border-primaryColor" : "text-gray-700 border-white"}`}
                >
	            Best Ratings
                </h2>
	    </div>
	    <SwipeProducts
	    	loading={loading}
	    	products={firstHalf}
	    	handleProductQuickView={handleProductQuickView}
	    />
	    <SwipeProducts
	    	loading={loading}
	    	products={secondHalf}
	    	handleProductQuickView={handleProductQuickView}
	    />
	</div>
      </div>
    )
}

export default NewUploadsBestRatings;
