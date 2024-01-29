import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import Products from "views/admin/products";
import UploadProduct from "views/admin/uploadproduct";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
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
    icon: <MdBarChart className="h-6 w-6" />,
    path: "products",
    component: <Products />,
  },   
  {
    name: "Orders",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
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
    icon: <MdBarChart className="h-6 w-6" />,
    path: "upload-product",
    component: <UploadProduct />,
  },  
];
export default routes;
