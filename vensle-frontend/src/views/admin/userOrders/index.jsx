import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StarIcon } from '@heroicons/react/20/solid'
import axios from "axios";

import Table from './Table'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const columnsData = [
	{
		Header: "Order Id",
		accessor: "id",
	},
	{
		Header: "Created",
		accessor: "created_at"
	},
	{
		Header: "Location",
		accessor: "shipping_address_id"
	},
	{
		Header: "Payment Status",
		accessor: "paid",
		Cell: (props) => {
			return <StatusRow props={props} />
		}
	},
	{
		Header: "Shipping Status",
		accessor: "status",
		Cell: (props) => {
			return <StatusRow props={props} />
		}
	},	
	{
		Header: "Price",
		accessor: "total_price",
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


const baseURL = "https://nominet.vensle.com/backend";

const UserOrders = () => {
	const navigate = useNavigate();
	const columns = useMemo(() => columnsData, []);
	const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
	const accessToken = useSelector((state) => state?.auth?.user?.token);

	const [data, setData] = useState([]);
	const [activeTab, setActiveTab] = useState(1);
	const [orders, setOrders] = useState([]);

	const handleTabClick = (tabNumber) => {
		setActiveTab(tabNumber);
	};

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get(`${baseURL}/api/v1/user/orders`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				setOrders(response.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			}
		};

		fetchOrders();
	}, []);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`${baseURL}/api/v1/users`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				setData(response.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, [accessToken]);

	return (
		<div className="bg-white">
			<div className="mt-5 min-h-[25rem] relative h-full">
				<div className="mb-6 pt-6 w-[60%] flex overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
					<button
						className={`bg-transparent -mb-px w-full inline-flex h-8 items-center justify-center whitespace-nowrap border-b-2 text-2xl transition duration-300 focus:outline-none sm:text-base ${activeTab === 1
							? "border-primaryColor text-ADashPrimary dark:border-blue-400 dark:text-blue-300"
							: "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
							}`}
						onClick={() => handleTabClick(1)}
					>
						Customer’s Orders
					</button>

					<button
						className={`bg-transparent -mb-px w-full inline-flex h-8 items-center justify-center whitespace-nowrap border-b-2 text-center text-2xl focus:outline-none sm:text-base ${activeTab === 2
							? "border-primaryColor text-ADashPrimary dark:border-blue-400 dark:text-blue-300"
							: "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
							}`}
						onClick={() => handleTabClick(2)}
					>
						My Orders
					</button>
				</div>

				<Table columns={columns} data={orders} />
			</div>
		</div>
	);
};

export default UserOrders;
