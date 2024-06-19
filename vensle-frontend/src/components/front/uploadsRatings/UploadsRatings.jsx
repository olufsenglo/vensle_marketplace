import { useState } from "react"
import SwipeProducts from "components/front/swipeProducts/SwipeProducts"

const NewUploadsBestRatings = () => {
    const [activeTab, setActiveTab] = useState(1)

    return (
      <div className="relative bg-white">
         <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
	    <div>
	        <h2
	           onClick={()=>setActiveTab(1)}
	    	   className={`pr-3 cursor-pointer border-b-2 hover:border-primaryColor/50 text-xl md:text-xl font-semibold uppercase tracking-tight text-gray-900 inline text-left ${activeTab === 1 ? "border-primaryColor":"text-gray-700 border-white"}`}
                >
	            New Uploads
                </h2>
	        <h2
	           onClick={()=>setActiveTab(2)}
	    	   className={`pr-3 ml-3 cursor-pointer border-b-2 hover:border-primaryColor/50 text-xl md:text-xl font-semibold uppercase tracking-tight text-gray-900 inline text-left ${activeTab === 2 ? "border-primaryColor" : "text-gray-700 border-white"}`}
                >
	            Best Ratings
                </h2>
	    </div>
	    <SwipeProducts />
	</div>
      </div>
    )
}

export default NewUploadsBestRatings;
