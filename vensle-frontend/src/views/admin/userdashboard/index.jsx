import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	AreaChart,
	Area,
	ResponsiveContainer,
} from "recharts";
import { MdArrowUpward, MdAttachMoney } from "react-icons/md";
import {
	CircularProgressbarWithChildren,
	buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import Table from './Table'

const chartData = [
	{
		name: "Mon",
		"Orders Received": 4000,
		"Orders Made": 2400,
		amt: 2400,
	},
	{
		name: "Tue",
		"Orders Received": 3000,
		"Orders Made": 1398,
		amt: 2210,
	},
	{
		name: "Wed",
		"Orders Received": 2000,
		"Orders Made": 9800,
		amt: 2290,
	},
	{
		name: "Thur",
		"Orders Received": 2780,
		"Orders Made": 3908,
		amt: 2000,
	},
	{
		name: "Fri",
		"Orders Received": 1890,
		"Orders Made": 4800,
		amt: 2181,
	},
	{
		name: "Sat",
		"Orders Received": 2390,
		"Orders Made": 3800,
		amt: 2500,
	},
	{
		name: "Sun",
		"Orders Received": 3490,
		"Orders Made": 4300,
		amt: 2100,
	},
];


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

const baseURL = "https://nominet.vensle.com/backend";
const newBaseURL = "https://nominet.vensle.com/backend";

const Dashboard = () => {
	const navigate = useNavigate();

	const columns = useMemo(() => columnsData, []);
	const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);
	const accessToken = useSelector((state) => state?.auth?.user?.token);

	const [loading, setLoading] = useState(false);
	const [verifyProgloading, setVerifyProgLoading] = useState(false);
	const [userStatsLoading, setUserStatsLoading] = useState(false);
	const [userStats, setUserStats] = useState([]);
	const [data, setData] = useState([]);
	const [latestMessages, setLatestMessages] = useState([]);
	const [verifyProgress, setVerifyProgress] = useState('');

	const percentage = 66;

	function formatPrice(price) {
		return Number(parseFloat(price).toFixed(2)).toLocaleString('en', {
			minimumFractionDigits: 2
		});
	}

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);

	useEffect(() => {
		const fetchData = async () => {
			setUserStatsLoading(true)
			try {
				const response = await axios.get(
					`${baseURL}/api/v1/user/dashboard-data`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
				);
				setUserStats(response.data);
				setUserStatsLoading(false)
			} catch (error) {
				console.error("Error fetching user stats:", error);
				setUserStatsLoading(false)
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchVerifyProgress = async () => {
			setVerifyProgLoading(true)
			try {
				const response = await axios.get(
					`${baseURL}/api/v1/business-details/profile-completion`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
				);
				setVerifyProgress(response.data);
				setVerifyProgLoading(false)
			} catch (error) {
				console.error("Error business details verification progress:", error);
				setVerifyProgLoading(false)
			}
		};

		fetchVerifyProgress();
	}, []);

	useEffect(() => {
		const fetchLatestMessages = async () => {
			setLoading(true);
			try {
				const response = await axios.get(`${baseURL}/api/v1/messages/inbox?per_page=3`, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				})
				setLatestMessages(response.data.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching inbox messages:', error);
				setLoading(false);
			}
		};

		fetchLatestMessages();
	}, []);

	const getImagePath = (name) => {
		return `${newBaseURL}/uploads/${name}`;
	};

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
							<h2 className="text-2xl font-medium">
								{userStatsLoading && <span className="text-sm">loading...</span>}
								{userStats.total_for_sale}
							</h2>
						</div>
						<div className="flex justify-center items-center w-10 h-10 text-white rounded-full bg-primaryColor">
							<MdAttachMoney className="w-8 h-8" />
						</div>
					</div>
					<div className="flex justify-between items-end">
						<div>
							<p className="text-gray-700">Request Uploads</p>
							<h2 className="text-2xl font-medium">
								{userStatsLoading && <span className="text-sm">loading...</span>}
								{userStats.total_for_request}
							</h2>
						</div>
						<div className="flex justify-center items-center w-10 h-10 text-white rounded-full bg-primaryColor">
							<MdAttachMoney className="w-8 h-8" />
						</div>
					</div>
					<div className="flex justify-between items-end">
						<div>
							<p className="text-gray-700">Orders Review</p>
							<h2 className="text-2xl font-medium">
								{userStatsLoading && <span className="text-sm">loading...</span>}
								{userStats.total_orders}
							</h2>
						</div>
						<div className="flex justify-center items-center w-10 h-10 text-white rounded-full bg-primaryColor">
							<MdArrowUpward className="w-8 h-8" />
						</div>
					</div>
				</div>
				<div className="col-span-5 py-6 px-5 bg-uDashSecondary flex justify-between items-center">
					<div className="">
						<h3 className="text-xl font-medium">Updgrade to<br /><span className="text-primaryColor">Grocery</span> Vendor</h3>
						<p className="text-gray-700 mt-2 mr-2">Upload Business Details</p>
					</div>
					<div className="flex flex-col items-center justify-center cursor-pointer w-[6rem] h-[6rem] rounded-full">
						{verifyProgloading && 'Loading...'}
						<Link to="/admin/profile?tab=business" className="block w-full h-full rounded-full">
							{verifyProgress && <CircularProgressbarWithChildren
								counterClockwise={true}
								value={verifyProgress.percentage}
								text={`${verifyProgress.percentage}%`}
								styles={buildStyles({
									strokeLinecap: "butt",
									pathColor: "#ff5959",
									trailColor: "#f6f6f6",
								})}
							>
								<div className="flex justify-center font-semibold items-center h-14 w-14 bg-white rounded-full">
									{`${verifyProgress.percentage}%`}
								</div>
							</CircularProgressbarWithChildren>}
						</Link>
					</div>
				</div>
			</div>
			<div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-12 lg:grid-cols-13 2xl:grid-cols-13 3xl:grid-cols-13">
				<div className="col-span-8 md:grid-cols-1 gap-3 pl-4">
					<h3 className="text-xl font-medium mb-6">Overview</h3>
					<div className="h-[20rem] p-4">

					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							width={500}
							height={300}
							data={chartData}
							margin={{
								right: 30,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="Orders Received" stackId="a" fill="#75dfee" />
							<Bar dataKey="Orders Made" stackId="a" fill="#9e9e9e" />
						</BarChart>
					</ResponsiveContainer>

					</div>
				</div>
				<div className="col-span-5">
					<h3 className="text-xl font-medium mb-6">Recent Messages</h3>
					<div className="px-6 flex flex-col gap-5 bg-white pt-4 pb-4 min-h-[320px]">
						{loading && "Loading..."}
						{latestMessages.length > 0 && latestMessages.map((message) =>
							<div className="flex">
								{message.sender?.profile_picture ? <div className="">
									<img
										src={getImagePath(message.sender.profile_picture)}
										alt={message.sender.profile_picture}
										className="h-12 w-12 rounded-full w-full object-cover"
									/>
								</div> :
									<div className="h-12 w-12 rounded-full bg-gray-300"></div>
								}
								<div className="ml-4">
									<h4 className="">{message.sender.name}</h4>
									<p className="text-xs text-gray-700">{moment(message.created_at).fromNow()}</p>
									<p className="text-sm">{message.content}</p>
								</div>
							</div>
						)}
						{latestMessages.length > 0 && <div className="mt-4">
							<Link to="/admin/messages" className="uppercase py-[0.5rem] px-3 rounded-md text-primaryColor transition duration-300 bg-white hover:bg-primaryColor hover:text-white">
								View More
							</Link>
						</div>}


					</div>
				</div>
			</div>
			<div className="mt-7 grid grid-cols-1 pl-4">
				<h3 className="text-xl font-medium mb-6">Recent Uploads</h3>
				<div className="bg-white">
					<Table columns={columns} data={data} />
				</div>
			</div>


		</div>
	);
};

export default Dashboard;
