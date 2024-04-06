import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";

const baseURL = "https://nominet.vensle.com/backend";
const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state.auth?.user?.token);
  const user = useSelector((state) => state.auth?.user?.user);

  const [products, setProducts] = useState([]);
  const [extractedData, setExtractedData] = useState([]);
  const [orders, setOrders] = useState([]);

  const getDisplayImage = (image) => {
    const name = image ? image.name : "";
    return `${baseURL}/uploads/${name}`;
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/products`);
        const data = await response.json();
        const extractedData = data.data.map(
          ({ name, category, condition, price, status, created_at }) => ({
            name,
            category: category.name,
            condition,
            price,
            status,
            created_at,
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/v1/user/orders`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <div className="mt-5 grid h-full">
        <HistoryCard products={orders} />
      </div>
      <div className="mt-5 grid h-full">
        <TopCreatorTable
          extra="mb-5"
          tableData={tableDataTopCreators}
          columnsData={tableColumnsTopCreators}
        />
      </div>

      <h2 className="mt-6 pl-2 text-xl font-bold">Requests</h2>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-4">
        {products &&
          products.map((product) => (
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title={product.name}
              author={product.user.name}
              price={product.price}
              currency={product.currency}
              image={getDisplayImage(product.display_image)}
            />
          ))}
      </div>
    </div>
  );
};

export default Orders;
