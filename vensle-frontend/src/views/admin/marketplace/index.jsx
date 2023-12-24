import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";

const Marketplace = () => {
  const navigate = useNavigate();	
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const accessToken = useSelector((state) => state.auth.user.token);
  const user = useSelector((state) => state.auth.user.user);

  const [products, setProducts] = useState([]);
  const [extractedData, setExtractedData] = useState([]);
  const [orders, setOrders] = useState([]);


    const getDisplayImage = (image) => {
      const name = image ? image.name : "";
      return `http://127.0.0.1:8000/uploads/${name}`;
    };

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/products');
        const data = await response.json();
	const extractedData = data.data.map(({ name, category, condition, price, status, created_at }) => ({
	  name,
	  category: category.name,
	  condition,
	  price,
	  status,
	  created_at,
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

  useEffect(() => {
	  const fetchOrders = async () => {
	    try {
	      const response = await axios.get('http://localhost:8000/api/v1/user/orders', {
		      headers: {
			      'Authorization': `Bearer ${accessToken}`,
		      },
	      });
		    console.log("succcces");
	      setOrders(response.data);
	    } catch (error) {
	      console.error('Error fetching orders:', error);
	    }	  
	  }
		  
	  fetchOrders();

  }, []);	


  return (
    <div>
	  {console.log('odaaaaas',orders)}
      <div className="mt-5 grid h-full">
	  {products && <HistoryCard products={products} />}
      </div>
      <div className="mt-5 grid h-full">
          <TopCreatorTable
            extra="mb-5"
            tableData={tableDataTopCreators}
            columnsData={tableColumnsTopCreators}
          />
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-4">
          {products && products.map((product) => (
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title={product.name}
              author="Nick Wilson"
              price={product.price}
              image={getDisplayImage(product.display_image)}
            />
          ))}
          
      </div>


    </div>
  );
};

export default Marketplace;
