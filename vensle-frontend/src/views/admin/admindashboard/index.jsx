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
  MdOutlineShoppingCart,
  MdBarChart,
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
  	product1: 2000,
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
    <div>
     <div className="bg-blue-100/50 rounded-lg">
      <div className="py-8 px-16 mb-6 mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
	<div className="border-gray-300 border-r">
	  <div className="flex mb-3">
	     <div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
	       <MdHome className="h-5 w-5" />
	     </div>
	     <div>
	  	<p>Total Balance</p>
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

	<div className="border-gray-300">
	  <div className="flex mb-3">
	     <div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
	       <MdHome className="h-5 w-5" />
	     </div>
	     <div>
	  	<p>Total Profit</p>
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

	<div className="border-gray-300 border-r">
	  <div className="flex mb-3">
	     <div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
	       <MdHome className="h-5 w-5" />
	     </div>
	     <div>
	  	<p>Total Balance</p>
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


	<div className="border-gray-300 border-r">
	  <div className="flex mb-3">
	     <div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
	       <MdHome className="h-5 w-5" />
	     </div>
	     <div>
	  	<p>Total Balance</p>
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

	<div className="border-gray-300">
	  <div className="flex mb-3">
	     <div className="w-[3.5rem] mr-2 flex justify-center items-center rounded-lg bg-red-200">
	       <MdHome className="h-5 w-5" />
	     </div>
	     <div>
	  	<p>Total Profit</p>
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


      </div>
     </div>

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2">
        	<WeeklyRevenue />
        	<WeeklyRevenue />
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
		    stroke="#2563eb"
		    fill="#3b82f6"
		    dataKey="product1"
		  />
		  <Area
		    stroke="#7c3aed"
		    fill="#8b5cf6"
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
