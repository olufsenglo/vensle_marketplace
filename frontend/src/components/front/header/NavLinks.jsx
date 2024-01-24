import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import NavCategories from "./NavCategories";

const NavLinks = ({ storedCountryFlag, handleGetUserCountry }) => {
  const baseURL = "https://nominet.vensle.com/backend"
  const [categories, setCategories] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/categories`);
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

	

    return (
        <div className="text-white relative" style={{ "background-color":"black" }}>
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <ul style={{gap:"2%"}} className="flex justify-between lg:justify-start items-center py-2">
                    <li className="mr-6">
	    		<NavCategories />
	      	    </li>
	    		
                        <li className="flex text-xs lg:hidden items-center">
	    			{storedCountryFlag && 
					<img className="w-4 h-4 mr-2 rounded-full" src={storedCountryFlag} alt="country flg" />
				}
	    			{handleGetUserCountry()}
	    		</li>


                {categories ? categories.map((category) => (
                  <li className="hidden lg:block" key={category.id}>
			<a href={`/filter?searchTerm=&category_id=${category.id}`}>
                    	    {category.name}
			</a>
		  </li>
                )) : <li className="hidden lg:block">Loading . . .</li> }
                </ul>
            </div>
        </div>
    )
}

export default NavLinks;
