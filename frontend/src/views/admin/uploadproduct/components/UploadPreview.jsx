import { Fragment, useEffect, useState } from 'react'

import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const UploadPreview = ({ formData, imagePreviews, mainImageIndex, setUploadPreview }) => {
   const [mainPreviewImage, setMainPreviewImage] = useState(null);

    const getDisplayImage = (product) => {
      const displayImage = product.images.find(image => image.id === product.display_image_id);
      return displayImage ? `http://127.0.0.1:8000/uploads/${displayImage.name}` : '';
    };


    const getImagePath = (name) => {
      return `http://127.0.0.1:8000/uploads/${name}`;
    };

   const handleSetMainPreviewImage = (e, preview) => {
	e.preventDefault();
	setMainPreviewImage(preview);
   }

   const handleShowSelectedImage = (preview) => {
	return (<a onClick={(e) =>handleSetMainPreviewImage(e, preview)} href="#"
	    class="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
	    <img
	      src={preview} 
	      alt="Preview"
	      class="object-cover w-full lg:h-20"
	    />
	</a>)
   }


useEffect(() => {
	//const defaultImagePreview = imagePreviews[0] ? imagePreviews[0] : "";
	const defaultImagePreview = imagePreviews[mainImageIndex] || imagePreviews[0] || "";

	setMainPreviewImage(defaultImagePreview);
}, [ imagePreviews ]); 

	return (
		<div style={{"top":"0", "left":"0", "zIndex":"5"}} className="absolute w-full h-full p-4 bg-white">
<p className="cursor-pointer ml-2 mb-4" onClick={()=>setUploadPreview(false)}>Back</p>

    <div className="bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">



                <div className="w-full px-4">
                    <div className="sticky top-0 z-50 overflow-hidden ">
                       <div className="relative mb-6 lg:mb-10 lg:h-[28rem]">
                            <img
	    			src={mainPreviewImage}
                          	alt="x"
	    		     	style={{"width":"200rem"}}
                             	className="object-cover w-full lg:h-full "
	    		    />
                        </div>
                        <div className="flex-wrap hidden md:flex ">


            {imagePreviews && imagePreviews.map((preview) => (
                            <div className="w-1/2 p-2 sm:w-1/4">
		    {handleShowSelectedImage(preview)}
                            </div>
	  ))}


                        </div>
                    </div>
                </div>




          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-xs lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-5 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:pb-8 lg:pt:6">
              <div className="px-8">
		<h3 className="text-2xl mb-5 font-bold tracking-tight text-gray-900">
			{formData.name} 
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
                <h4 className="text-xl mt-3 mb-5 text-gray-600">$ {formData.price}</h4>
                <h4 className="text-xl font-semibold text-gray-600">Product Details</h4>


            <p className="mt-3 text-base leading-7 text-gray-600">
		{formData.description}
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
			<button type="submit" className="linear mt-8 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
			  PREVIEW & SUBMIT
			</button>


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

export default UploadPreview;
