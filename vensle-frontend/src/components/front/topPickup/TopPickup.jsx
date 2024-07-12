import { useEffect, useState } from "react"
import axios from "axios"

import SwipeProducts from "components/front/swipeProducts/SwipeProducts"

const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

const TopPickup = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiBaseURL}/products/top-sellers-products-request`,
        {
          params: {
  	    type: 'product',
            duration: 'subYear',
            per_page: 9,
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
         <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
	    <SwipeProducts title="Top Pickup" loading={loading} products={products} />
	</div>
      </div>
    )
}

export default TopPickup;
