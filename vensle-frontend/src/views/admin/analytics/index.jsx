import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { StarIcon } from '@heroicons/react/20/solid'
import axios from "axios";
import Card from "components/card";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie
} from "recharts";

const pieData = [
	{ name: "Group A", value: 400 },
	{ name: "Group B", value: 300 },
	{ name: "Group C", value: 300 },
	{ name: "Group D", value: 200 },
	{ name: "Group E", value: 278 },
	{ name: "Group F", value: 189 }
];

const data = [
	{
		name: "Page A",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Page B",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Page C",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Page D",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "Page E",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Page F",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Page G",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];


const baseURL = "https://nominet.vensle.com/backend";

const Analytics = () => {
	const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
	const accessToken = useSelector((state) => state?.auth?.user?.token);

	const [userStatsLoading, setUserStatsLoading] = useState([]);
	const [userStats, setUserStats] = useState([]);


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

	return (
		<div>
			<div className="mt-5 min-h-[25rem] relative h-full">
				<div className="py-[2.5rem] gap-5 px-[8] mb-6 mt-3 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
					<div className="text-center border-r border-r-gray-400">
						<p className="mb-3 text-gray-400 text-sm">Orders to Date</p>
						<h1 className="text-2xl font-medium">
							{userStatsLoading && <span className="text-sm">loading...</span>}
							{userStats.total_for_sale}
						</h1>
					</div>
					<div className="text-center border-r border-r-gray-400">
						<p className="mb-3 text-gray-400 text-sm">Orders Received</p>
						<h1 className="text-2xl font-medium">20</h1>
					</div>
					<div className="text-center border-r border-r-gray-400">
						<p className="mb-3 text-gray-400 text-sm">Orders Made</p>
						<h1 className="text-2xl font-medium">20</h1>
					</div>
					<div className="text-center">
						<p className="mb-3 text-gray-400 text-sm">Orders in October</p>
						<h1 className="text-2xl font-medium">
							{userStatsLoading && <span className="text-sm">loading...</span>}
							{userStats.total_for_sale}
						</h1>
					</div>
				</div>
				<div className="w-full h-[24rem] pt-4">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart width={500} height={300} data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line
								type="monotone"
								dataKey="pv"
								stroke="#8884d8"
								activeDot={{ r: 8 }}
							/>
							<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
						</LineChart>
					</ResponsiveContainer>
				</div>
				<div className="py-[2.5rem] gap-5 px-[8] grid grid-cols-1 gap-5 md:grid-cols-2">
					<Card extra={"w-full p-4 h-full"}>
						<div className="flex justify-between mb-6">
							<p className="text-lg font-medium">General Analysis</p>
							<select name="" className="text-sm">
								<option value="" className="border boder-white">Last 7 Days</option>
							</select>
						</div>
						<div className="flex justify-between mb-4 gap-4">
							<div className="w-1/2">
								<h4 className="text-sm font-medium">Inbox response rate</h4>
								<p className="text-sm text-gray-500">How quickly do you respond to customer messages and enquiries</p>
							</div>
							<div className="w-1/2 flex gap-4 items-center">
								<div className="flex flex-col flex-1">
									<div className="mt-2 flex h-2 w-full items-center rounded-full bg-lightPrimary dark:!bg-navy-700">
										<span className="h-full w-1/2 rounded-full bg-green-600 dark:!bg-white" />
									</div>
								</div>
								<p>
									100%
								</p>
							</div>
						</div>
						<div className="flex justify-between mb-4 gap-4">
							<div className="w-1/2">
								<h4 className="text-sm font-medium">Order response rate</h4>
								<p className="text-sm text-gray-500">How quickly do you respond to
									customer orders</p>
							</div>
							<div className="w-1/2 flex gap-4 items-center">
								<div className="flex flex-col flex-1">
									<div className="mt-2 flex h-2 w-full items-center rounded-full bg-lightPrimary dark:!bg-navy-700">
										<span className="h-full w-1/2 rounded-full bg-green-600 dark:!bg-white" />
									</div>
								</div>
								<p>
									100%
								</p>
							</div>
						</div>
						<div className="flex justify-between mb-4 gap-4">
							<div className="w-1/2">
								<h4 className="text-sm font-medium">Order Completion</h4>
								<p className="text-sm text-gray-500">How often do you complete
									orders</p>
							</div>
							<div className="w-1/2 flex gap-4 items-center">
								<div className="flex flex-col flex-1">
									<div className="mt-2 flex h-2 w-full items-center rounded-full bg-lightPrimary dark:!bg-navy-700">
										<span className="h-full w-1/2 rounded-full bg-green-600 dark:!bg-white" />
									</div>
								</div>
								<p>
									100%
								</p>
							</div>
						</div>
						<div className="flex justify-between mb-4 gap-4">
							<div className="w-1/2">
								<h4 className="text-sm font-medium">Positive Feedback</h4>
								<p className="text-sm text-gray-500">How quickly do you respond to customer messages and enquiries</p>
							</div>
							<div className="w-1/2 flex gap-4 items-center">
								<div className="flex flex-col flex-1">
									<div className="mt-2 flex h-2 w-full items-center rounded-full bg-lightPrimary dark:!bg-navy-700">
										<span className="h-full w-1/2 rounded-full bg-green-600 dark:!bg-white" />
									</div>
								</div>
								<p>
									100%
								</p>
							</div>
						</div>
					</Card>
					<Card extra={"w-full p-4 h-full"}>
						<div className="mb-6 flex items-center justify-between">
							<p className="text-lg font-medium">Conversion Rate</p>
							<select name="" className="text-sm">
								<option value="" className="border boder-white">Last 7 Days</option>
							</select>
						</div>
						<div className="w-full h-[15rem]">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart width={400} height={400}>
									<Pie
										dataKey="value"
										startAngle={180}
										endAngle={0}
										data={pieData}
										cx={200}
										cy={200}
										outerRadius={80}
										fill="#8884d8"
										label
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Analytics;
