import {
  HomeIcon,
  TruckIcon,
  BarsArrowUpIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/20/solid";

const ProductTypeMenu = ({
    activePill,
    setActivePill,
}) => {
    return(
      <div className="">
        <div className="mx-auto max-w-2xl px-4 py-2 sm:px-1 lg:max-w-7xl lg:px-8">
	     <div className="flex justify-between items-center">
	    	  <p>This is the latest deal shop around the world you can find shop with 40% off | <span className="text-primaryColor hover:text-red-600 underline cursor-pointer">Apply now</span></p>
		  <ul className="flex">
			<li
	    		    onClick={() => setActivePill(1)}
	    		    className={`flex mr-2 items-center cursor-pointer transition duration-300 py-2 px-6 rounded-md ${
			    activePill === 1 ? "bg-black text-white" : "bg-white text-black hover:bg-gray-200/50"
			    }`}
	   		>
			    <HomeIcon className="h-5 w-5 mr-3" />
			    <p>All</p>
			</li>
			<li
	    		    onClick={() => setActivePill(2)}
	    		    className={`flex mr-2 items-center cursor-pointer transition duration-300 py-2 px-6 rounded-md ${
			    activePill === 2 ? "bg-black text-white" : "bg-white text-black hover:bg-gray-200/50"
			    }`}
	    		>
			    <TruckIcon className="h-5 w-5 mr-3" />
			    <p>Pickup</p>
			</li>
			<li
	    		    onClick={() => setActivePill(3)}
	    		    className={`flex mr-2 items-center cursor-pointer transition duration-300 py-2 px-6 rounded-md ${
			    activePill === 3 ? "bg-black text-white" : "bg-white text-black hover:bg-gray-200/50"
			    }`}
	    		>
			    <BarsArrowUpIcon className="h-5 w-5 mr-3" />
			    <p>Requests</p>
			</li>
			<li
	    		    onClick={() => setActivePill(4)}
	    		    className={`flex items-center cursor-pointer transition duration-300 py-2 px-6 rounded-md ${
			    activePill === 4 ? "bg-black text-white" : "bg-white text-black hover:bg-gray-200/50"
			    }`}
	    		>
			    <ArrowUpOnSquareStackIcon className="h-5 w-5 mr-3" />
			    <p>Groceries</p>
			</li>
		  </ul>
	     </div>
	</div>
      </div>
    )
}

export default ProductTypeMenu;
