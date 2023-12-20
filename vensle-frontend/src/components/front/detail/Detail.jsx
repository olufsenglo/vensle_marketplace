import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'

import SimilarProduct from "./SimilarProduct";


import seller from "assets/img/front/productDetail/seller.jpg";

const breadProduct = {
  name: 'Basic Tee 6-Pack',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState(null);
  const [selectedImagePath, setSelectedImagePath] = useState(null);


    const getDisplayImage = (product) => {
      const displayImage = product.images.find(image => image.id === product.display_image_id);
      return displayImage ? `http://127.0.0.1:8000/uploads/${displayImage.name}` : '';
    };

    const getImagePath = (name) => {
      return `http://127.0.0.1:8000/uploads/${name}`;
    };

   const handleSetSelectedImagePath = (e, thumbnail) => {
	e.preventDefault();
	setSelectedImagePath(thumbnail)
   }

   const handleShowSelectedImage = (productImage) => {
   	const thumbnail = getImagePath(productImage.name);

	return (<a onClick={(e) => handleSetSelectedImagePath(e, thumbnail)} href="#"
	    class="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
	    <img
	      src={thumbnail} 
	      alt={productImage.name}
	      class="object-cover w-full lg:h-20"
	    />
	</a>)
   }

  useEffect(() => {
  
    const fetchProduct = async () => {
      try {
	const response = await axios.get(`http://localhost:8000/api/v1/products/${productId}`);
        
	setProduct(response.data.product);
	setSimilarProducts(response.data.similarProducts);

        const defaultPath = getDisplayImage(response.data.product);
        //console.log(defaultPath)
	setSelectedImagePath(defaultPath);

      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  //if (!proaduct) {
	//
    //return <div>Loading...</div>;
  //}

    return (

    <div className="bg-white">
{console.log("sssss",selectedImagePath)}	    
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {breadProduct.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href="" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {breadProduct.name}
              </a>
            </li>
          </ol>
        </nav>


        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 bg-white">
            <h1 className="text-2xl tracking-tight text-gray-900 sm:text-2xl">{product && product.name}</h1>



                <div class="w-full mt-10">
                    <div class="sticky top-0 z-50 overflow-hidden ">
                        <div class="relative mb-6 lg:mb-10 lg:h-2/4 px-10">
                            <img 
	    			src={selectedImagePath }
	    			alt={product && product.name}
                                class="object-cover w-full lg:h-full "
	    		    />
                        </div>
                        <div class="flex-wrap hidden md:flex ">
	    
            {product && product.images.map((productImage) => (
                            <div class="w-1/2 p-2 sm:w-1/4">
				{handleShowSelectedImage(productImage)}
                            </div>
    	    ))}

                        </div>
                    </div>
                </div>


	  <div className="flex items-center">
		<p className="text-sm flex items-center text-black-200 font-medium text-gray-700 mt-8">
		
<svg class="h-3 w-3 mr-2 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>
	  		Posted 11 hours ago
		</p>
		<p className="text-sm flex items-center text-black-200 font-medium text-gray-700 mt-8">
		
<svg class="h-3 w-3 mr-2 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>
			11 views
		</p>
	</div>


          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
	      <h3 className="font-bold tracking-tight text-gray-900 text-lg">Condition</h3>
              <div className="mt-2 space-y-6">
                <p className="text-base text-gray-900">product.description</p>
              </div>
            </div>

            <div className="mt-10">
	      <h3 className="font-bold tracking-tight text-gray-900 text-lg">Product Details</h3>
              <div className="mt-2 space-y-6">
                <p className="text-base text-gray-900">product.description</p>
              </div>
            </div>

            <div className="mt-10">
	      <h3 className="text-lg font-bold tracking-tight text-gray-900">Key Specifications</h3>

              <div className="mt-2">
                <ul role="list" className="list-disc space-y-2 pl-6">
                    <li className="text-gray-900">
                      <span className="">highlight</span>
                    </li>
                    <li className="text-gray-900">
                      <span className="">highlight</span>
                    </li>
                </ul>
              </div>
            </div>
	  </div>



          </div>

	  

          <div className="lg:row-span-3 lg:mt-0 bg-white">

<div className="flex items-center">
		      <div className="flex items-center">
			{[0, 1, 2, 3, 4].map((rating) => (
			  <StarIcon
			    key={rating}
			    className='text-orange-900 h-3 w-3 mr-1 flex-shrink-0'
			    aria-hidden="true"
			  />
			))}
		      </div>

                <p className="text-sm leading-5 text-gray-600">
	  		<span className="text-gray-400">4.0</span> (16 Feedbacks)
                </p>
</div>
<p className="text-lg font-bold mt-3 tracking-tight text-gray-900">
	${product && product.price}
</p>


	  <div className="flex items-center mt-4">
		  <img src={seller} alt="seller" />
		  <div className="ml-4">
		    <h3 className="text-lg tracking-tight text-gray-900 sm:text-lg">Absolutely Anything Store</h3>
		    <h4 className="text-lg tracking-tight text-gray-400 sm:text-lg">Ibrahim Jonas</h4>
	  	</div>
	  </div>

		<p className="text-sm flex items-center text-black-200 font-medium text-gray-700 mt-8">
		
<svg class="h-3 w-3 mr-2 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>
			61 Church Street Manchester M4 IPD
		</p>

                <a
                  href="#"
                  className="mt-8 block w-full rounded-md bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  View Contact
                </a>
                <a
                  href="#"
                  className="mt-6 block w-full rounded-md bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  View FEEDBACKS (20)
                </a>
                <a
                  href="#"
                  className="mt-6 block w-full rounded-md bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  SEND A MESSAGE
                </a>



          </div>

        </div>
      </div>

      {product && <SimilarProduct products={similarProducts} />}


    </div>
	    


    )
}

export default ProductDetail
