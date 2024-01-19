import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Footer from "components/front/footer/Footer";
import Header from "components/front/header/Header";

import Product from './Product';
import Grocery from "./Grocery";

import seller from "assets/img/front/productDetail/seller.jpg";

const UserProfile = () => {
  const baseURL = 'http://nominet.vensle.com/backend';
  const [products, setProducts] = useState([]);
  const { userId } = useParams();
  const [user, setUser] = useState(null);


    const getImagePath = (product) => {
      return `${baseURL}/uploads/${product.name}`;
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/v1/user/${userId}/products`);
        setUser(response.data.user);
        setProducts(response.data.products.data);
        console.log('uerrr',response.data);
      } catch (error) {
        console.error('Error fetching user details and products:', error);
      }
    };

    fetchData();
  }, [userId]);



    return (
        <div className="bg-white">
<Header />


      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
	    {console.log('sellersss',products)}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">



	  <div className="relative flex items-start mt-4">
{!user &&
<div style={{"zIndex":"5"}} className="absolute py-12 flex justify-center w-full h-full bg-white">
	<p>Loading...</p>
</div>
}



		  <img src={seller} alt="seller" />
		  <div className="ml-4">
		    <h3 className="text-lg tracking-tight text-gray-900 sm:text-lg">Absolutely Anything Store</h3>
		    <h4 className="text-lg tracking-tight text-gray-400 sm:text-lg">{user && user.name}</h4>
	  	</div>
	  </div>



              <div className="lg:col-span-3">

<div className="mt-6 relative grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">

{!products.length &&
<div style={{"zIndex":"5"}} className="absolute py-12 flex justify-center w-full h-full bg-white">
	<p>Loading...</p>
</div>
}
            {products && products.map((product) => (
		    <>
		    {product.type == 'product' ? <Product product={product} /> : <Grocery product={product} />}
		    </>
            ))}

</div>


              </div>
            </div>
        </div>






<Footer />
        </div>                        
    )
}

export default UserProfile;
