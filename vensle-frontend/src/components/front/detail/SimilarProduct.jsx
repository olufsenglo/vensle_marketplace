import React, { Fragment, useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import PreviewPopup from "./PreviewPopup";

import img5 from "assets/img/front/categories/img5.JPG";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SimilarProducts({ products }) {
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleProductQuickView = (e, product) => {
      e.preventDefault();
      setSelectedProduct(product)
      setOpen(true);
  }

    const getImagePath = (name) => {
      return `http://127.0.0.1:8000/uploads/${name}`;
    };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-normal tracking-tight text-gray-900">More like this</h2>

	  {selectedProduct && <PreviewPopup open={open} setOpen={setOpen} selectedProduct={selectedProduct} />}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a onClick={(e) => handleProductQuickView(e, product)} key={product.id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.display_image && getImagePath(product.display_image.name)}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      product.ratings > rating ? 'text-orange-900' : 'text-orange-200',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-between items-center">
                <p className="text-md font-medium text-orange-900">{product.price}</p>
                <p className="text-sm font-medium text-gray-900">London</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      



    </div>
  )
}
