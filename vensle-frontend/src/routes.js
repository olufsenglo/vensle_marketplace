import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Orders from "views/admin/marketplace";
import Profile from "views/admin/profile";
import Products from "views/admin/products";
import UploadProduct from "views/admin/uploadproduct";
import Messages from "views/admin/messages";
import SentMessages from "views/admin/messages/SentMessages";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdCollections,
  MdMoveToInbox,
  MdOutlineFileUpload,
  MdOutbox,
  MdPerson,
} from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Uploads",
    layout: "/admin",
    icon: <MdCollections className="h-6 w-6" />,
    path: "products",
    component: <Products />,
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
