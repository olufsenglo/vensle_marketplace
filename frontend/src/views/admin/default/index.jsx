import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

import TopCreatorTable from "./components/TableTopCreators";

import TotalSpent from "views/admin/default/components/TotalSpent";
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
  const baseURL = "http://localhost:8000";
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const accessToken = useSelector((state) => state.auth?.user?.token);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [extractedData, setExtractedData] = useState([]);
  const [data, setData] = useState([]);

  const getDisplayImage = (image) => {
    return image && image.name ? `${baseURL}/uploads/${image.name}` : "";
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, accessToken]);

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

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
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
