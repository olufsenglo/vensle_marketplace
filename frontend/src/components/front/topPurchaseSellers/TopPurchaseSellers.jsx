import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


import TabTopRequests from './TabTopRequests'
import TabTopCategories from './TabTopCategories'
import Categories from './Categories'

import {
    addToCart,
} from 'actions/actions';


import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'


import img1 from "assets/img/front/categories/img1.JPG";
import img2 from "assets/img/front/categories/img2.JPG";
import img3 from "assets/img/front/categories/img3.JPG";
import img4 from "assets/img/front/categories/img4.JPG";
import img5 from "assets/img/front/categories/img5.JPG";
import img6 from "assets/img/front/categories/img6.JPG";
import img7 from "assets/img/front/categories/img7.JPG";
import img8 from "assets/img/front/categories/img8.JPG";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const TopPurchaseSellers = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false)
    const [activePill, setActivePill] = useState(1);
    const [activeTab, setActiveTab] = useState(1);
    const [type, setType] = useState('');

  const [selectedImagePath, setSelectedImagePath] = useState(null);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleModal = (e, product) => {
	e.preventDefault();
	setSelectedProduct(product);
	setOpen(true);
//console.log("goooo", product)	    
	const sldImgPath = getImagePath(product.display_image.name)
	setSelectedImagePath(sldImgPath);
    }

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

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

    const handlePillClick = (pillNumber, tabNumber,  productType) => {
	setActivePill(pillNumber);
	setActiveTab(tabNumber);
	setType(productType);
    };

    const handleTabClick = (tabNumber, productType) => {
	setActiveTab(tabNumber);
	setType(productType);
    };

  const topProductsByType = async () => {
        const apiUrl = 'http://127.0.0.1:8000/api/v1/products/top-by-type';
    try {
      const response = await axios.get('http://localhost:8000/api/v1/products/top-by-type', {
        params: {
		per_page: 8,
		type
        },
      });

      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

    useEffect(() => {
	topProductsByType();
    }, [type]);

    return (
    	<div className="bg-white">


		<div className="flex pt-16 justify-center gap-5 items-center">
			<button 
	    			className={`rounded py-1 text-sm px-10 transition duration-300 ${
				activePill === 1 ? 'text-white bg-gray-900' : 'bg-gray-200'
				}`}
		                onClick={() => handlePillClick(1, 1, "")}
			>
				FOR SALE
			</button>
			<button 
	    			className={`rounded py-1 text-sm px-10 transition duration-300 ${
				activePill === 2 ? 'text-white bg-gray-900' : 'bg-gray-200'
				}`}
		                onClick={() => handlePillClick(2, 3, "request")}
			>
				REQUESTS
			</button>
			<button 
	    			className={`rounded py-1 text-sm px-10 transition duration-300 ${
				activePill === 3 ? 'text-white bg-gray-900' : 'bg-gray-200'
				}`}
		                onClick={() => handlePillClick(3, 4, "grocery")}
			>

				GROCERIES
			</button>
		</div>

	    {activePill === 1 && <Categories />}
	    {activePill === 2 && <TabTopRequests />}
	    {activePill === 3 && <TabTopCategories />}







		<div style={{minHeight:"30rem"}} className="mx-auto relative max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">

{!products.length &&
<div style={{"zIndex":"5", left:"0", right:"0", top:"0", bottom: "0"}} className="absolute flex justify-center items-center">
	<p>Loading...</p>
</div>
}


        	<div className="mx-auto lg:mx-0 lg:flex lg:max-w-none">
          		<div className="lg:mt-0 lg:pr-8 bg-white lg:w-full lg:max-w-md lg:flex-shrink-0">
        			<h2 style={{"borderBottom":"2px solid red", "display":"inline"}} className="text-2xl pb-1 font-normal tracking-tight text-gray-900 uppercase">Top Purchases</h2>

{products && products[0] &&
            <div style={{"background": "#f4f4f4a3"}} className="group mt-6 relative rounded-md">


<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
		  {/*<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">*/}
                <img
		  src={products[0] && products[0].display_image ? getImagePath(products[0].display_image.name) : ""}
		  alt={products.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
	      <div className="p-2">

		      <h2 className="text-lg font-medium text-gray-900" style={{"fontWeight": "500", "fontSize":"1rem"}}>
	    		{products[0] && products[0].name}
	    	      </h2>

		      <div className="mt-1 flex items-center">
			{[0, 1, 2, 3, 4].map((rating) => (
			  <StarIcon
			    key={rating}
			    className='text-orange-900 h-3 w-3 mr-1 flex-shrink-0'
			    aria-hidden="true"
			  />
			))}
		      </div>


		      <div className="mt-2 flex justify-between">
			<div>
			  <h3 className="text-sm text-gray-700">
			    <a onClick={(e) => handleModal(e, 11)} href="">
			      <span aria-hidden="true" className="absolute inset-0" />
	    		      {products[0] && products[0].price}
			      124.50
			    </a>
			  </h3>
			</div>

		    {products[0] && products[0].type == 'grocery' ?
			  <button
			    type="submit"
                    	    onClick={() => handleAddToCart(products[0])}
		  	    style={{"fontSize":"0.8rem"}}
			    className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-1 px-2 border border-orange-500 hover:border-transparent rounded"
			    >
			    ADD TO CART
			  </button>

			    :

			<p className="text-xs flex items-center text-black-200 font-medium text-gray-700" style={{"color":"#aaa"}}>
		  	
<svg class="h-3 w-3 mr-1 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>

		  		London
		  	</p>
		    }




		      </div>
	      </div>

            </div>

}
	    		</div>


                	<div className="w-full bg-white">

		<div className="lg:flex justify-between items-center">

	    			<h1 style={{"borderBottom":"2px solid red", "display":"inline"}} className="text-2xl pb-1 tracking-tight text-gray-900 sm:text-2xl">BEST SELLERS</h1>

                        <div class="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                            <button
	    			class={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none transition duration-300 ${
					activeTab === 1 ? 'text-red-600 border-red-500 dark:border-red-400 dark:text-red-300' : 'text-gray-700 border-transparent dark:text-white cursor-base hover:border-gray-400'
				}`}
		                onClick={() => handleTabClick(1, "")}
	    		     >
                                All Products
                            </button>


                            <button
	    			class={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none ${
					activeTab === 2 ? 'text-red-600 border-red-500 dark:border-red-400 dark:text-red-300' : 'text-gray-700 border-transparent dark:text-white cursor-base hover:border-gray-400'
				}`}
		                onClick={() => handleTabClick(2, "product")}
	    		     >
                                For Sale
                            </button>


                            <button
	    			class={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none ${
					activeTab === 3 ? 'text-red-600 border-red-500 dark:border-red-400 dark:text-red-300' : 'text-gray-700 border-transparent dark:text-white cursor-base hover:border-gray-400'
				}`}
		                onClick={() => handleTabClick(3, "request")}
	    		     >

                                Requests
                            </button>

                            <button
	    			class={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none ${
					activeTab === 4 ? 'text-red-600 border-red-500 dark:border-red-400 dark:text-red-300' : 'text-gray-700 border-transparent dark:text-white cursor-base hover:border-gray-400'
				}`}
		                onClick={() => handleTabClick(4, "grocery")}
	    		     >	    
                                Groceries
                            </button>
                        </div>


</div>


        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {products && products.map((product) => (
            <div onClick={(e) => handleModal(e, product)} key={product} style={{"background": "#f4f4f4a3"}} className="group relative rounded-md">
<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
		  {/*<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">*/}
                <img
		  src={getDisplayImage(product)}
		  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
	      <div className="p-2">
		      <h2 className="text-lg font-medium text-gray-900" style={{"fontWeight": "500", "fontSize":"1rem"}}>{product.name}</h2>

		      <div className="mt-1 flex items-center">
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


		      <div className="mt-2 flex justify-between">
			<div>
			  <h3 className="text-sm text-gray-700">
			    <a href={product.href}>
			      <span aria-hidden="true" className="absolute inset-0" />
			        ${product.price} 
			    </a>
			  </h3>
			</div>

		    {product && product.type == 'grocery' ?
			  <button
			    type="submit"
                    	    onClick={() => handleAddToCart(product)}
		  	    style={{"fontSize":"0.6rem"}}
			    className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-1 px-2 border border-orange-500 hover:border-transparent rounded"
			    >
			    ADD TO CART
			  </button>

			    :

			<p className="text-xs flex items-center text-black-200 font-medium text-gray-700" style={{"color":"#aaa"}}>
		  	
<svg class="h-3 w-3 mr-1 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>

		  		London
		  	</p>
		    }

		      </div>
	      </div>

            </div>
	  ))}
        </div>



			</div>
		</div>


	    </div>











    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-6xl md:px-4 lg:max-w-7xl">
                <div className="relative flex w-full rounded-3xl items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-1 lg:p-2">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>





    <div className="bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">



                <div className="w-full px-4">
                    <div className="sticky top-0 z-50 overflow-hidden ">
                        <div className="relative mb-6 lg:mb-10 lg:h-[28rem]">
                            <img
	    			src={selectedImagePath}
                          	//src={ selectedProduct ? getDisplayImage(selectedProduct) : ""}
                          	alt="x"
	    		     	style={{"width":"200rem", "padding": "0 8rem"}}
                             	className="object-cover w-full lg:h-full "
	    		    />
                        </div>
                        <div className="flex-wrap hidden md:flex ">


            {selectedProduct && selectedProduct.images.map((product) => (
                            <div className="w-1/2 p-2 sm:w-1/4">
		    {handleShowSelectedImage(product)}
                            </div>
	  ))}


                        </div>
                    </div>
                </div>




          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-5 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:pb-8 lg:pt:6">
              <div className="px-8">
		<h3 className="text-2xl mb-5 font-bold tracking-tight text-gray-900">
	    		{selectedProduct && selectedProduct.name}
	    	</h3>
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
                <h4 className="text-xl mt-3 mb-5 text-gray-600">${selectedProduct && selectedProduct.price}</h4>
                <h4 className="text-xl font-semibold text-gray-600">
			Product Details
		</h4>


            <p className="mt-3 text-base leading-7 text-gray-600">
              {selectedProduct && selectedProduct.description}
            </p>

			<p className="text-sm flex items-center text-black-200 font-medium text-gray-700 mt-3">
		  	
<svg class="h-3 w-3 mr-2 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>

		  		London
		  	</p>
			<p className="text-sm flex items-center text-black-200 font-medium text-gray-700 mt-3">
		  	
<svg class="h-3 w-3 mr-2 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>

		  		Posted 11 hours ago
		  	</p>

<div className="flex items-center">
                <a
                  href={`/product-detail/${selectedProduct && selectedProduct.id}`}
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
			MORE DETAILS
                </a>


                <a
                  href="#"
                  className="mt-10 ml-3 block rounded-md bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  call
                </a>
                <a
                  href="#"
                  className="mt-10 ml-3 block rounded-md bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  msg
                </a>
</div>	  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>















	</div>
	)
}

export default TopPurchaseSellers;
