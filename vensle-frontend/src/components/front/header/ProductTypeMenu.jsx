import { Link } from "react-router-dom"
import {
  HomeIcon,
  TruckIcon,
  BarsArrowUpIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/20/solid";

const ProductTypeMenu = ({
    activePill,
    setActivePill,
    position='sticky'
}) => {
    const ALL = 1;
    const PICKUP = 2;
    const REQUESTS = 3;
    const GROCERIES = 4;

    const handleSetActivePill = (pill) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
	setActivePill(pill)
    }

    return(
     <div className={`flex justify-between items-center ${
	     position === 'sticky' && "w-full lg:w-auto"
     }`}>
	  {position === 'relative' &&
	      <p className="hidden lg:block text-[15px]">The best deals you can find shop with 50% off | {" "}
		  <Link to="/filter?searchTerm=&discount=bestDeal&code=3&coupon=40SHOPWIDE" className="text-primaryColor hover:text-red-600 underline cursor-pointer">
		      Apply now
		  </Link>
	      </p>
	  }
	  <ul className={`flex ${
	     position === 'sticky' && "w-full lg:w-auto justify-between lg:justiy-start"
	  }`}>
		<li
		    onClick={() => handleSetActivePill(ALL)}
		    className={`flex py-1 md:py-2 px-4 lg:px-6 md:mr-2 items-center cursor-pointer transition duration-300 rounded-md ${
		    activePill === 1 ? "bg-black text-white" : "bg-white text-black hover:bg-gray-200/50"
		    }`}
		>
		    <HomeIcon className="h-[0.6rem] w-[0.6rem] md:h-5 md:w-5 mr-1 md:mr-3" />
		    <p className="text-[11px] md:text-base">All</p>
		</li>
		<li
		    onClick={() => handleSetActivePill(PICKUP)}
		    className={`flex py-1 md:py-2 md:mr-2 items-center cursor-pointer transition duration-300 py-2 px-3 lg:px-6 rounded-md ${
		    activePill === 2 ? "bg-black text-white" : "bg-white text-black hover:bg-gray-200/50"
		    }`}
		>
		    <TruckIcon className="h-[0.6rem] w-[0.6rem] md:h-5 md:w-5 mr-1 md:mr-3" />
		    <p className="text-[11px] md:text-base">Pickup</p>
		</li>
		<li
		    onClick={() => handleSetActivePill(REQUESTS)}
		    className={`flex py-1 md:py-2 md:mr-2 items-center cursor-pointer transition duration-300 py-2 px-2 lg:px-6 rounded-md ${
		    activePill === 3 ? "bg-black text-white" : "bg-white text-black hover:bg-gray-200/50"
		    }`}
		>
		    <BarsArrowUpIcon className="h-[0.6rem] w-[0.6rem] md:h-5 md:w-5 mr-1 md:mr-3" />
		    <p className="text-[11px] md:text-base">Requests</p>
		</li>
		<li
		    onClick={() => handleSetActivePill(GROCERIES)}
		    className={`flex py-1 md:py-2 lg:mr-2 items-center cursor-pointer transition duration-300 py-2 px-2 lg:px-6 rounded-md ${
		    activePill === 4 ? "bg-black text-white" : "bg-white text-black hover:bg-gray-200/50"
		    }`}
		>
		    <ArrowUpOnSquareStackIcon className="h-[0.6rem] w-[0.6rem] md:h-5 md:w-5 mr-1 md:mr-3" />
		    <p className="text-[11px] md:text-base">Groceries</p>
		</li>
	  </ul>
      </div>
    )
}

export default ProductTypeMenu;
