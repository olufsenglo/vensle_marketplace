import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { XMarkIcon, CreditCardIcon } from "@heroicons/react/24/outline";

import Footer from "components/front/footer/Footer";
import Header from "components/front/header/Header";
import PreviewPopup from "components/front/previewPopup/PreviewPopup";
import SimilarProduct from "components/front/detail/SimilarProduct";

import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  emptyCart,
} from "actions/actions";

const baseURL = "https://nominet.vensle.com/backend";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state.auth?.user?.token);
  const user = useSelector((state) => state.auth?.user?.user);

  const tempCartItems = useSelector((state) => state.cart.items);
  const cartItems = tempCartItems.filter(item => item !== null);
  console.log('idems', cartItems)

  const hasItems = cartItems.length > 0;

  // const [orderItems, setOrderItems] = useState([]);	
  //useEffect(() => {
  //if (hasItems) {
  //const newOrderItems = cartItems.map((item) => ({
  //product_id: item.id,
  //quantity: item.quantity
  //}));
  //setOrderItems(newOrderItems);
  //}
  //}, []);

  //const newOrderItems = hasItems ? cartItems.map((item) => ({
  //product_id: item.id,
  //quantity: item.quantity
  //})) : [];
  //setOrderItems(newOrderItems);

  const [loading, setLoading] = useState(false);
  const [cartSuggestItemsLoading, setCartSuggestItemsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartSuggestItems, setCartSuggestItems] = useState([]);
  const [currentTab, setCurrentTab] = useState('cart');
  const [validatedTab, setValidatedTab] = useState('');
  const [checkoutBtnVal, setCheckoutBtnVal] = useState('Proceed to Checkout');
  const [errorMessage, setErrorMessage] = useState('');
  const [profileError, setProfileError] = useState({});
  const [paymentModeError, setPaymentModeError] = useState(null);
  const [errors, setErrors] = useState({});
  const [paymentMode, setPaymentMode] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const fetchCartSuggestItemsData = async () => {
    setCartSuggestItemsLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      );
      setCartSuggestItems(response.data.similarProducts);
      setCartSuggestItemsLoading(false);
    } catch (error) {
      console.error("Error fetching saved products:", error);
    } finally {
      setCartSuggestItemsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartSuggestItemsData();
  }, [isAuthenticated, accessToken, user]);

  // useEffect(() => {
  // }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      setUserProfile({
        name: user.name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
      });
    }
  }, [isAuthenticated, accessToken, user]);



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

  const handleClearCart = () => {
    dispatch(emptyCart())
  }

  //TODO:Refactor, not scalable
  const handleSetTab = (tabName) => {
    if (tabName === 'cart' && (validatedTab == 'cart' || validatedTab == 'checkout')) {
      setCurrentTab(tabName)
      setCheckoutBtnVal("Proceed to Checkout")
    } else if (tabName === 'checkout' && (validatedTab == 'cart' || validatedTab == 'checkout')) {
      setCurrentTab(tabName)
      setCheckoutBtnVal("Proceed to Payment")
    } else if (tabName === 'payment' && validatedTab == 'checkout') {
      setCurrentTab(tabName)
      setCheckoutBtnVal("Make Payment")
    }
  };

  const handleProceed = () => {
    //TODO: && cartItems ! empty
    //TODO: checkout and payment tab redirect if not logged in
    if (currentTab == "cart") {
      setCurrentTab("checkout");
      setValidatedTab("cart")
      setCheckoutBtnVal("Proceed to Payment");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentTab == "checkout") {
      if (validateForm()) {
        setCurrentTab("payment");
        setValidatedTab("checkout")
        setCheckoutBtnVal("Make Payment");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.log("Form has errors", errors);
      }
    }
  };

  const paymentModeChange = (e) => {
    const { name, value } = e.target;
    setPaymentMode(value);
    if (value === '') {
      setPaymentModeError("Select payment method")
    } else {
      setPaymentModeError(null)
    }
  }

  const userProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevState) => ({
      ...prevState,
      [name]: value
    }));

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          errorMessage = "Name is required";
        }
        break;
      case "email":
        if (!value.trim()) {
          errorMessage = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Email is invalid";
        }
        break;
      case "phone_number":
        if (!value.trim()) {
          errorMessage = "Phone number is required";
        }
        break;
      case "address":
        if (!value.trim()) {
          errorMessage = "Address is required";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validation rules
    if (!userProfile.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!userProfile.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userProfile.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    if (!userProfile.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
      valid = false;
    }
    if (!userProfile.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleToken = async (token) => {
    // If payment is not selected
    if (paymentMode === '') {
      setPaymentModeError("Select payment method")
    }
    //If checkout contains error, show checkout tab
    if (Object.values(errors).some(error => error !== '')) {
      setCurrentTab("checkout");
      setValidatedTab("cart")
      setCheckoutBtnVal("Proceed to Payment");
    }

    if (hasItems && paymentMode) {
      try {
        setLoading(true);
        setErrorMessage('');

        const orderItems = hasItems
          ? cartItems.map((item) => ({ "product_id": item.product.id, quantity: item.product.quantity }))
          : [];

        const response = await axios.post(
          `${baseURL}/api/v1/payment`,
          { order_items: orderItems, payment_method: paymentMode, total_price: totalPrice },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // Redirect to Stripe Checkout
        window.location.href = response.data.url;
      } catch (error) {
        console.error("Error initiating payment:", error.message);
        setErrorMessage('Error Processing your payment, please try again');
        setLoading(false);
      }
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



        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-4 lg:px-8 xl:px-10">

          <h1 className="text-2xl font-bold uppercase">
            {currentTab}
          </h1>
          <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div className="relative">
              <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                <li
                  onClick={() => handleSetTab('cart')}
                  className={`flex items-center space-x-3 text-left sm:space-x-4 ${(validatedTab === 'cart' || validatedTab === 'checkout') && "cursor-pointer"}
                  `}
                >
                  {currentTab == 'cart'
                    ?
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                    >
                      1
                    </span>
                    :
                    <span
                      className="bg-emerald-200 text-emerald-700 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  }
                  <span
                    className={`font-semibold 
		         ${currentTab === 'cart' || currentTab === 'checkout' || currentTab == 'payment' ? 'text-gray-900' : 'text-gray-500'}
	  	      `}
                  >
                    Cart
                  </span>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <li
                  onClick={() => handleSetTab("checkout")}
                  className={`flex items-center space-x-3 text-left sm:space-x-4 
			    ${(validatedTab === 'cart' || validatedTab === 'checkout') && "cursor-pointer"}
			`}
                >
                  {currentTab == 'checkout'
                    ?
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                    >
                      2
                    </span>
                    :
                    (
                      validatedTab == 'checkout'
                        ?
                        <span
                          className="bg-emerald-200 text-emerald-700 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        :
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                        >
                          2
                        </span>
                    )
                  }
                  <span
                    className={`font-semibold 
		         ${currentTab === 'checkout' || currentTab == 'payment' ? 'text-gray-900' : 'text-gray-500'}
	  	      `}
                  >
                    Checkout
                  </span>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <li
                  onClick={() => handleSetTab("payment")}
                  className={`flex items-center space-x-3 text-left sm:space-x-4 
			    ${validatedTab === 'checkout' && "cursor-pointer"}
			`}
                >

                  {currentTab == 'payment'
                    ?
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                    >
                      3
                    </span>
                    :
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                    >
                      3
                    </span>
                  }
                  <span
                    className={`font-semibold 
		         ${currentTab == 'payment' ? 'text-gray-900' : 'text-gray-500'}
	  	      `}
                  >
                    Payment
                  </span>
                </li>

              </ul>
            </div>
          </div>
        </div>



        <div className="min-h-[70vh] my-10">
          {errorMessage && <p className="text-red-500 mb-8">{errorMessage}</p>}

          <div className="mx-auto justify-center lg:flex lg:space-x-6">
            <div className="relative rounded-lg bg-white p-6 lg:w-2/3">

              {currentTab === 'cart' &&
                <div className="flow-root">
                  <div className="absolute top-[-28px] left-0 right-0 flex justify-between">
                    <h3>My Cart({cartItems.length} item{cartItems.length > 1 && 's'})</h3>
                    {cartItems.length > 0 &&
                      <p
                        onClick={handleClearCart}
                        className="cursor-pointer text-red-500 flex items-center"
                      >
                        <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                        Clear Cart
                      </p>}
                  </div>

                  {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
                    <ul>
                      {cartItems.map((item) => {
                        return (
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
                        )
                      })}
                    </ul>
                  )}
                </div>
              }
              {currentTab === 'checkout' &&
                <form className="flex flex-col space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={userProfile.name}
                      onChange={userProfileChange}
                      name="name"
                      className={`mt-1 block w-full rounded ring-1 ring-gray-300 border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.name
                        ? "bg-red-50"
                        : "bg-gray-50"
                        }`}
                    />
                    {errors.name &&
                      <p
                        style={{ color: "red", fontSize: "13px" }}
                        className="mt-1"
                      >
                        {errors.name}
                      </p>
                    }
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={userProfile.email}
                      onChange={userProfileChange}
                      className={`mt-1 block w-full rounded ring-1 ring-gray-300 border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.email
                        ? "bg-red-50"
                        : "bg-gray-50"
                        }`}
                    />

                    {errors.email &&
                      <p
                        style={{ color: "red", fontSize: "13px" }}
                        className="mt-1"
                      >
                        {errors.email}
                      </p>
                    }
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="phoneNumber"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phone_number"
                      value={userProfile.phone_number}
                      onChange={userProfileChange}
                      className={`mt-1 block w-full rounded ring-1 ring-gray-300 border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.phone_number
                        ? "bg-red-50"
                        : "bg-gray-50"
                        }`}
                    />

                    {errors.phone_number &&
                      <p
                        style={{ color: "red", fontSize: "13px" }}
                        className="mt-1"
                      >
                        {errors.phone_number}
                      </p>
                    }
                  </div>

                  <div className="relative">
                    <h3 className="my-4">Shipping Details</h3>
                    <label
                      htmlFor="address"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={userProfile.address}
                      onChange={userProfileChange}
                      className={`mt-1 block w-full rounded ring-1 ring-gray-300 border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.address
                        ? "bg-red-50"
                        : "bg-gray-50"
                        }`}
                    />

                    {errors.address &&
                      <p
                        style={{ color: "red", fontSize: "13px" }}
                        className="mt-1"
                      >
                        {errors.address}
                      </p>
                    }
                  </div>

                </form>
              }
              {currentTab === 'payment' &&
                <form className="mt-5 grid gap-6">
                  {paymentModeError &&
                    <p className="text-red-500">{paymentModeError}</p>}
                  <div className="relative">
                    <input
                      className="peer hidden"
                      id="radio_1"
                      type="radio"
                      name="paymentMode"
                      value="pay_on_delivery"
                      checked={paymentMode === "pay_on_delivery"}
                      onChange={paymentModeChange}
                    />
                    <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                    <label
                      className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                      htmlFor="radio_1"
                    >
                      <img
                        className="w-14 object-contain"
                        src="/images/naorrAeygcJzX0SyNI4Y0.png"
                        alt=""
                      />
                      <div className="ml-5">
                        <span className="mt-2 font-semibold">Payment on Delivery</span>
                        <p className="text-slate-500 text-sm leading-6">
                          Delivery: 2-4 Days
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      className="peer hidden"
                      id="radio_2"
                      type="radio"
                      name="paymentMode"
                      value="stripe"
                      checked={paymentMode === "stripe"}
                      onChange={paymentModeChange}
                    />
                    <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                    <label
                      className="flex items-center cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                      htmlFor="radio_2"
                    >
                      <CreditCardIcon className="w-6 h-6 mr-4 ml-4 flex" />
                      <div className="ml-5">
                        <span className="mt-2 font-semibold">Stripe payment</span>
                        <p className="text-slate-500 text-sm leading-6">
                          Delivery: 2-4 Days
                        </p>
                      </div>
                    </label>
                  </div>
                  <p className="mt-10 text-center text-sm font-semibold text-gray-500">
                    By placing this order you agree to the{" "}
                    <a
                      href="#"
                      className="whitespace-nowrap text-blue-400 underline hover:text-blue-600"
                    >
                      Terms and Conditions
                    </a>
                  </p>
                </form>

              }
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
              {/*TODO: if cart empty checkout btn should be disabled*/}
              {isAuthenticated ?
                <button
                  onClick={currentTab === 'payment' ? handleToken : handleProceed}
                  disabled={loading || !hasItems}
                  className={`mt-6 w-full rounded-md bg-red-500 py-3 px-6 font-medium text-white hover:bg-red-600 ${!hasItems && "cursor-not-allowed"
                    }`}
                >
                  {loading ? "Loading ..." : checkoutBtnVal}
                </button>
                :
                <button
                  className="mt-6 w-full rounded-md bg-red-500 py-3 px-6 font-medium text-white hover:bg-red-500"
                >
                  Please Login to checkout
                </button>
              }
            </div>
          </div>
        </div>
        {cartSuggestItemsLoading && <p>Loading...</p>}
        {currentTab === 'cart' && setCartSuggestItems.length > 0 &&
          <SimilarProduct products={cartSuggestItems} />
        }

      </div>

      <Footer />

    </div>
  );
};

export default Cart;
