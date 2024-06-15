import {
  StarIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";

import two from "assets/img/front/temp/2.jpg"

const SingleProduct = () => {
    return(
	<div className="text-left cursor-pointer hover:border hover:border-gray-300">
	    <div className="relative">
		<div className="absolute left-0 top-3 left-3 flex items-center bg-white border rounded-sm border-red-200 py-2 px-2">
		    <ClockIcon className="h-5 w-5 text-red-400 mr-2" />
		    <p className="text-red-400">Pick Up</p>
		</div>
		<div className="absolute top-3 right-3 flex justify-center items-center h-10 w-10 bg-gray-100 rounded-full">
		    <StarIcon className="h-7 w-7" />
		</div>
		<img src={two} className="!h-[19.5rem] w-full rounded object-cover" alt="product" />
	    </div>
	    <div>
		<h3>The best macbook every Pro AMD R5 3500U Quad-Core 8G...</h3>
		<div className="flex items-center py-2 text-gray-400">
		    <MapPinIcon className="h-3 w-3 mr-2" />
		    <p>London</p>
		</div>
		<h2 className="text-red-500 font-bold">$124.50</h2>
	    </div>
	    <button className="bg-transparent hover:border-transparent uppercase mt-6 w-full rounded border border-red-500 py-3 px-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
		Add to cart
	    </button>
	</div>
    )
}

export default SingleProduct;
