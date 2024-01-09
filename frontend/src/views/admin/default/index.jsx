import React, { useState, useEffect } from 'react';

import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

import TopCreatorTable from "./components/TableTopCreators";


import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";

const content = [
  {
    "name": [
      "Iphon 11 pro max",
      "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80"
    ],
    "category": "Fashion",
    "price": "900",
    "ratings": 30,
    "status": "Active",
    "created_at": "12-11",
  },
]


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
  const [extractedData, setExtractedData] = useState([]);
  const [data, setData] = useState([]);

    const getDisplayImage = (image) => {
      return image && image.name ? `http://127.0.0.1:8000/uploads/${image.name}` : '';
    };

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/products');
        const data = await response.json();
	const extractedData = data.data.map(({ name, display_image, category, condition, price, status, created_at }) => ({
	  name: [name, getDisplayImage(display_image)],		
	  category: category.name,
	  condition,
	  price,
	  status,
	  created_at,
	}));
	setExtractedData(extractedData);
	setData(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Call the fetch function
    fetchProducts();
  }, []);	


  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"For sale uploads"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Request uploads"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Orders Recieved"}
          subtitle={"$574.34"}
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
