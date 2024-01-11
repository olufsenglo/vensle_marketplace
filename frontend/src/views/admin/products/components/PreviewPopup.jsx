import React, { Fragment, useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const PreviewPopup = ({ selectedProduct, open, setOpen }) => {
   const defaultImagePath = selectedProduct.display_image && selectedProduct.display_image.name ? 
		`http://127.0.0.1:8000/uploads/${selectedProduct.display_image.name}` : 
		"";
   console.log(defaultImagePath);
   const [previewImage, setPreviewImage] = useState(defaultImagePath);
   const [imgIndex, setImgIndex] = useState(0);


    const getImagePath = (name) => {
      return `http://127.0.0.1:8000/uploads/${name}`;
    };

   const handleNextPreviewImage = () => {
	   const selectedIndexLen = selectedProduct.images.length - 1
	   const index = (imgIndex + 1) > selectedIndexLen ? 0 : imgIndex + 1;
	   setImgIndex(index);
	   const path = getImagePath(selectedProduct.images[index].name)
	   setPreviewImage(path)
   }

   const handlePreviousPreviewImage = () => {
	   const selectedIndexLen = selectedProduct.images.length - 1
	   const index = (imgIndex - 1) < 0 ? selectedIndexLen : imgIndex - 1;
	   setImgIndex(index);
	   const path = getImagePath(selectedProduct.images[index].name)
	   setPreviewImage(path)
   }

   const handleSetPreviewImage = (e, image, index) => {
	e.preventDefault();
	setImgIndex(index);
	setPreviewImage(getImagePath(image));
   }

   const handleShowSelectedImage = (image, index) => {
	return (<a onClick={(e) =>handleSetPreviewImage(e, image.name, index)} href="#"
	    class={`block border dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300 ${
		index == imgIndex ? 'border-blue-300' : 'border-transparent'
	    }`}>
	    <img
	      src={getImagePath(image.name)} 
	      alt="Preview"
	      class="object-cover w-full lg:h-20"
	    />
	</a>)
   }

    if (!selectedProduct)
	return <></>

return (
<div style={{"top":"0", "left":"0", "zIndex":"5"}} className="absolute w-full h-full p-4 bg-white">



    <div className="bg-white">

      <p className="cursor-pointer ml-2 mb-4" onClick={()=>setOpen(false)}>Back</p>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">



                <div class="w-full px-4">
                    <div class="sticky top-0 z-50 overflow-hidden ">
                        <div class="relative mb-6 lg:mb-10 lg:h-[28rem]">
	
	<span className="absolute left-0 cursor-pointer" style={{top: "50%"}} onClick={handlePreviousPreviewImage}>Prev</span>
                            <img
	   			style={{"width":"200rem", "padding": "1rem"}} 
				src={previewImage}
				alt=" /"
                                className="object-cover w-full lg:h-full "
		             />
	<span className="absolute right-0 cursor-pointer" style={{top: "50%"}} onClick={handleNextPreviewImage}>Next</span>
                        </div>
                        <div class="flex-wrap hidden md:flex ">
            {selectedProduct.images[0] && selectedProduct.images.map((image, index) => (
                            <div className="w-1/2 p-2 sm:w-1/4">
				{handleShowSelectedImage(image, index)}
                            </div>
	     ))}


                        </div>
                    </div>
                </div>




          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-xs lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-5 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:pb-8 lg:pt:6">
              <div className="mx-auto px-8">
		<h3 className="text-2xl mb-5 font-bold tracking-tight text-gray-900">
		{selectedProduct.name}
	  	</h3>
<div className="flex items-center">
		      <div className="flex items-center">
			{[0, 1, 2, 3, 4].map((rating) => (
			  <StarIcon
			    key={rating}
                    className={classNames(
                      selectedProduct?.ratings > rating ? 'text-orange-900' : 'text-orange-200',
                      'h-3 w-3 flex-shrink-0'
                    )}
			    aria-hidden="true"
			  />
			))}
		      </div>

                <p className="text-sm leading-5 text-gray-600">
	  		<span className="text-gray-400">{selectedProduct?.ratings}</span> (16 Feedbacks)
                </p>
</div>
                <h4 className="text-xl mt-3 mb-5 text-gray-600">${selectedProduct?.price}</h4>
                <h4 className="text-xl font-semibold text-gray-600">Product Details</h4>


            <p className="mt-3 text-base leading-7 text-gray-600">
		{selectedProduct?.description}
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
                  href={`/admin/edit-product?id=${selectedProduct?.id}`}
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit
                </a>

</div>	  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>




    </div>
	)
}

export default PreviewPopup;
