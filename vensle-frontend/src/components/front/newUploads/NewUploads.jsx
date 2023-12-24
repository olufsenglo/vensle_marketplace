import { Fragment, useState, useEffect } from 'react'
import axios from 'axios';

import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

import Product from './Product';
import Grocery from "./Grocery";

import img4 from "assets/img/front/categories/img4.JPG";
import img5 from "assets/img/front/categories/img5.JPG";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NewUploads = () => {
    const [products, setProducts] = useState(null);
    const [column, setColumn] = useState('created_at');
    const [activeTab, setActiveTab] = useState(1);

    const [open, setOpen] = useState(false)


    const handleTabClick = (tabNumber, column) => {
	setActiveTab(tabNumber);
	setColumn(column);
    };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/products/top-by-column', {
	params: {
		per_page: 15,
		column
	},
      });

      const products = response.data.data;
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [column]);

	return (
<>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">

                        <div class="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                            <button
				style={{"fontSize":"1.5rem"}}
	    			class={`inline-flex items-center h-10 pr-4 -mb-px text-2xl text-left bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none transition duration-300 ${
					activeTab === 1 ? 'text-red-600 border-red-500 dark:border-red-400 dark:text-red-300' : 'text-gray-700 border-transparent dark:text-white cursor-base hover:border-gray-400'
				}`}
		                onClick={() => handleTabClick(1, "created_at")}
	    		     >
                                NEW UPLOADS
                            </button>


                            <button
				style={{"fontSize":"1.5rem"}}
	    			class={`inline-flex items-center h-10 px-4 -mb-px text-2xl text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none ${
					activeTab === 2 ? 'text-red-600 border-red-500 dark:border-red-400 dark:text-red-300' : 'text-gray-700 border-transparent dark:text-white cursor-base hover:border-gray-400'
				}`}
		                onClick={() => handleTabClick(2, "ratings")}
	    		     >
                                BEST RATINGS
                            </button>


                        </div>


        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">

            {products && products.map((product) => (
		    <>
		    {product.type == 'product' ? <Product product={product} /> : <Grocery product={product} />}
		    </>
            ))}

        </div>
      </div>



</>
	)
}

export default NewUploads;
