import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Footer from "components/front/footer/Footer";
import Header from "components/front/header/Header";

import Product from "components/front/product/Product";
import Grocery from "components/front/product/Grocery";

const baseURL = "https://nominet.vensle.com/backend";
const UserProfile = () => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state.auth?.user?.token);

  const [loading, setLoading] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleClearSavedItems = async () => {
    try {
      const response = await axios.delete(
        `${baseURL}/api/v1/saved-products`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      );
      setSavedProducts([])
    } catch (error) {
      console.error("Error clearing saved products:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${baseURL}/api/v1/saved-products`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
        );
        setSavedProducts(response.data.saved_products);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching saved products:", error);
        setLoading(false)
      }
    };

    fetchData();
  }, []);




  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);  



  return (
    <div className="">
      <Header />



<div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 className="pr-3 mb-6 text-center text-xl md:text-xl font-semibold tracking-tight text-gray-900">
          Saved Items
        </h2>
        <div className="grid min-h-[30rem] grid-cols-1">
          <div className="">
            {savedProducts.length ?
              <p className="cursor-pointer hover:underline" onClick={handleClearSavedItems}>
                Clear All
              </p>
              :
              (!loading && <p className="text-center">You have no saved products</p>)
            }
            <div className="relative mt-6 grid min-h-[10rem] grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
              {loading && (
                <div
                  style={{ zIndex: "5" }}
                  className="absolute flex h-full w-full justify-center bg-white py-12"
                >
                  <p>Loading...</p>
                </div>
              )}
              {savedProducts &&
                savedProducts.map((savedProduct) => (
                  <>
                    {savedProduct.product.type == "product" ? (
                      <Product product={savedProduct.product} custom="height" height="14" />
                    ) : (
                      <Grocery product={savedProduct.product} custom="height" height="14" />
                    )}
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
