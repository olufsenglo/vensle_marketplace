import { useEffect, useState } from "react"
import axios from "axios"

import useFetch from "hooks/useFetch"
import SwipeProducts from "components/front/swipeProducts/SwipeProducts"
import PreviewPopup from "components/front/previewPopup/PreviewPopup";

const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

const TopSellers = () => {
  const [products, setProducts] = useState(null);
  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);

  const [activeTab, setActiveTab] = useState(1);
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
            column: 'views',
	    duration: 'subYear',
            per_page: 18,
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
	    <SwipeProducts
	  	loading={loading}
	  	products={firstHalf}
	  	title="Top Sellers"
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

export default TopSellers;
