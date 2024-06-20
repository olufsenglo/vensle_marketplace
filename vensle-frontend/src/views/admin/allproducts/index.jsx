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
           accessor: "user.name"
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

    const StatusRow = ({props}) => {
	return (
<span className={`text-xs py-1 px-3 rounded-xl ${props.row.original.status == 'Active' ?
		'bg-green-300/50 text-green-900' : 'bg-red-300 text-red-900'}`
		}>
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

  /*useEffect(() => {
   axios("http://api.tvmaze.com/search/shows?q=girls")
     .then((res) => {
       setData([{
	       score:1,
	       show: {
		       name: 'test',
		       type: 'guess',
		       language: 'chinese',
		       officialSite: 'www.me.com',
		       rating: {average: 5},
		       status: "Closed"
	       }
       }, ...res.data, ...res.data,]);
     })
     .catch((err) => console.log(err))	  
  }, []);*/


  return (
    <div>
      <div className="mt-5 min-h-[25rem] grid h-full grid-cols-1 gap-5">
	<Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Tables;
