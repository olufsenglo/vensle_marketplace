import React from 'react'
import {
	MdHome,
	MdFileCopy,
} from "react-icons/md";

const AdminAnalytic = ({ last = false }) => {
	return (
		<div className={`${!last && 'border-gray-300 border-r'}`}>
			<div className="flex mb-3">
				<div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
					<MdHome className="text-[#475467] h-5 w-5" />
				</div>
				<div className="py-[0.1rem]">
					<p className="text-[#475077]">Total no of Vendor</p>
					<p className="font-bold text-lg text-[#1e1a1d]">2,000.00</p>
				</div>
			</div>
			<div className="flex gap-[0.7rem]">
				<div className="flex flex-col justify-between">
					<p className="text-sm text-[#475077]">Previous</p>
					<h3 className="font-bold text-[#475077]">236k</h3>
				</div>
				<div className="flex flex-col justify-between">
					<p className="text-sm text-[#475077]">%Change</p>
					<h3 className="font-bold text-[#475077]">+54.20%</h3>
				</div>
				<div className="flex items-center">
					<p className="flex items-center">
						Trend <MdFileCopy className="text-red-700 ml-1 h-3 w-3" />
					</p>
				</div>
			</div>
		</div>
	)
}


export default AdminAnalytic;
