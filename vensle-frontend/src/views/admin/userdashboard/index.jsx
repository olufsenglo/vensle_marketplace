import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { StarIcon } from '@heroicons/react/20/solid'
import axios from "axios";
import moment from "moment";

import Table from './Table'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const columnsData = [
	{
		Header: "Product Name",
		accessor: "name"
	},
	{
		Header: "Category",
		accessor: "category.name",
	},
	{
		Header: "Order Id",
		accessor: "id"
	},
	{
		Header: "Type",
		accessor: "type"
	},
	{
		Header: "Price",
		accessor: "price"
	},
	{
		Header: "Upload Date",
		accessor: "created_at",
	},
	{
		Header: "Status",
		accessor: "status",
		Cell: (props) => {
			return <StatusRow props={props} />
		}
	},
]

const StatusRow = ({ props }) => {
	return (
		<span className={`text-xs py-1 px-4 rounded-sm ${props.row.original.status == 'Active' ?
			'bg-green-200/70 text-green-900' : 'bg-red-300 text-red-900'}`
		}>
			{props.row.original.status}
		</span>
	)
}

//const baseURL = "http://localhost:8000";
const baseURL = "https://nominet.vensle.com/backend";

const Dashboard = () => {
	const columns = useMemo(() => columnsData, []);
	const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
	const accessToken = useSelector((state) => state?.auth?.user?.token);

	const [products, setProducts] = useState([]);
	const [data, setData] = useState([]);

	function formatPrice(price) {
		return Number(parseFloat(price).toFixed(2)).toLocaleString('en', {
			minimumFractionDigits: 2
		});
	}

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`${baseURL}/api/v1/products`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				const extractedData = response.data.data.map(
					({
						price,
						created_at,
						...rest
					}) => ({
						price: formatPrice(price),
						created_at: moment(created_at).fromNow(),
						...rest,
					})
				);

				setData(extractedData);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, [accessToken]);

	return (
		<div className="mt-3">
			<div className="grid grid-cols-1 gap-5 md:grid-cols-12 lg:grid-cols-13 2xl:grid-cols-13 3xl:grid-cols-13">
				<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3 col-span-8 pl-4">
					<div className="flex justify-between items-end">
						<div>
							<p className="text-gray-700">For Sale Uploads</p>
							<h2 className="text-2xl font-medium">20</h2>
						</div>
						<div className="w-10 h-10 rounded-full bg-primaryColor">
						</div>
					</div>
					<div className="flex justify-between items-end">
						<div>
							<p className="text-gray-700">Request Uploads</p>
							<h2 className="text-2xl font-medium">31</h2>
						</div>
						<div className="w-10 h-10 rounded-full bg-primaryColor">
						</div>
					</div>
					<div className="flex justify-between items-end">
						<div>
							<p className="text-gray-700">Orders Review</p>
							<h2 className="text-2xl font-medium">6</h2>
						</div>
						<div className="w-10 h-10 rounded-full bg-primaryColor">
						</div>
					</div>
				</div>
				<div className="col-span-5 py-6 px-5 bg-uDashSecondary flex justify-between items-center">
					<div className="">
						<h3 className="text-xl font-medium">Updgrade to<br /><span className="text-primaryColor">Grocery</span> Vendor</h3>
						<p className="text-gray-700 mt-2 mr-2">Upload Business Details</p>
					</div>
					<div className="bg-primaryColor w-[6rem] h-[6rem] rounded-full">
					</div>
				</div>
			</div>
			<div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-12 lg:grid-cols-13 2xl:grid-cols-13 3xl:grid-cols-13">
				<div className="col-span-8 md:grid-cols-1 gap-3 pl-4">
					<h3 className="text-xl font-medium mb-6">Overview</h3>
					<div className="bg-blue-100 h-[20rem] p-4"></div>
				</div>
				<div className="col-span-5">
					<h3 className="text-xl font-medium mb-6">Recent Messages</h3>
					<div className="px-6 flex flex-col gap-5 bg-white pt-4 pb-4">

						<div className="flex">
							<div className="bg-gray-400 h-12 w-12 rounded-full">
							</div>
							<div className="ml-4">
								<h4 className="">Freddie Thorne</h4>
								<p className="text-xs text-gray-700">10 hours ago</p>
								<p className="text-sm">Do you sell your jackets in different colors?</p>
							</div>
						</div>
						<div className="flex">
							<div className="bg-gray-400 h-12 w-12 rounded-full">
							</div>
							<div className="ml-4">
								<h4 className="">Freddie Thorne</h4>
								<p className="text-xs text-gray-700">10 hours ago</p>
								<p className="text-sm">Do you sell your jackets in different colors?</p>
							</div>
						</div>
						<div className="flex">
							<div className="bg-gray-400 h-12 w-12 rounded-full">
							</div>
							<div className="ml-4">
								<h4 className="">Freddie Thorne</h4>
								<p className="text-xs text-gray-700">10 hours ago</p>
								<p className="text-sm">Do you sell your jackets in different colors?</p>
							</div>
						</div>
						<div className="mt-4">
							<button className="uppercase py-[0.5rem] px-3 rounded-md text-primaryColor font-medium bg-white hover:bg-primaryColor hover:text-white">View More</button>
						</div>

					</div>
				</div>
			</div>
			<div className="mt-7 grid grid-cols-1 pl-4">
				<h3 className="text-xl font-medium mb-6">Recent Uploads</h3>
				<div className="bg-white pl-8">
					<Table columns={columns} data={data} />
				</div>
			</div>


		</div>
	);
};

export default Dashboard;
