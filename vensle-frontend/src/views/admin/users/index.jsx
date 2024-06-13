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
           Header: "Name",
           accessor: "name"
         },
         {
           Header: "Email",
           accessor: "email"
         },
         {
           Header: "Location",
           accessor: "address"
         },
         {
           Header: "Phone Number",
           accessor: "phone_number",
         },
         {
           Header: "Status",
           accessor: "status",
           Cell: ( props ) => {
 	    	return <StatusRow props={props} / >
  	   }
         },
         {
           Header: "Rating",
           accessor: "rating",
           Cell: ( props ) => {
 	    	return <RatingRow props={props} / >
  	   }
         },
]

    const StatusRow = ({props}) => {
	return (
<span className={`text-xs py-1 px-3 rounded-xl ${props.row.original.status == 'Active' ?
		'bg-green-300/50 text-green-900' : 'bg-red-300 text-red-900'}`
		}>
		{props.row.original.status}
</span>
	)
    }

    const RatingRow = ({props}) => {
	return (
	     <span className=''>
		<div className="flex items-center">
		     {[0, 1, 2, 3, 4].map((rating) => (
			  <StarIcon
			    key={rating}
                    	    className={classNames(
                      	   	props.row.original.rating > rating ? 'text-orange-900' : 'text-orange-200',
                      	    	'h-[0.9rem] w-[0.9rem] mr-1 flex-shrink-0'
                    	    )}
			    aria-hidden="true"
			  />
		      ))}
		</div>
</span>
	)
    }


const baseURL = "http://localhost:8000";
//const baseURL = "https://nominet.vensle.com/backend";

const Users = () => {
  const columns = useMemo(() => columnsData, []);
  const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state?.auth?.user?.token);

  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

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
    <div>
      <div className="mt-5 min-h-[25rem] h-full">
	  <div className="mb-6 flex overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
		<button
		  className={`bg-transparent -mb-px inline-flex h-6 items-center justify-center whitespace-nowrap border-b-2 px-16 text-left text-2xl transition duration-300 focus:outline-none sm:text-base ${
		    activeTab === 1
		      ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300"
		      : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
		  }`}
		  onClick={() => handleTabClick(1)}
		>
		  Admin
		</button>

		<button
		  className={`bg-transparent -mb-px inline-flex h-6 items-center justify-center whitespace-nowrap border-b-2 px-16 text-center text-2xl focus:outline-none sm:text-base ${
		    activeTab === 2
		      ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300"
		      : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
		  }`}
		  onClick={() => handleTabClick(2)}
		>
		  Vendor
		</button>

		<button
		  className={`bg-transparent -mb-px inline-flex h-6 items-center justify-center whitespace-nowrap border-b-2 px-16 text-center text-2xl focus:outline-none sm:text-base ${
		    activeTab === 3
		      ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300"
		      : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
		  }`}
		  onClick={() => handleTabClick(3)}
		>
		  Driver
		</button>
         </div>

	<Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Users;
