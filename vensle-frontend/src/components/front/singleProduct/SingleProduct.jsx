import { useEffect } from "react"
import {
  MapPinIcon,
  ClockIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";
import {
  HeartIcon,
} from '@heroicons/react/24/outline'

import two from "assets/img/front/temp/2.jpg"

const SingleProduct = ({ numberOfProducts, type }) => {

	let titleClassName = ""
	let priceClassName = ""
	let locationClassName = ""
	let imageClassName = ""
	let buttonClassName = ""
	if (numberOfProducts == 6) {
	    imageClassName = "md:!max-h-[10.5rem]"
	    buttonClassName = "md:py-[0.5rem] md:text-sm mt-5"
	} else if (numberOfProducts == 7) {
	    imageClassName = "md:!max-h-[9rem]"
	    titleClassName = "md:text-sm"
	    priceClassName = "md:text-sm pt-1"
	    buttonClassName = "md:py-[0.3rem] md:text-xs mt-3"
	} else {
	    imageClassName = "md:!max-h-[19.5rem]"
	    titleClassName = "md:text-base"
	    locationClassName = "md:text-sm"
	    priceClassName = "md:text-base pt-2"
	    buttonClassName = "md:py-[0.65rem] md:text-sm mt-6 "
	}

    return(
	<div className="text-left cursor-pointer hover:bg-gray-100/50 rounded-md">
	    <div className="relative">
		<div className="absolute left-0 top-3 left-3 flex items-center bg-white border rounded-md border-primaryColor py-[0.2rem] px-2">
		    <TruckIcon className="h-5 w-5 text-primaryColor mr-2" />
		    <p className="text-primaryColor text-sm">Request</p>
		</div>
		<div className="absolute cursor-pointer bg-gray-100 hover:bg-gray-300 top-2 right-3 flex justify-center items-center h-9 w-9 rounded-full">
		    <HeartIcon className="h-6 w-6" />
		</div>
		<img
	    	    src={two}
	    	    className={`!max-h-[9rem] w-full rounded object-cover ${imageClassName}`}
	    	    alt="product"
	      	/>
	    </div>
	    <div className="p-3">
		    <div>
			<h3 className={`text-sm ${titleClassName}`}>Strawberries</h3>
	    		{type !== 'grocery' &&
			    <div className="flex items-center pt-2 text-gray-400">
			        <MapPinIcon className="h-3 w-3 mr-1" />
				<p className="text-xs md:text-sm">London</p>
			    </div>
			}
			<h2 className={`text-primaryColor text-sm font-bold ${priceClassName}`}>$124.50</h2>
		    </div>
	    	    {type === 'grocery' &&
		        <button className={`bg-transparent font-semibold text-xs hover:border-transparent uppercase w-full rounded border border-primaryColor py-[0.4rem] px-2 text-red-500 hover:bg-primaryColor hover:text-white ${buttonClassName}`}>
			    Add to cart
		        </button>
		    }
	    </div>
	</div>
    )
}

export default SingleProduct;
