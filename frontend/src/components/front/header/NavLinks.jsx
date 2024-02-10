import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NavCategories from "./NavCategories";

const NavLinks = ({ storedCountryFlag, handleGetUserCountry }) => {
  const baseURL = "http://localhost:8000";
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
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <ul
          style={{ gap: "2%" }}
          className="flex items-center justify-between py-2 lg:justify-start"
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
              <li className="hidden lg:block" key={category.id}>
                <a href={`/filter?searchTerm=&category_id=${category.id}`}>
                  {category.name}
                </a>
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
