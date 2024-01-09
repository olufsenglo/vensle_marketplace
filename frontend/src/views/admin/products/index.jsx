import React, { useState, useEffect } from 'react';

import {
  columnsDataComplex,
} from "./variables/columnsData";
import tableDataComplex from "./variables/tableDataComplex.json";
import ComplexTable from "./components/ComplexTable";


const content = [
  {
    "name": "Marketname",
    "category": "Fashion",
    "price": "261",
    "condition": "old",
    "status": "Approved",
    "date": "24.Jan.2021",
  },
]

const columnsData = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "CATEGORY",
    accessor: "category",
  },
  {
    Header: "PRICE",
    accessor: "price",
  },
  {
    Header: "CONDITION",
    accessor: "condition",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "UPLOAD DATE",
    accessor: "created_at",
  },
];

const Tables = () => {
  const [products, setProducts] = useState([]);
  const [extractedData, setExtractedData] = useState([]);


  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/products');
        const data = await response.json();
	const extractedData = data.data.map(({ id, name, category, condition, price, status, created_at, ...rest }) => ({
	  id,
	  name,
	  category: category.name,
	  condition,
	  price,
	  status,
	  created_at,
          ...rest
	}));
	console.log(extractedData);
	setProducts(data.data);
	setExtractedData(extractedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Call the fetch function
    fetchProducts();
  }, []);	

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        {extractedData && (<ComplexTable
          columnsData={columnsData}
          tableData={extractedData}
		usePagination={true}
        />)}

      </div>
    </div>
  );
};

export default Tables;
