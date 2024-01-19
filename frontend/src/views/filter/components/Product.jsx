import { Fragment, useEffect, useState } from 'react'

import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

import PreviewPopup from "components/front/previewPopup/PreviewPopup";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Product = ({ product }) => {
  const baseURL = 'http://nominet.vensle.com/backend';
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleProductQuickView = (e, product) => {
      e.preventDefault();
      setSelectedProduct(product)
      setOpen(true);
  }

    const getDisplayImage = (product) => {
      const displayImage = product.images.find(image => image.id === product.display_image_id);
      //Utilize getImagePath
      return displayImage ? `${baseURL}/uploads/${displayImage.name}` : '';
    };


    const getImagePath = (name) => {
      return `${baseURL}/uploads/${name}`;
    };

	return (
<>
	  {selectedProduct && <PreviewPopup open={open} setOpen={setOpen} selectedProduct={selectedProduct} />}
		
            <div key={product.id} style={{"background": "#f4f4f4a3"}} className="group relative rounded-md">
<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
                <img
		  onClick={(e) => handleProductQuickView(e, product)}
		  src={product.display_image && getImagePath(product.display_image.name)}
		  alt={product.name}
                  className="h-full cursor-pointer w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
	      <div className="p-2">
		      <h2 className="text-lg line-clamp-2 font-medium text-gray-900" style={{"fontWeight": "500", "fontSize":"1rem"}}>{product.name}</h2>

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
			        ${product.price} 
			    </a>
			  </h3>
			</div>
			<p className="text-xs flex items-center text-black-200 font-medium text-gray-700" style={{"color":"#aaa"}}>
		  	
<svg class="h-3 w-3 mr-1 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>

		  		London
		  	</p>
		      </div>
	      </div>

            </div>

</>

	)
}

export default Product;
