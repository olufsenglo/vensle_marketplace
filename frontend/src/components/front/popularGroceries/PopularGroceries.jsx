import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
    addToCart,
} from 'actions/actions';

import { StarIcon } from '@heroicons/react/20/solid'

import Grocery from 'components/front/product/Grocery';
import PreviewPopup from "components/front/previewPopup/PreviewPopup";

import img5 from "assets/img/front/categories/img5.JPG";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const baseURL = 'https://nominet.vensle.com/backend'
export default function PopularGroceries() {
	//const baseURL = 'https://nominet.vensle.com/backend';
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
  
    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

  const handleProductQuickView = (e, product) => {
      e.preventDefault();
      setSelectedProduct(product)
      setOpen(true);
  }

    const getImagePath = (product) => {
      return `${baseURL}/uploads/${product?.name}`;
    };

  const topProductsByType = async () => {
        const apiUrl = `${baseURL}/api/v1/products/top-by-type`;
   
     	try {
		setLoading(true)
	      const response = await axios.get(apiUrl, {
		params: {
			per_page: 5,
			type: 'grocery'
		},
	      });

	      setProducts(response.data.data);
		    setLoading(false);

	    } catch (error) {
	      console.error('Error fetching products:', error);
		    setLoading(false);
	    }
  }
    useEffect(() => {
	topProductsByType();
    }, []);

  return (
    <div className="bg-white min-h-[15rem] relative">

	  {selectedProduct && <PreviewPopup open={open} setOpen={setOpen} selectedProduct={selectedProduct} />}
	  
{!products.length &&
<div style={{"zIndex":"5", left:"0", right:"0", top:"0", bottom: "0"}} className="absolute flex justify-center items-center">
	
	<p>Loading...</p>
</div>
}
	  
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <h2 style={{"borderBottom":"2px solid red", "display":"inline"}} className="text-xl md:text-2xl font-normal pb-1 tracking-tight text-gray-900 uppercase">Most Popular in Groceries</h2>

        <div className="mt-6 md:mt-10 relative grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-8"
	>

          {products && products.map((product) => (
		    <Grocery product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
