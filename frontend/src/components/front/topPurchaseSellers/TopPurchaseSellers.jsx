import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import TabTopRequests from './TabTopRequests'
import TabTopCategories from './TabTopCategories'
import Categories from './Categories'
import PreviewPopup from "components/front/previewPopup/PreviewPopup";

import {
    addToCart,
} from 'actions/actions';


import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const baseURL = 'http://localhost:8000';

const TopPurchaseSellers = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
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
	const sldImgPath = getImagePath(product.display_image.name)
	setSelectedImagePath(sldImgPath);
    }

  const handleProductQuickView = (e, product) => {
      e.preventDefault();
      setSelectedProduct(product)
      setOpen(true);
  }

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
	setLoading(true);
        const apiUrl = `${baseURL}/api/v1/products/top-by-type`;
    try {
      const response = await axios.get(`${baseURL}/api/v1/products/top-by-type`, {
        params: {
		per_page: 8,
		type
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
    }, [type]);

    return (
    	<div className="bg-white relative z-1">

	  {selectedProduct && <PreviewPopup open={open} setOpen={setOpen} selectedProduct={selectedProduct} />}

		<div className="flex pt-16 justify-center gap-2 md:gap-5 items-center">
			<button 
	    			className={`rounded py-1 text-xs md:text-sm px-4 md:px-10 transition duration-300 ${
				activePill === 1 ? 'text-white bg-gray-900' : 'bg-gray-200'
				}`}
		                onClick={() => handlePillClick(1, 1, "")}
			>
				FOR SALE
			</button>
			<button 
	    			className={`rounded py-1 text-sm px-4 md:px-10 transition duration-300 ${
				activePill === 2 ? 'text-white bg-gray-900' : 'bg-gray-200'
				}`}
		                onClick={() => handlePillClick(2, 3, "request")}
			>
				REQUESTS
			</button>
			<button 
	    			className={`rounded py-1 text-sm px-4 md:px-10 transition duration-300 ${
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

{loading &&
<div style={{"zIndex":"5", left:"0", right:"0", top:"0", bottom: "0"}} className="absolute flex justify-center items-center">
	<p>Loading...</p>
</div>
}

{!loading && products.length == 0 &&
<div style={{"zIndex":"5", left:"0", right:"0", top:"90px", bottom: "0"}} className="absolute flex justify-center items-center">
		{activeTab == 1 || activeTab == 2 && <p>There are currently no products</p>}
		{activeTab == 3 && <p>There are Requests no products</p>}
		{activeTab == 4 && <p>There are Groceries</p>}
</div>
}

        	<div className="mx-auto lg:mx-0 lg:flex lg:max-w-none">
          		<div className="flex flex-col mb-10 md:mb-0 items-start lg:mt-0 lg:pr-8 bg-white lg:w-full lg:max-w-md lg:flex-shrink-0">
        			<h2 style={{"borderBottom":"2px solid red"}} className="text-2xl w-full md:w-initial block text-center md:text-left pb-1 font-normal tracking-tight text-gray-900 uppercase">Top Purchases</h2>

{products && products[0] &&
            <div
		onClick={(e) => handleProductQuickView(e, products[0])}
		style={{"background": "#f4f4f4a3"}}
		className="group flex flex-col flex-1 mt-6 relative rounded-md"
	    >


<div className="flex-1 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
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
			    className={classNames(
			      products[0].ratings > rating ? 'text-orange-900' : 'text-orange-200',
			      'h-3 w-3 flex-shrink-0'
			    )}
			    aria-hidden="true"
			  />
			))}
		      </div>


		      <div className="mt-2 flex justify-between">
			<div>
			  <h3 className="text-sm text-gray-700">
			    <a onClick={(e) => handleModal(e, 11)} href="">
			      <span aria-hidden="true" className="absolute inset-0" />
			        {products[0] && products[0].currency} {products[0] && products[0].price}
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

			    {products[0].city}
		  	</p>
		    }




		      </div>
	      </div>

            </div>

}
	    		</div>


                	<div className="w-full bg-white">

		<div className="lg:flex justify-between items-center">

	    			<h1 style={{"borderBottom":"2px solid red"}} className="text-2xl block md:inline text-center mb-4 md:mb-0 md:text-left pb-1 tracking-tight text-gray-900 sm:text-2xl">BEST SELLERS</h1>

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



        <div className="mt-6 grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {!loading && products.length > 0 && products.map((product) => (
            <div
		    key={product}
		    style={{"background": "#f4f4f4a3"}}
		    className="group cursor-pointer relative rounded-md"
	    >
<div  className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
                <img onClick={(e) => handleProductQuickView(e, product)}
		  src={getImagePath(product.display_image?.name)}
		  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
	      <div className="p-2">
		      <h2 className="text-lg font-medium line-clamp-2 text-gray-900" style={{"fontWeight": "500", "fontSize":"1rem"}}>{product.name}</h2>

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
			        {product.currency} {product.price} 
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

		  		{product.city}
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













	</div>
	)
}

export default TopPurchaseSellers;
