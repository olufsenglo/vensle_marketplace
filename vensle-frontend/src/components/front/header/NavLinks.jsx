import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import NavCategories from "./NavCategories";

const baseURL = "https://nominet.vensle.com/backend";

const NavLinks = ({ storedCountryFlag, handleGetUserCountry }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category_id") || "";

  const [categories, setCategories] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/categories`);
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      className="relative text-white"
      style={{ "background-color": "black" }}
    >
      <div className="mx-auto max-w-2xl px-4 py-[1px] sm:px-6 lg:max-w-7xl lg:px-8">
        <ul
          style={{ gap: "1%" }}
          className="flex min-h-[40px] items-center justify-between lg:justify-start"
        >
          <li className="mr-6">
            <NavCategories />
          </li>

          <li className="flex items-center text-xs lg:hidden">
            {storedCountryFlag && (
              <img
                className="mr-2 h-4 w-4 rounded-full"
                src={storedCountryFlag}
                alt="country flg"
              />
            )}
            {handleGetUserCountry()}
          </li>

          {categories ? (
            categories.map((category) => (
              <li
                key={category.id}
                className={`
                hidden rounded-sm py-2 px-2 transition-all duration-300 ease-in-out hover:bg-gray-400/50 lg:block 
		            ${categoryId === category.id && "bg-gray-400/50"}`
                }
              >
                <Link to={`/filter?searchTerm=&category_id=${category.id}`}>
                  {category.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="hidden lg:block">Loading . . .</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavLinks;
