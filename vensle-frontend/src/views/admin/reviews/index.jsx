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
    accessor: "user.name",
    Cell: (props) => {
      return <NameRow props={props} />
    }
  },
  {
    Header: "Email",
    accessor: "user.email"
  },
  {
    Header: "Feedback",
    accessor: "content"
  },
  {
    Header: "Rating",
    accessor: "rating",
    Cell: (props) => {
      return <RatingRow props={props} />
    }
  },
  {
    Header: "Date",
    accessor: "created_at"
  },
  {
    Header: ".",
  },
]

const NameRow = ({ props }) => {
  return (
    <span className="capitalize">{props.row.original.user.name}</span>
  )
}

const RatingRow = ({ props }) => {
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

const Tables = () => {
  const columns = useMemo(() => columnsData, []);
  const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state?.auth?.user?.token);

  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/v1/feedback`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const extractedData = response.data.map(
          ({
            created_at,
            ...rest
          }) => ({
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
