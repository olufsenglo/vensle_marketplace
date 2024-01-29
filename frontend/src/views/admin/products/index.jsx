import React, { useState, useEffect } from 'react';
import moment from 'moment';

import {
  columnsDataComplex,
} from "./variables/columnsData";
import tableDataComplex from "./variables/tableDataComplex.json";
import ComplexTable from "./components/ComplexTable";

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
  const baseURL = 'https://nominet.vensle.com/backend';
  
  const [products, setProducts] = useState([]);
  const [extractedData, setExtractedData] = useState([]);


  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/products`);
        const data = await response.json();
	const extractedData = data.data.map(({ id, name, category, condition, price, status, created_at, ...rest }) => ({
	  id,
	  name,
	  category: category.name,
	  condition,
	  price,
	  status,
	  created_at: moment(created_at).fromNow(),
          ...rest
	}));
	console.log(data.data);
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
