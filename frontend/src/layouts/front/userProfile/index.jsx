import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { PhoneIcon } from "@heroicons/react/20/solid";

import Footer from "components/front/footer/Footer";
import Header from "components/front/header/Header";

import Product from "components/front/product/Product";
import Grocery from "components/front/product/Grocery";

import seller from "assets/img/front/productDetail/seller.jpg";

const baseURL = "http://localhost:8000";
const UserProfile = () => {
  const [products, setProducts] = useState([]);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/v1/user/${userId}/products`
        );
        setUser(response.data.user);
        setProducts(response.data.products.data);
        console.log("uerrr", response.data);
      } catch (error) {
        console.error("Error fetching user details and products:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="bg-white">
      <Header />

      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="grid min-h-[30rem] grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div className="relative mt-4 flex flex-col items-center">
            {!user && (
              <div
                style={{ zIndex: "5" }}
                className="absolute flex h-full w-full justify-center bg-white py-12"
              >
                <p>Loading...</p>
              </div>
            )}

            <img src={seller} className="w-full px-4" alt="seller" />
            <div className="mt-4 text-center">
              <h3 className="text-lg tracking-tight text-gray-900 sm:text-lg">
                Absolutely Anything Store
              </h3>
              <h4 className="text-lg tracking-tight text-gray-400 sm:text-lg">
                {user && user.name}
              </h4>
            </div>

            <div className="w-full">
              <span
                onClick={() => setShowContact(true)}
                className="mt-8 block w-full cursor-pointer rounded-md bg-red-600 px-3 py-3 text-center text-sm text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                {showContact ? (
                  user.phone_number
                ) : (
                  <span className="flex items-center justify-center">
                    <PhoneIcon className="mr-4 h-4 w-4" /> VIEW CONTACT
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="relative mt-6 grid min-h-[10rem] grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {!products.length && (
                <div
                  style={{ zIndex: "5" }}
                  className="absolute flex h-full w-full justify-center bg-white py-12"
                >
                  <p>Loading...</p>
                </div>
              )}
              {products &&
                products.map((product) => (
                  <>
                    {product.type == "product" ? (
                      <Product product={product} custom="height" height="14" />
                    ) : (
                      <Grocery product={product} custom="height" height="14" />
                    )}
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
