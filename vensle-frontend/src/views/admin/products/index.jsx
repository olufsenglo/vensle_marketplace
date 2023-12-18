import React, { useState, useEffect } from 'react';



import {
  columnsDataComplex,
} from "./variables/columnsData";
import tableDataComplex from "./variables/tableDataComplex.json";
import ComplexTable from "./components/ComplexTable";


const invoicesData = [
  {
    date: "March, 01, 2020",
    code: "#MS-415646",
    price: "$180",
    logo: "logo.com",
    format: "PDF",
  },
  {
    date: "February, 10, 2020",
    code: "#RV-126749",
    price: "$250",
    logo: "log",
    format: "PDF",
  },
  {
    date: "April, 05, 2020",
    code: "#FB-212562",
    price: "$560",
    logo: "logo",
    format: "PDF",
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
	const extractedData = data.data.map(({ name, condition, price, status, created_at }) => ({
	  name,
	  condition,
	  price,
	  status,
	  created_at,
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
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />)}





      </div>
    </div>
  );
};

export default Tables;
