import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
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
  StarIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/20/solid'
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";

import Table from './Table'
import AdminAnalytic from './AdminAnalytic'
import CustomDialog from './CustomDialog'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
    product1: 1000,
    product2: 2290
  },
  {
    name: 'Apr',
    product1: 2360,
    product2: 880
  },
  {
    name: 'May',
    product1: 600,
    product2: 3360
  },
  {
    name: 'Jun',
    product1: 2300,
    product2: 2290
  },
  {
    name: 'Jul',
    product1: 4190,
    product2: 2090
  },
  {
    name: 'Aug',
    product1: 2000,
    product2: 2090
  },
  {
    name: 'Sep',
    product1: 1990,
    product2: 2690
  },
  {
    name: 'Oct',
    product1: 2410,
    product2: 2290
  },
  {
    name: 'Nov',
    product1: 2900,
    product2: 2290
  },
  {
    name: 'Dec',
    product1: 1980,
    product2: 2290
  }
]

const columnsData = (setOpen, setSelectedTransaction) => [
  {
    Header: "Name",
    accessor: "user.name",
    Cell: (props) => {
      return <NameRow props={props} />
    }
  },
  {
    Header: "Transaction No.",
    accessor: "transaction_no"
  },
  {
    Header: "Transaction Description",
    accessor: "transaction_description"
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: (props) => {
      return <StatusRow props={props} />
    }
  },
  {
    Header: "Date",
    accessor: "created_at",
  },
  {
    Header: " . ",
    Cell: (props) => {
      return <DeleteRow props={props} setSelectedTransaction={setSelectedTransaction} setOpen={setOpen} />
    }
  },
]

const NameRow = ({ props }) => {
  return (
    <span className="capitalize">
      {props.row.original.user.name}
    </span>
  )
}

const StatusRow = ({ props }) => {
  return (
    <span className={`inline-flex font-300 items-center text-xs py-[6px] px-[13px] rounded-[13px] ${props.row.original.status == 'paid' ? 'bg-[#ddffcd] text-[#007f00]' :
      props.row.original.status == 'declined' ? 'bg-[#ffd3d3] text-[#f90000]' :
        'bg-orange-300 text-orange-900'}`
    }>
      <div className={`rounded-full w-[6px] h-[6px] mr-2 ${props.row.original.status == 'paid' ? 'bg-[#007f00]' :
        props.row.original.status == 'declined' ? 'bg-[#f90000]' :
          'bg-orange-900'
        }`}></div>
      {props.row.original.status}
    </span>
  )
}

const DeleteRow = ({ props, setOpen, setSelectedTransaction }) => {
  const handleDelete = (id) => {
    setSelectedTransaction(id)
    setOpen(true)
  }

  return (
    <>
      <span className="flex items center">
        <PencilSquareIcon className="mr-2 h-5 w-5 text-orange-500 cursor-pointer" />
        <TrashIcon
          onClick={() => handleDelete(props.row.original.id)}
          className="mr-2 h-5 w-5 text-red-500 cursor-pointer"
        />
      </span>
    </>
  )
}


const baseURL = "https://nominet.vensle.com/backend";

const Transactions = () => {
  const [open, setOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState('')

  const columns = useMemo(() => columnsData(setOpen, setSelectedTransaction), []);
  const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state?.auth?.user?.token);

  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  function formatPrice(price) {
    return Number(parseFloat(price).toFixed(2)).toLocaleString('en', {
      minimumFractionDigits: 2
    });
  }

  const deleteTransaction = async () => {
    setDeleteLoading(true)
    try {
      const response = await axios.get(`${baseURL}/api/v1/transactions/${selectedTransaction}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const filteredTransaction = data.filter(item => item.id != selectedTransaction)
      console.log('starrrrrt', filteredTransaction)
      setData(filteredTransaction)
      setDeleteLoading(false)
      setOpen(false)
    } catch (error) {
      console.error("Error fetching users:", error);
      setDeleteLoading(false)
    }
  };


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/v1/transactions`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const extractedData = response.data.data.map(
          ({
            amount,
            created_at,
            ...rest
          }) => ({
            amount: formatPrice(amount),
            created_at: moment(created_at).format('YYYY/MM/DD'),
            ...rest,
          })
        );

        setData(extractedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTransactions();
  }, [accessToken, data]);

  return (
    <div>
      <div className="bg-[#f5eeff] rounded-lg">
        <div style={{columnGap: "5%"}} className="py-[2.5rem] px-[9%] mb-6 mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
          <AdminAnalytic />
          <AdminAnalytic />
          <AdminAnalytic last={true} />
        </div>
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
                stroke="#06164b"
                fill="#37436f"
                dataKey="product1"
              />
              <Area
                stroke="#ff5959"
                fill="#fb8c8e"
                dataKey="product2"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <CustomDialog deleteTransaction={deleteTransaction} open={open} setOpen={setOpen} deleteLoading={deleteLoading} />

      <div className="mt-5 relative min-h-[25rem] grid h-full grid-cols-1 gap-5">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Transactions;
