import React from "react";

// Admin Imports
import AdminDashboard from "views/admin/admindashboard";
import UserDashboard from "views/admin/userdashboard";
import Profile from "views/admin/profile";
import Users from "views/admin/users";
import Chats from "views/admin/chats";
import AllProducts from "views/admin/allproducts";
import UserOrders from "views/admin/userOrders";
import UserProducts from "views/admin/userProducts";
import Transactions from "views/admin/transactions";
import Reviews from "views/admin/reviews";
import UploadProduct from "views/admin/uploadproduct";
import Analytics from "views/admin/analytics";
import Products from "views/admin/products";

// Icon Imports
import {
  MdHome,
  MdOutlineBallot,
  MdOutlineShoppingCart,
  MdBarChart,
  MdOutlineFileUpload,
  MdPerson,
  MdMoney,
  MdSupervisedUserCircle,
  MdFileCopy,
  MdCollections,
  MdFastForward,
} from "react-icons/md";
import {
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

const routes = [
  {
    name: "User Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <UserDashboard />
  },
  {
    name: "Upload Product",
    layout: "/admin",
    icon: <MdOutlineFileUpload className="h-6 w-6" />,
    path: "upload-product",
    component: <UploadProduct />,
  },
  {
    name: "User Products",
    layout: "/admin",
    path: "user-products",
    icon: <MdFastForward className="h-6 w-6" />,
    component: <UserProducts />,
    secondary: true,
  },
  {
    name: "User Orders",
    layout: "/admin",
    path: "user-orders",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <UserOrders />,
    secondary: true,
  },
  {
    name: "Messages",
    layout: "/admin",
    path: "messages",
    icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
    component: <Chats />,
  },
  {
    name: "Analytics",
    layout: "/admin",
    path: "analytics",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Analytics />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  // {
  //   name: "Uploads",
  //   layout: "/admin",
  //   icon: <MdCollections className="h-6 w-6" />,
  //   path: "products",
  //   component: <Products />,
  //   secondary: true,
  // },
  {
    name: "Transactions",
    layout: "/admin",
    path: "transactions",
    icon: <MdMoney className="h-6 w-6" />,
    component: <Transactions />,
  },
  {
    name: "Admin Dashboard",
    layout: "/admin",
    path: "admin-dashboard",
    icon: <MdOutlineBallot className="h-6 w-6" />,
    component: <AdminDashboard />,
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
    name: "Reviews",
    layout: "/admin",
    path: "reviews",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <Reviews />,
  },

  // {
  //   name: "Inbox",
  //   layout: "/admin",
  //   path: "messages/inbox",
  //   icon: <MdMoveToInbox className="h-6 w-6" />,
  //   component: <Messages />,
  //   secondary: true,
  // },
  // {
  //   name: "Sent Messages",
  //   layout: "/admin",
  //   path: "messages/sent",
  //   icon: <MdOutbox className="h-6 w-6" />,
  //   component: <SentMessages />,
  //   secondary: true,
  // },
  /*{
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Orders />,
    secondary: true,
  },*/
];
export default routes;
