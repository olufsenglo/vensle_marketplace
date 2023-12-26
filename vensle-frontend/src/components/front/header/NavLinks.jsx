import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import NavCategories from "./NavCategories";

const NavLinks = () => {
  const [categories, setCategories] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/categories');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

	

    return (
        <div style={{ "background-color":"black", "color": "white" }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <ul style={{gap:"2%"}} className="flex py-2">
                    <li className="mr-6">
	    		<NavCategories />
	      	    </li>
	    		

                {categories ? categories.map((category) => (
                  <li key={category.id}>
			<a href={`/filter?searchTerm=&category_id=${category.id}`}>
                    	    {category.name}
			</a>
		  </li>
                )) : <li>Loading . . .</li> }
                </ul>
            </div>
        </div>
    )
}

export default NavLinks;
