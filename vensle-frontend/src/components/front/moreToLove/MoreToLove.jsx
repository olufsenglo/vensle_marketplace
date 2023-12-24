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

const MoreToLove = () => {
    const [products, setProducts] = useState(null);
    const [perPage, setPerPage] = useState(15);


    const [open, setOpen] = useState(false)


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/products/top-by-column', {
	params: {
		per_page: perPage,
		column: "sold"
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
  }, [perPage]);

	return (
<>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-normal tracking-tight text-gray-900 uppercase">More to Love</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">


            {products && products.map((product) => (
		    <>
		    {product.type == 'product' ? <Product product={product} /> : <Grocery product={product} />}
		    </>
            ))}




        </div>
	<div className="text-center mt-8">
			  <button
			    type="submit"
                    	    onClick={() => setPerPage(perPage+5)}
			    className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-1 px-2 border border-orange-500 hover:border-transparent rounded"
			    >
			    SHOW MORE
			  </button>

	</div>

      </div>













</>
	)
}

export default MoreToLove;
