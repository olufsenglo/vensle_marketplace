import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "components/card";
import axios from "axios";
import {
  ArrowLeftIcon,
} from "@heroicons/react/20/solid";


const baseURL = "https://nominet.vensle.com/backend";

const OrderItems = () => {
  const accessToken = useSelector((state) => state.auth?.user?.token);

  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURL}/api/v1/user/orders/${orderId}`, {
	       headers: {
		   Authorization: `Bearer ${accessToken}`,
	       },
	  }
        );

        console.log(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        //navigate("/admin");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="mt-5">
	  
	  <ArrowLeftIcon className="h-4 w-4 mr-1" />
	  <div className="flex justify-between w-full">
	     <h1>Order_1234</h1>
	     <div className="">
	  	<span className="bg-green-200 text-green-800 px-3 py-1 rounded-md">
	  	   Paid
	  	</span>
	  	<span className="">
	   	   Unfulfilled
	  	</span>
	     </div>
	  </div>

          <div className="col-span-12 lg:!mb-0">
            <Card extra={"w-full p-4 h-full"}>
	    </Card>

            <Card extra={"w-full p-4 h-full"}>
	  	<div>
	  	   <span className="bg-green-200 text-green-800 px-3 py-1 rounded-md">Paid</span>
	        </div>
	    </Card>
	  </div>
    </div>
  );
};

export default OrderItems;
