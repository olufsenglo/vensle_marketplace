import React, { useState, useEffect } from "react";
import moment from "moment";

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

const baseURL = "https://nominet.vensle.com/backend";
const Tables = () => {
  const [products, setProducts] = useState([]);
  const [extractedData, setExtractedData] = useState([]);

  function formatPrice(price) {
    return Number(parseFloat(price).toFixed(2)).toLocaleString('en', {
      minimumFractionDigits: 2
    });
  }	

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/products`);
        const data = await response.json();
        const extractedData = data.data.map(
          ({
            id,
            name,
            category,
            condition,
            price,
            status,
            created_at,
            ...rest
          }) => ({
            id,
            name,
            category: category.name,
            condition,
            price: formatPrice(price),
            status,
            created_at: moment(created_at).fromNow(),
            ...rest,
          })
        );
        setProducts(data.data);
        setExtractedData(extractedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="mt-5 min-h-[25rem] grid h-full grid-cols-1 gap-5">
        {extractedData && (
          <ComplexTable
            columnsData={columnsData}
            tableData={extractedData}
            usePagination={true}
          />
        )}
      </div>
    </div>
  );
};

export default Tables;
