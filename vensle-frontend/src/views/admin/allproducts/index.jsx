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
           Header: "Vendor",
           accessor: "user.name",
           Cell: ( props ) => {
                return <UserNameRow props={props} / >
           }
         },
         {
           Header: "Order Id",
           accessor: "id"
         },
         {
           Header: "Product Name",
           accessor: "name"
         },
         {
           Header: "Price",
           accessor: "price"
         },
         {
           Header: "Location",
           accessor: "city",
         },
         {
           Header: "Category",
           accessor: "category.name",
         },
         {
           Header: "Date",
           accessor: "created_at",
         },
         {
           Header: "Status",
           accessor: "status",
           Cell: ( props ) => {
 	    	return <StatusRow props={props} / >
  	   }
         },
]

    const UserNameRow = ({props}) => {
	return (
		<span className="capitalize">{props.row.original.user.name}</span>
	)
    }

    const StatusRow = ({props}) => {
	return (
			<span className={`inline-flex font-300 items-center text-xs py-[6px] px-[13px] rounded-[13px] ${
				    props.row.original.status == 'Active' ?
				      'bg-[#ddffcd] text-[#007f00]' : 'bg-[#ffd3d3] text-[#f90000]'
			}`}>
				<div className={`rounded-full w-[6px] h-[6px] mr-2 ${
				    props.row.original.status == 'Active' ?
				      'bg-[#007f00]' : 'bg-[#f90000]'
				}`}></div>
				{props.row.original.status}
			</span>
	)
    }

//const baseURL = "http://localhost:8000";
const baseURL = "https://nominet.vensle.com/backend";

const Tables = () => {
  const columns = useMemo(() => columnsData, []);
  const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state?.auth?.user?.token);

  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

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
    <div>
      <div className="mt-5 min-h-[25rem] relative h-full">
	  <div className="mb-6 pt-6 flex overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
		<button
		  className={`bg-transparent -mb-px inline-flex h-8 items-center justify-center whitespace-nowrap border-b-[3px] px-16 text-left text-2xl transition duration-300 focus:outline-none sm:text-base ${
		    activeTab === 1
		      ? "border-ADashPrimary text-ADashPrimary dark:border-blue-400 dark:text-blue-300"
		      : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
		  }`}
		  onClick={() => handleTabClick(1)}
		>
		  Uploads
		</button>

		<button
		  className={`bg-transparent -mb-px inline-flex h-8 items-center justify-center whitespace-nowrap border-b-2 px-16 text-center text-2xl focus:outline-none sm:text-base ${
		    activeTab === 2
		      ? "border-ADashPrimary text-ADashPrimary dark:border-blue-400 dark:text-blue-300"
		      : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
		  }`}
		  onClick={() => handleTabClick(2)}
		>
		  Orders
		</button>

		<button
		  className={`bg-transparent -mb-px inline-flex h-8 items-center justify-center whitespace-nowrap border-b-2 px-16 text-center text-2xl focus:outline-none sm:text-base ${
		    activeTab === 3
		      ? "border-ADashPrimary text-ADashPrimary dark:border-blue-400 dark:text-blue-300"
		      : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
		  }`}
		  onClick={() => handleTabClick(3)}
		>
		  Groceries
		</button>
         </div>

	 <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Tables;
