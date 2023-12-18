import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';

import { login } from "actions/auth";

import Footer from "components/front/footer/Footer";
import Header from "components/front/header/Header";

import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  fetchCartItems,
} from 'actions/actions';

const Cart = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const hasItems = cartItems.length > 0;
    const [productIds] = useState(hasItems ? cartItems.map(item => item.id) : []);

	console.log(productIds);
    const getCartDisplayImage = (product) => {
      return product.display_image ? `http://127.0.0.1:8000/uploads/${product.display_image.name}` : '';
    };


  const handleToken = async (token) => {
    try {
    
    //if (cartItems.length === 0) {
      // Display a message to the user that the cart is empty
      //console.log('The cart is empty. Add items to the cart before checkout.');
      //return;
    //}
	    
      const response = await axios.post('http://127.0.0.1:8000/api/v1/payment', { product_ids: productIds }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

	    console.log(response)

      window.location.href = response.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error('Error initiating payment:', error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

    return (
<div>
    <Header />

    <div className="min-h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3 bg-white  p-6">
                <div className="flow-root">
     {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (

                <ul>
                {cartItems.map((item) => (
                <li key={item.id} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="shrink-0">
                    <img
			className="h-24 w-24 max-w-full rounded-lg object-cover"
			src={getCartDisplayImage(item)} alt={item.name} />
                    </div>

                    <div className="relative flex flex-1 flex-col justify-between">
                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                        <div className="pr-8 sm:pr-5">
                        <p className="text-base font-semibold text-gray-900">Nike Air Max 2019</p>
                        <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">36EU - 4US</p>
                        </div>

                        <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                        <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">$259.00</p>

                        <div className="sm:order-1">
                            <div className="mx-auto flex h-8 items-stretch text-gray-600">
                            <button className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">-</button>
                            <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">1</div>
                            <button className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                        <button type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" className=""></path>
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

            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">$129.99</p>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
                </div>
            </div>

      <StripeCheckout
        stripeKey="pk_test_51OL7LdDwlZKF9BGtT3xl3qSKbORzgTTnqMTT3UnQ1UJQxC1eCcZ9RE3Di0yCzhThEsXqOlEblC5KiqX6RUf6FiH600aDLCBme2"
        token={handleToken}
        amount={0} // Set to 0 as the amount will be calculated on the server
        name="Your Product"
        billingAddress
        shippingAddress
      />
            <button onClick={handleToken} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
            </div>
        </div>
    </div>    

    <Footer />
</div>        
    )
}

export default Cart;
