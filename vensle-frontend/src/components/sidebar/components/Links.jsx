/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
// chakra imports

export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div
		className={`relative mb-3 mr-2 rounded-sm flex hover:cursor-pointer ${
                  activeRoute(route.path) === true && "bg-[#475077]"
	        }`}
	    >
              <li
                className="my-[8px] px-[1.3rem] flex cursor-pointer items-center"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "text-white dark:text-white"
                      : "text-[#bcc4f2]"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`text-[14px] font-light ml-3 flex ${
                    activeRoute(route.path) === true
                      ? "text-white dark:text-white"
                      : "text-[#bcc4f2]"
                  }`}
                >
                  {route.name}
                </p>
              </li>
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
