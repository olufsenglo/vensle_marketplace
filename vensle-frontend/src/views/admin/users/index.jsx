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
           accessor: "name",
           Cell: ( props ) => {
 	    	return <NameRow props={props} / >
  	   }
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

    const NameRow = ({props}) => {
	return (
		<span className="capitalize">{props.row.original.name}</span>
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


//const baseURL = "http://localhost:8000";
const baseURL = "https://nominet.vensle.com/backend";

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
		  Admin
		</button>

		<button
		  className={`bg-transparent -mb-px inline-flex h-8 items-center justify-center whitespace-nowrap border-b-2 px-16 text-center text-2xl focus:outline-none sm:text-base ${
		    activeTab === 2
		      ? "border-ADashPrimary text-ADashPrimary dark:border-blue-400 dark:text-blue-300"
		      : "border-transparent cursor-base text-gray-700 hover:border-gray-400 dark:text-white"
		  }`}
		  onClick={() => handleTabClick(2)}
		>
		  Vendor
		</button>

		<button
		  className={`bg-transparent -mb-px inline-flex h-8 items-center justify-center whitespace-nowrap border-b-2 px-16 text-center text-2xl focus:outline-none sm:text-base ${
		    activeTab === 3
		      ? "border-ADashPrimary text-ADashPrimary dark:border-blue-400 dark:text-blue-300"
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
