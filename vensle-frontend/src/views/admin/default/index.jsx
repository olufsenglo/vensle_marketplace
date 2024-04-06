import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Card from "components/card";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TopCreatorTable from "./components/TableTopCreators";

import { IoDocuments } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";

import Widget from "components/widget/Widget";

const tableColumnsTopCreators = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Rating",
    accessor: "ratings",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  //  {
  //    Header: "Upload Date",
  //    accessor: "created_at",
  //  },
];

const Dashboard = () => {
  const baseURL = "https://nominet.vensle.com/backend";
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state.auth?.user?.token);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [extractedData, setExtractedData] = useState([]);
  const [latestMessages, setLatestMessages] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  useEffect(() => {
    const fetchLatestMessages = async () => {
	    setErrorMessage('')
        setLoading(true);
      try {
	const response = await axios.get('https://nominet.vensle.com/backend/api/v1/messages/inbox?per_page=4', {
	  headers: {
  	     Authorization: `Bearer ${accessToken}`
	     }
	 })
        const data = response.data;
        setLatestMessages(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inbox messages:', error);
        setErrorMessage("Error fetching messages")
        setLoading(false);
      }
    };

    fetchLatestMessages();
  }, []);
	

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/products`);
        const data = await response.json();
        const extractedData = data.data.map(
          ({
            name,
            display_image,
            category,
            condition,
            price,
            status,
            created_at,
          }) => ({
            name: [name, getDisplayImage(display_image)],
            category: category.name,
            condition,
            price,
            status,
            created_at,
          })
        );
        setExtractedData(extractedData);
        setData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const productsResponse = await axios.get(
        `${baseURL}/api/v1/products/upload/total`,
        { headers }
      );
      setTotalProducts(productsResponse.data.totalUploadedProducts);

      const requestsResponse = await axios.get(
        `${baseURL}/api/v1/products/request/total`,
        { headers }
      );
      setTotalRequests(requestsResponse.data.totalRequests);

      const ordersResponse = await axios.get(`${baseURL}/api/v1/orders/total`, {
        headers,
      });
      setTotalOrders(ordersResponse.data.totalOrders);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
      	{/* TODO: Get currency */}
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"For sale uploads"}
          subtitle={`£${totalProducts}`}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Request uploads"}
          subtitle={`£${totalRequests}`}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Orders Recieved"}
          subtitle={`${totalOrders}`}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
      	  <div className="grid grid-cols-1 col-span-1 md:col-span-2 gap-5">
        	<WeeklyRevenue />
	  </div>
	  <Card extra={"w-full p-4 h-full"}>
	      <div className="rounded-t-3xl p-3">
		<div className="text-lg font-bold text-navy-700 dark:text-white">
		  Recent Messages
		</div>
	      </div>
		<div className="flex-1 flex flex-col gap-3">
	  	   {loading && <p>Loading...</p>}
	  	   {!loading && latestMessages.length == 0 && <p>There are no recent messages</p>}
		   {!loading && latestMessages.length > 0 && latestMessages.map((message)=>
			<div key={message.id} className="flex">
				{message.product?.display_image && 
				(<div className="w-5 h-full mr-2 w-12 h-12 rounded-full border border-4">
				    <img
				      src={getImagePath(message.product.display_image.name)}
				      alt={message.product.display_image.name}
				      className="rounded-full"
				     />
				</div>)}
				<div>
					<h4 className="font-medium line-clamp-1">
			   			{message.sender.name}
			   		</h4>
					<p className="text-gray-600 text-xs line-clamp-1">{moment(message.created_at).fromNow()}</p>
					<p className="text-sm line-clamp-1">{message.content}</p>
				</div>
			</div>
		    )}
		</div>

		<div className="mt-8">
		    <Link to="/admin/messages/inbox" className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
		  	See all
		    </Link>
	  	</div>
	  </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <TopCreatorTable
          tableData={extractedData}
          columnsData={tableColumnsTopCreators}
        />
      </div>
    </div>
  );
};

export default Dashboard;
