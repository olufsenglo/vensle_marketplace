import React from 'react'
import {
  MdHome,
  MdFileCopy,
} from "react-icons/md";

const AdminAnalytic = () => {
    return (
	<div className="border-gray-300 border-r">
	  <div className="flex mb-3">
	     <div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
	       <MdHome className="h-5 w-5" />
	     </div>
	     <div>
	  	<p>Total Expenses</p>
	  	<p className="font-bold text-lg">$2,000.00</p>
	     </div>
	  </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
	     <div className="flex flex-col justify-between">
		<p className="text-sm">Previous</p>
		<h3 className="font-bold">$1M</h3>
	     </div>
	     <div className="flex flex-col justify-between">
		<p className="text-sm">%Change</p>
		<h3 className="font-bold">+54.20%</h3>
	     </div>
	     <div className="flex items-center">
		<p className="flex items-center">
	  	   Trend <MdFileCopy className="ml-1 h-3 w-3" />
	  	</p>
	     </div>
	  </div>
	</div>
    )
}


export default AdminAnalytic;
