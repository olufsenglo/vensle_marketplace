import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    addToCart,
} from 'actions/actions';

import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

import PreviewPopup from "components/front/previewPopup/PreviewPopup";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const baseURL = 'https://nominet.vensle.com/backend'
export default function Grocery({ product, height }) {


const displayImageId = product?.display_image?.id;
if (product.images.length > 0 && displayImageId ) {
// Find the index of the display_image in the images array
const displayImageIndex = product.images.findIndex(img => img.id === displayImageId);

// Rearrange the images array if display_image is found
const rearrangedImages = displayImageIndex !== -1
  ? [
      product.images[displayImageIndex],
      ...product.images.slice(0, displayImageIndex),
      ...product.images.slice(displayImageIndex + 1),
    ]
  : product.images;

// Update the product object with rearranged or unchanged images
product = {
  ...product,
  images: rearrangedImages,
};

console.log("gupppppa", product);	
}


  const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const handleProductQuickView = (e, product) => {
        e.preventDefault();
        setSelectedProduct(product)
        setOpen(true);
    }
  
    const handleAddToCart = (e, product) => {
        e.preventDefault();
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    const getImagePath = (product) => {
      return `${baseURL}/uploads/${product.name}`;
    };

  return (
    <>
	  {selectedProduct && <PreviewPopup open={open} setOpen={setOpen} selectedProduct={selectedProduct} />}

            <div key={product.id} style={{"background": "#f4f4f4a3"}} className="group flex flex-col rounded-lg">


                <div
	  	    onClick={(e) => handleProductQuickView(e, product)}
	  	    className="flex-1 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
	    	>
                    <div 
	  		className={`relative w-full h-full cursor-pointer flex overflow-hidden rounded-xl ${
				height ? `lg:h-[${height}rem]` : "lg:h-40"
			}`}
	   	    >
                        <img
                          className="peer absolute group-hover:opacity-75 top-0 right-0 h-full w-full object-cover"
		  	  src={product.display_image && getImagePath(product.display_image)}
                          alt={product.name}
                        />
		  {product.images && product.images[1] ? <img className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src={getImagePath(product.images[1])} alt="product image" /> : ""}

                    </div>
                </div>

	      <div className="p-2">
		      <h2 className="text-lg line-clamp-1 font-medium text-gray-900" style={{"fontWeight": "500", "fontSize":"0.95rem"}}>{product.name}</h2>



              <div className="flex flex-col md:flex-row justify-between mb-1">
                <div className="flex flex-col justify-between">
                  
		      <div className="flex items-center">
			{[0, 1, 2, 3, 4].map((rating) => (
			  <StarIcon
			    key={rating}
                    className={classNames(
                      product.ratings > rating ? 'text-orange-900' : 'text-orange-200',
                      'h-3 w-3 flex-shrink-0'
                    )}
			    aria-hidden="true"
			  />
			))}
		      </div>
		      <p className="text-sm mt-1 text-red-600">
	  {product.currency} {product.price}
	  </p>
                </div>

			  <button
			    type="submit"
                    	    onClick={(e) => handleAddToCart(e, product)}
		  	    style={{"fontSize":"0.8rem"}}
			    className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded"
			    >
			    ADD TO CART
			  </button>
              </div>	  



               </div>
            </div>
    </>
  )
}
