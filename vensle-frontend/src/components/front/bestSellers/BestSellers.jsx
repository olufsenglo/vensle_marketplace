import { useEffect, useState, useRef } from "react"
import axios from "axios"

import SwipeProducts from "components/front/swipeProducts/SwipeProducts"

const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiBaseURL}/products/top-by`,
        {
          params: {
            type: 'grocery',
            column: 'sold',
            duration: 'subYear',
            per_page: 9,
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
         <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
	     <SwipeProducts title="Best Sellers" loading={loading} products={products} type="grocery" />
	</div>
      </div>
    )
}

export default BestSellers;
