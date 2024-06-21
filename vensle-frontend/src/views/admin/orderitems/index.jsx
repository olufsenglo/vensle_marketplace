import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "components/card";
import axios from "axios";
import {
  ArrowLeftIcon,
  StarIcon,
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
      <div className="flex items-center w-full mb-5">
        <Link to="/admin/orders">
          <ArrowLeftIcon className="h-6 w-6 mr-2" />
        </Link>
        <h1 className="text-2xl font-medium">Order_1234</h1>
        <div className="">
          <span className="bg-green-200/50 text-xs ml-4 text-green-800 px-8 py-1 rounded-md">
            Paid
          </span>
          <span className="bg-green-200/50 text-xs ml-4 text-green-800 px-3 py-1 rounded-md">
            Delivered
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        <div className="mt-5 col-span-8">
          <div className="col-span-12 lg:!mb-0">
            <Card extra={"w-full h-full"}>
              <div className="border-b p-4 border-b-gray-200 p6">
                <span className="bg-green-200/50 font-medium text-green-800 px-4 py-1 rounded-md">
                  Delivered (2)
                </span>
                <h5 className="text-xs mt-4 text-gray-700">
                  October 23rd, 2023 at 02:34pm
                </h5>
              </div>
              <div className="p-4">
                <div className="flex gap-4 mb-6">
                  <div className="px-3 rounded-sm h-[3.5rem] bg-gray-200">Img</div>
                  <div>
                    <div className="flex justify-between">
                      <p>Women New Style Dresses Fashion</p>
                      <p>$124.00 x 1</p>
                      <p>$124.00</p>
                    </div>
                    <div className="mt-5">
                      <p className="text-gray-700 text-sm mb-2">Product Details</p>
                      <p className="w-[70%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="px-3 rounded-sm h-[3.5rem] bg-gray-200">Img</div>
                  <div>
                    <div className="flex justify-between">
                      <p>Women New Style Dresses Fashion</p>
                      <p>$124.00 x 1</p>
                      <p>$124.00</p>
                    </div>
                    <div className="mt-5">
                      <p className="text-gray-700 text-sm mb-2">Product Details</p>
                      <p className="w-[70%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card extra={"w-full p-4 mt-4 h-full"}>
              <div className="border-b p-4 border-b-gray-200 p6">
                <span className="bg-green-200/50 font-medium text-green-800 px-4 py-1 rounded-md">
                  Paid
                </span>
                <h5 className="text-xs mt-4 text-gray-700">
                  October 23rd, 2023 at 02:34pm
                </h5>
              </div>
              <div className="mt-2 px-4">
                <div className="flex mb-3 justify-between">
                  <p>Subtotal</p>
                  <p className="text-gray-700">2 items</p>
                  <p>$0.00</p>
                </div>
                <div className="flex mb-3 justify-between">
                  <p>Shipping fee</p>
                  <p>$23.30</p>
                </div>
                <div className="flex mb-3 text-lg font-medium justify-between">
                  <p>Total</p>
                  <p>$0.00</p>
                </div>
              </div>
            </Card>
            <Card extra={"w-full p-4 mt-4 h-full"}>
              <div className="p-4">
                <div className="mb-2">
                  <h5 className="text-xs mt-4 ml-5 mb-3 text-gray-700">
                    October 23rd, 2023 at 02:34pm
                  </h5>
                  <p className="flex items-center">
                    <span className="block w-2 h-2 bg-black rounded-full mr-3"></span>
                    Order has been marked as "received" from customer
                  </p>
                </div>
                <div className="mb-2">
                  <h5 className="text-xs mt-4 ml-5 mb-3 text-gray-700">
                    October 23rd, 2023 at 02:34pm
                  </h5>
                  <p className="flex items-center">
                    <span className="block w-2 h-2 bg-black rounded-full mr-3"></span>
                    Order has been marked as "received" from customer
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-5 col-span-4">
          <Card extra={"w-full p-4 h-full"}>
            <div className="mb-6">
              <div className="flex justify-between">
                <p className="font-medium text-lg">Customer Information</p>
                <span className="font-bold">/</span>
              </div>
              <form className="mt-4">
                <div>
                  <h5 className="text-xs text-gray-700">
                    Customer Name
                  </h5>
                  <p>Matilda Gray</p>
                </div>
                <div className="mt-4">
                  <h5 className="text-xs text-gray-700">
                    Contact Information
                  </h5>
                  <p> +441 435 670 670</p>
                  <p>matildagray@gmail.com</p>
                </div>
                <div className="mt-4">
                  <h5 className="text-xs text-gray-700">
                    Shipping Address
                  </h5>
                  <p>1693 Bighton Oak Lane<br />Houston, TX</p>
                </div>
              </form>
              <button className="mt-6 w-full py-2 rounded-md bg-[#ff5959] hover:bg-red-600 text-white">
                VIEW MESSAGES
              </button>
            </div>
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <p className="font-medium text-lg">Driver Information</p>
                <span className="text-xs text-[#ff5959]">VIEW TRACKING</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-[4rem] h-[4rem] rounded-full bg-gray-200"></div>
                <div className="flex flex-col justify-end items-end">
                  <h5 className="text-xs text-gray-700 mb-2">Driver Rating</h5>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className="h-[0.9rem] w-[0.9rem] ml-1 flex-shrink-0 text-orange-200"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <form className="mt-4">
                <div>
                  <h5 className="text-xs text-gray-700">
                    Driver Name
                  </h5>
                  <p>Matilda Gray</p>
                </div>
                <div className="mt-4">
                  <h5 className="text-xs text-gray-700">
                    Contact Information
                  </h5>
                  <p> +441 435 670 670</p>
                  <p>matildagray@gmail.com</p>
                </div>
                <div className="mt-4">
                  <h5 className="text-xs text-gray-700">
                    Total Rides
                  </h5>
                  <p>23 rides</p>
                </div>
              </form>
              <button className="mt-6 mb-1 w-full py-2 rounded-md bg-[#ff5959] hover:bg-red-600 text-white">
                VIEW MESSAGES
              </button>
              <button className="mt-6 w-full py-2 rounded-md border border-[#ff5959] bg-white hover:bg-[#ff5959] hover:text-white text-[#ff5959]">
                VIEW FEEDBACKS (24)
              </button>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default OrderItems;
