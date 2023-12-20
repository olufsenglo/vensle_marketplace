import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
    addToCart,
} from 'actions/actions';

import { StarIcon } from '@heroicons/react/20/solid'
import img5 from "assets/img/front/categories/img5.JPG";

export default function PopularGroceries() {
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
  
    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    const getDisplayImage = (product) => {
      const displayImage = product.images.find(image => image.id === product.display_image_id);
      return displayImage ? `http://127.0.0.1:8000/uploads/${displayImage.name}` : '';
    };

    const getImagePath = (product) => {
      return `http://127.0.0.1:8000/uploads/${product.name}`;
    };

    useEffect(() => {
        const apiUrl = 'http://127.0.0.1:8000/api/v1/products';
    
        axios.get(apiUrl)
          .then(response => {
            setProducts(response.data.data);
            console.log(response.data.data);
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
    }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <h2 style={{"borderBottom":"2px solid red", "display":"inline"}} className="text-2xl font-normal pb-1 tracking-tight text-gray-900 uppercase">most poplar in groceries</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">

          {products && products.map((product) => (
            <a key={product.id} href={product.href} style={{"background": "#eee"}} className="group">


		  {/*	      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">

                <img
                  src={getDisplayImage(product)}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
	      */}


                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <a class="relative flex h-60 overflow-hidden rounded-xl" href="#">
                        <img
                          class="peer absolute group-hover:opacity-75 top-0 right-0 h-full w-full object-cover"
                          src={getDisplayImage(product)}
                          alt={product.name}
                        />
		  {product.images && product.images[1] ? <img className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src={getImagePath(product.images[0])} alt="product image" /> : ""}

                    </a>
                </div>

	      <div className="py-1 px-2">
		      <h2 className="text-lg font-medium text-gray-900" style={{"fontWeight": "500", "fontSize":"0.95rem"}}>{product.name}</h2>



              <div className="flex justify-between mb-1">
                <div className="flex flex-col justify-between">
                  
		      <div className="flex items-center">
			{[0, 1, 2, 3, 4].map((rating) => (
			  <StarIcon
			    key={rating}
			    className='text-orange-900 h-3 w-3 mr-1 flex-shrink-0'
			    aria-hidden="true"
			  />
			))}
		      </div>
		      <p className="text-sm mt-1 font-medium text-orange-900" style={{"fontSize":"0.75rem"}}>${product.price}</p>
                </div>

			  <button
			    type="submit"
                    	    onClick={() => handleAddToCart(product)}
		  	    style={{"fontSize":"0.8rem"}}
			    className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-1 px-2 border border-orange-500 hover:border-transparent rounded"
			    >
			    ADD TO CART
			  </button>
              </div>	  



               </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
