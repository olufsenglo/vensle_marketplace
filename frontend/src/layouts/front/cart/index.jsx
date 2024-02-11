import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Footer from "components/front/footer/Footer";
import Header from "components/front/header/Header";
import PreviewPopup from "components/front/previewPopup/PreviewPopup";
import SimilarProduct from "components/front/detail/SimilarProduct";

import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "actions/actions";

const baseURL = "http://localhost:8000";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state.auth?.user?.token);
  const tempCartItems = useSelector((state) => state.cart.items);

  const cartItems = tempCartItems.filter(item => item !== null);

  const hasItems = cartItems.length > 0;
  const [productIds] = useState(
    hasItems ? cartItems.map((item) => item.id) : []
  );
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleProductQuickView = (e, product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setOpen(true);
  };

  const totalPrice = cartItems.reduce((total, product) => {
    const productPrice = parseFloat(product.price);
    return total + productPrice;
  }, 0);

function formatPrice(price) {
  return Number(parseFloat(price).toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2
  });
}	

  const formattedTotalPrice = formatPrice(totalPrice);

  const getCartDisplayImage = (product) => {
    console.log(product);
    return product.display_image
      ? `${baseURL}/uploads/${product.display_image.name}`
      : "";
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleToken = async (token) => {
    try {
      setLoading(true);
      setErrorMessage('');
      //if (cartItems.length === 0) {
      // Display a message to the user that the cart is empty
      //console.log('The cart is empty. Add items to the cart before checkout.');
      //return;
      //}
console.log(accessToken)
      const response = await axios.post(
        `${baseURL}/api/v1/payment`,
        { product_ids: productIds },
        {
          headers: {
	    Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      window.location.href = response.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error initiating payment:", error.message);
      setErrorMessage('Error Processing your payment, please try again');
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      {selectedProduct && (
        <PreviewPopup
          open={open}
          setOpen={setOpen}
          selectedProduct={selectedProduct}
        />
      )}

     <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
      <div className="min-h-[70vh] pt-10">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

        <div className="mx-auto justify-center lg:flex lg:space-x-6">
          <div className="rounded-lg bg-white p-6 lg:w-2/3">
            <div className="flow-root">
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul>
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                    >
                      <div className="shrink-0">
                        <img
                          onClick={(e) => handleProductQuickView(e, item)}
                          className="h-24 w-24 max-w-full cursor-pointer rounded-lg object-cover"
                          src={getCartDisplayImage(item)}
                          alt={item.name}
                        />
                      </div>

                      <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                          <div onClick={(e) => handleProductQuickView(e, item)} className="pr-8 sm:pr-5 cursor-pointer">
                            <p className="text-base font-semibold text-gray-900">
                              {item.name}
                            </p>
                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                              Qty {item.quantity}
                            </p>
                          </div>

                          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p className="shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                              $ {formatPrice(item.price * item.quantity)}
                            </p>

                            <div className="sm:order-1">
                              <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                <button
                                  onClick={() =>
                                    handleDecreaseQuantity(item.id)
                                  }
                                  className="hover:bg-black flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:text-white"
                                >
                                  -
                                </button>
                                <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                  {item.quantity}
                                </div>
                                <button
                                  onClick={() =>
                                    handleIncreaseQuantity(item.id)
                                  }
                                  className="hover:bg-black flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:text-white"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            type="button"
                            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-900 focus:shadow"
                          >
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                                className=""
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md lg:mt-0 lg:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${formattedTotalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$0.00</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">${formattedTotalPrice}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            {/*
            <StripeCheckout
              stripeKey="pk_test_51OL7LdDwlZKF9BGtT3xl3qSKbORzgTTnqMTT3UnQ1UJQxC1eCcZ9RE3Di0yCzhThEsXqOlEblC5KiqX6RUf6FiH600aDLCBme2"
              token={handleToken}
              amount={0} // Set to 0 as the amount will be calculated on the server
              name="Your Product"
              billingAddress
              shippingAddress
            />*/}
	   {isAuthenticated ?
            <button
              onClick={handleToken}
              disabled={loading}
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              {loading ? "Loading ..." : "Checkout"}
            </button>
	   :
            <button
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
		   Please Login to checkout
            </button>
	   }
          </div>
        </div>
      </div>
	
	{cartItems && <SimilarProduct products={cartItems} />}

      </div>

      <Footer />

    </div>
  );
};

export default Cart;
