import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	AreaChart,
	Area,
	ResponsiveContainer,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';
import {
	MdHome,
	MdFileCopy,
} from "react-icons/md";

import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

const productSales = [
	{
		name: 'Jan',
		product1: 4000,
		product2: 2400
	},
	{
		name: 'Feb',
		product1: 3000,
		product2: 2210
	},
	{
		name: 'Mar',
		product1: 1000,
		product2: 2290
	},
	{
		name: 'Apr',
		product1: 2360,
		product2: 880
	},
	{
		name: 'May',
		product1: 600,
		product2: 3360
	},
	{
		name: 'Jun',
		product1: 2300,
		product2: 2290
	},
	{
		name: 'Jul',
		product1: 4190,
		product2: 2090
	},
	{
		name: 'Aug',
		product1: 2000,
		product2: 2090
	},
	{
		name: 'Sep',
		product1: 1990,
		product2: 2690
	},
	{
		name: 'Oct',
		product1: 2410,
		product2: 2290
	},
	{
		name: 'Nov',
		product1: 2900,
		product2: 2290
	},
	{
		name: 'Dec',
		product1: 1980,
		product2: 2290
	}
]

const Dashboard = () => {
	const baseURL = "https://nominet.vensle.com/backend";
	const navigate = useNavigate();
	const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);
	const accessToken = useSelector((state) => state.auth?.user?.token);

	const getDisplayImage = (image) => {
		return image && image.name ? `${baseURL}/uploads/${image.name}` : "";
	};

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, accessToken]);

	const getImagePath = (name) => {
		return `${baseURL}/uploads/${name}`;
	};



	return (
		<div className="pt-4">
			<div className="bg-[#f5eeff] rounded-lg">
				<div style={{ columnGap: "5%" }} className="py-[2.5rem] px-[9%] mb-6 mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
					<div className="border-gray-300 border-r">
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
									Trend <MdFileCopy className="text-green-700 ml-1 h-3 w-3" />
								</p>
							</div>
						</div>
					</div>

					<div className="border-gray-300 border-r">
						<div className="flex mb-3">
							<div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
								<MdHome className="text-[#475467] h-5 w-5" />
							</div>
							<div className="py-[0.1rem]">
								<p>Total no of Deliveries</p>
								<p className="font-bold text-lg text-[#1e1a1d]">10,000,000</p>
							</div>
						</div>
						<div className="flex gap-[0.7rem]">
							<div className="flex flex-col justify-between">
								<p className="text-sm text-[#475077]">Previous</p>
								<h3 className="font-bold text-[#475077]">4M</h3>
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

					<div className="border-gray-300">
						<div className="flex mb-3">
							<div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
								<MdHome className="text-[#475467] h-5 w-5" />
							</div>
							<div className="py-[0.1rem]">
								<p>Total no of Orders</p>
								<p className="font-bold text-lg text-[#1e1a1d]">11,000,000</p>
							</div>
						</div>
						<div className="flex gap-[0.7rem]">
							<div className="flex flex-col justify-between">
								<p className="text-sm text-[#475077]">Previous</p>
								<h3 className="font-bold text-[#475077]">$1M</h3>
							</div>
							<div className="flex flex-col justify-between">
								<p className="text-sm text-[#475077]">%Change</p>
								<h3 className="font-bold text-[#475077]">+54.20%</h3>
							</div>
							<div className="flex items-center">
								<p className="flex items-center">
									Trend <MdFileCopy className="text-green-700 ml-1 h-3 w-3" />
								</p>
							</div>
						</div>
					</div>

					<div className="border-gray-300 border-r">
						<div className="flex mb-3">
							<div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
								<MdHome className="text-[#475467] h-5 w-5" />
							</div>
							<div className="py-[0.1rem]">
								<p className="text-[#475077]">Total no of uploads</p>
								<p className="font-bold text-lg text-[#1e1a1d]">6,000.00</p>
							</div>
						</div>
						<div className="flex gap-[0.7rem]">
							<div className="flex flex-col justify-between">
								<p className="text-sm text-[#475077]">Previous</p>
								<h3 className="font-bold text-[#475077]">$1M</h3>
							</div>
							<div className="flex flex-col justify-between">
								<p className="text-sm text-[#475077]">%Change</p>
								<h3 className="font-bold text-[#475077]">+54.20%</h3>
							</div>
							<div className="flex items-center">
								<p className="flex items-center">
									Trend <MdFileCopy className="text-green-700 ml-1 h-3 w-3" />
								</p>
							</div>
						</div>
					</div>

					<div className="border-gray-300 border-r">
						<div className="flex mb-3">
							<div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
								<MdHome className="text-[#475467] h-5 w-5" />
							</div>
							<div className="py-[0.1rem]">
								<p className="text-[#475077]">Total Balance</p>
								<p className="font-bold text-lg text-[#1e1a1d]">$2,000.00</p>
							</div>
						</div>
						<div className="flex gap-[0.7rem]">
							<div className="flex flex-col justify-between">
								<p className="text-sm text-[#475077]">Previous</p>
								<h3 className="font-bold text-[#475077]">$1M</h3>
							</div>
							<div className="flex flex-col justify-between">
								<p className="text-sm text-[#475077]">%Change</p>
								<h3 className="font-bold text-[#475077]">+54.20%</h3>
							</div>
							<div className="flex items-center">
								<p className="flex items-center">
									Trend <MdFileCopy className="text-green-700 ml-1 h-3 w-3" />
								</p>
							</div>
						</div>
					</div>

					<div className="border-gray-300">
						<div className="flex mb-3">
							<div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
								<MdHome className="text-[#475467] h-5 w-5" />
							</div>
							<div className="py-[0.1rem]">
								<p>Total Profit</p>
								<p className="font-bold text-lg text-[#1e1a1d]">$2,000.00</p>
							</div>
						</div>
						<div className="flex gap-[0.7rem]">
							<div className="flex flex-col justify-between">
								<p className="text-sm text-[#475077]">Previous</p>
								<h3 className="font-bold text-[#475077]">$1M</h3>
							</div>
							<div className="flex flex-col justify-between">
								<p className="text-sm text-[#475077]">%Change</p>
								<h3 className="font-bold text-[#475077]">+54.20%</h3>
							</div>
							<div className="flex items-center">
								<p className="flex items-center">
									Trend <MdFileCopy className="text-green-700 ml-1 h-3 w-3" />
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2">
				<WeeklyRevenue title='Profiles' />
				<WeeklyRevenue title='Products' />
			</div>


			<div className="py-8">
				<h3>Sales Volume</h3>
				<div className="w-full h-[24rem] pt-4">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart width={500} height={400} data={productSales}>
							<YAxis />
							<XAxis dataKey="name" />
							<CartesianGrid strokeDasharray="5 5" />
							<Tooltip />
							<Legend />
							<Area
								stroke="#06164b"
								fill="#37436f"
								dataKey="product1"
							/>
							<Area
								stroke="#ff5959"
								fill="#fb8c8e"
								dataKey="product2"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>



		</div>
	);
};

export default Dashboard;
