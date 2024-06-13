import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import AdminDashboard from "views/admin/admindashboard";
import Orders from "views/admin/marketplace";
import Profile from "views/admin/profile";
import Products from "views/admin/products";
import Users from "views/admin/users";
import Chats from "views/admin/chats";
import AllProducts from "views/admin/allproducts";
import Transactions from "views/admin/transactions";
import Reviews from "views/admin/reviews";
import UploadProduct from "views/admin/uploadproduct";
import Messages from "views/admin/messages";
import SentMessages from "views/admin/messages/SentMessages";

// Icon Imports
import {
  MdHome,
  MdOutlineBallot,
  MdOutlineShoppingCart,
  MdBarChart,
  MdCollections,
  MdMoveToInbox,
  MdOutlineFileUpload,
  MdOutbox,
  MdPerson,
  MdRateReview,
  MdMoney,
  MdSupervisedUserCircle,
  MdFileCopy,
} from "react-icons/md";

const routes = [
  {
    name: "User Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Admin Dashboard",
    layout: "/admin",
    path: "admin-dashboard",
    icon: <MdOutlineBallot className="h-6 w-6" />,
    component: <AdminDashboard />,
  },
  {
    name: "Driver Dashboard",
    layout: "/admin",
    path: "driver-dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
    secondary: true,
  },
  {
    name: "Uploads",
    layout: "/admin",
    icon: <MdCollections className="h-6 w-6" />,
    path: "products",
    component: <Products />,
    secondary: true,
  },   
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Orders />,
    secondary: true,
  },
  {
    name: "Profile Lists",
    layout: "/admin",
    path: "users",
    icon: <MdSupervisedUserCircle className="h-6 w-6" />,
    component: <Users />,
    secondary: true,
  },
  {
    name: "Products",
    layout: "/admin",
    path: "allproducts",
    icon: <MdFileCopy className="h-6 w-6" />,
    component: <AllProducts />,
    secondary: true,
  },
  {
    name: "Transactions",
    layout: "/admin",
    path: "transactions",
    icon: <MdMoney className="h-6 w-6" />,
    component: <Transactions />,
  },
  {
    name: "Messages",
    layout: "/admin",
    path: "messages",
    icon: <MdRateReview className="h-6 w-6" />,
    component: <Chats />,
  },
  {
    name: "Reviews",
    layout: "/admin",
    path: "reviews",
    icon: <MdRateReview className="h-6 w-6" />,
    component: <Reviews />,
  },
  {
    name: "Inbox",
    layout: "/admin",
    path: "messages/inbox",
    icon: <MdMoveToInbox className="h-6 w-6" />,
    component: <Messages />,
    secondary: true,
  },
  {
    name: "Sent Messages",
    layout: "/admin",
    path: "messages/sent",
    icon: <MdOutbox className="h-6 w-6" />,
    component: <SentMessages />,
    secondary: true,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },  
  {
    name: "Upload Product",
    layout: "/admin",
    icon: <MdOutlineFileUpload className="h-6 w-6" />,
    path: "upload-product",
    component: <UploadProduct />,
  },  
];
export default routes;
