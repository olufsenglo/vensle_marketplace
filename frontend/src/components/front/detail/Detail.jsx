import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PhoneIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';

import Feedback from './Feedback';
import Message from './Message';

import {
    addToCart,
} from 'actions/actions';

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
  const baseURL = 'https://nominet.vensle.com/backend';
	
  const dispatch = useDispatch();

  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState(null);
  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const [open, setOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
   const [previewImage, setPreviewImage] = useState(null);
   const [showContact, setShowContact] = useState(false);
  const [loading, setLoading] = useState(false);

    const delim = '^%*#$';

    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    const getDisplayImage = (product) => {
      const displayImage = product.images.find(image => image.id === product.display_image_id);
      return displayImage ? `${baseURL}/uploads/${displayImage.name}` : '';
    };

    const getImagePath = (name) => {
      return `${baseURL}/uploads/${name}`;
    };

   const handleSetSelectedImagePath = (e, thumbnail, index) => {
	e.preventDefault();
	setImgIndex(index);
	setPreviewImage(thumbnail);
   }

   const handleShowSelectedImage = (productImage, index) => {
   	const thumbnail = getImagePath(productImage.name);

	return (<a onClick={(e) => handleSetSelectedImagePath(e, thumbnail, index)} href="#"
	    className={`block border-2 rounded-lg overflow-hidden dark:border-transparent dark:hover:border-blue-300 hover:border-red-300 ${
		index == imgIndex ? 'border-red-300' : 'border-transparent'
	    }`}>
	    <img
	      src={thumbnail} 
	      alt={productImage.name}
	      class="object-cover w-full lg:h-20"
	    />
	</a>)
   }

   const handleNextPreviewImage = () => {
	   const selectedIndexLen = product.images.length - 1
	   const index = (imgIndex + 1) > selectedIndexLen ? 0 : imgIndex + 1;
	   setImgIndex(index);
	   const path = getImagePath(product.images[index].name)
	   setPreviewImage(path)
   }

   const handlePreviousPreviewImage = () => {
	   const selectedIndexLen = product.images.length - 1
	   const index = (imgIndex - 1) < 0 ? selectedIndexLen : imgIndex - 1;
	   setImgIndex(index);
	   const path = getImagePath(product.images[index].name)
	   setPreviewImage(path)
   }

    const handleShowFeedback = (e) => {
	    e.preventDefault();
	    setOpen(true);
    }

    const handleShowMessage = (e) => {
	    e.preventDefault();
	    setMessageOpen(true);
    }

  useEffect(() => {
  
    const fetchProduct = async () => {
      try {
	setLoading(true);
	const response = await axios.get(`${baseURL}/api/v1/products/${productId}`);
        
	setProduct(response.data.product);
	setSimilarProducts(response.data.similarProducts);

        const defaultPath = getDisplayImage(response.data.product);
	setPreviewImage(defaultPath);
	setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
	setLoading(false);
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

<Feedback open={open} setOpen={setOpen} productId={product?.id} />	    
<Message open={messageOpen} setOpen={setMessageOpen} product={product} />	    

      <div style={{minHeight: "75vh"}} className="pt-6 relative">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {breadProduct.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link to={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </Link>
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
              <Link to="" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {breadProduct.name}
              </Link>
            </li>
          </ol>
        </nav>


	    {loading &&
		    <p
	     		style={{top: "30vh"}}
	    		className="absolute left-0 right-0 text-center"
	            >
		       Loading
		    </p>
	    }

	    {!loading && product &&
		    <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-4 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
          <div className="lg:col-span-3 lg:border-r lg:border-gray-200 lg:pr-8 bg-white">

            
	    <h1 className="text-2xl tracking-tight text-gray-900 sm:text-2xl">{product && product.name}</h1>



                <div class="w-full mt-10">
                    <div class="sticky top-0 overflow-hidden ">
                        <div class="relative mb-6 lg:mb-10 lg:h-[28rem] px-10">
	<span className="absolute left-0 cursor-pointer" style={{top: "50%"}} onClick={handlePreviousPreviewImage}>
		<ChevronLeftIcon className="h-8 w-8"/>
	</span>
                            <img 
				src={previewImage}
	    			alt={product && product.name}
                                className="object-cover w-full lg:h-full px-6"
	    		    />
	<span className="absolute right-0 cursor-pointer" style={{top: "50%"}} onClick={handleNextPreviewImage}>
		<ChevronRightIcon className="h-8 w-8"/>
        </span>
                        </div>
	    


	<Slider {...settings}>
            		    {product && product.images.map((productImage, index) => (
					    <div className="p-2">
						{handleShowSelectedImage(productImage, index)}
					    </div>
			     ))}
	</Slider>
	    

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
	    {product && product.views} view[s]
		</p>
	</div>


          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
	      <h3 className="font-bold tracking-tight text-gray-900 text-lg">Condition</h3>
              <div className="mt-2 space-y-6">
                <p className="text-base text-gray-900">{product && product.condition}</p>
              </div>
            </div>

            <div className="mt-10">
	      <h3 className="font-bold tracking-tight text-gray-900 text-lg">Product Details</h3>
              <div className="mt-2 space-y-6">
                <p className="text-base text-gray-900">{product && product.description}</p>
              </div>
            </div>

            <div className="mt-10">
	      <h3 className="text-lg font-bold tracking-tight text-gray-900">Key Specifications</h3>
              <div className="mt-2">
			<ul role="list" className="list-disc space-y-2 pl-6">
			  {product && product.key_specifications && product.key_specifications.split(delim).map((specification, index) => (
			    <li key={index} className="text-gray-900">
			      <span className="">{specification.trim()}</span>
			    </li>
			  ))}
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
                    className={classNames(
                      product && product.ratings > rating ? 'text-orange-900' : 'text-orange-200',
                      'h-3 w-3 flex-shrink-0'
                    )}
			    aria-hidden="true"
			  />
			))}
		      </div>

                <p className="text-sm leading-5 text-gray-600">
	  		<span className="text-gray-400">{product.ratings}</span> ({product && product.total_feedback} Feedback{product && product.total_feedback > 1 && 's'})
                </p>
</div>
<p className="text-lg font-bold mt-3 tracking-tight text-gray-900">
	${product && product.price}
</p>
	{product && product.type == 'grocery' &&
			  <button
                    	    onClick={() => handleAddToCart(product)}
		  	    style={{"fontSize":"0.8rem"}}
			    className="bg-transparent w-full hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-3 mt-4 px-2 border border-orange-500 hover:border-transparent rounded"
			    >
			    ADD TO CART
			  </button>
	}
	
<div>
	  <Link href={`/user-profile/${product?.user_id}/products`} className="flex items-center mt-4">

		  <img src={seller} alt="seller" />
		  <div className="ml-4">
		    <h3 className="text-lg tracking-tight text-gray-900 sm:text-lg">Absolutely Anything Store</h3>
		    <h4 className="text-lg tracking-tight text-gray-400 sm:text-lg">Ibrahim Jonas</h4>
	  	</div>
	  </Link>

		<p className="text-sm flex items-center text-black-200 font-medium text-gray-700 mt-8">
		
<svg class="h-3 w-3 mr-2 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>
			    {product.address}
		</p>

                <span
		    onClick={() => setShowContact(true)}
                  className="mt-8 cursor-pointer block w-full rounded-md bg-red-600 px-3 py-3 text-center text-sm text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
			    {showContact ?
				    product.phone_number
				    : 
				    <span className="flex justify-center items-center">
				    	<PhoneIcon className="h-4 w-4 mr-4"/> VIEW CONTACT
				    </span>
			    }
                </span>
                <a
                  href="#"
		  onClick={(e) => handleShowFeedback(e)}
                  className="mt-6 block w-full rounded-md border border-red-600 bg-white px-3 py-3 text-center text-sm text-red-600 hover:text-white hover:border-red-500 shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
				    <span className="flex justify-center items-center">
		  			<ChatBubbleBottomCenterTextIcon className="h-4 w-4 mr-4"/> VIEW FEEDBACKS (20)
				    </span>
                </a>
                <a
                  href="#"
		  onClick={(e) => handleShowMessage(e)}
                  className="mt-6 block w-full rounded-md px-3 py-3 text-center text-sm text-red-600 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  SEND A MESSAGE
                </a>
</div>


          </div>

        </div>
      }

      </div>

      {product && <SimilarProduct products={similarProducts} />}


    </div>
	    


    )
}

export default ProductDetail
