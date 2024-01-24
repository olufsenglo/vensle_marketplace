import React, { Fragment, useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import PreviewPopup from "components/front/previewPopup/PreviewPopup";

import img5 from "assets/img/front/categories/img5.JPG";

import Product from 'components/front/product/Product';
import Grocery from 'components/front/product/Grocery';

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
      return `https://nominet.vensle.com/backend/uploads/${name}`;
    };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-normal tracking-tight text-gray-900">More like this</h2>

	  {selectedProduct && <PreviewPopup open={open} setOpen={setOpen} selectedProduct={selectedProduct} />}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
		    <>
		    {product.type == 'product' ? <Product product={product} height="14" /> : <Grocery product={product} height="14" />}
		    </>
          ))}
        </div>
      </div>

      



    </div>
  )
}
