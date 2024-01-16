import { Fragment, useState, useEffect } from 'react'
import axios from 'axios';

import { Dialog, RadioGroup, Transition, Disclosure, Menu } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "actions/auth";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  fetchCartItems,
} from 'actions/actions';

import {
    SET_MESSAGE,
  } from "actions/types";

import Top from "./Top";
import NavLinks from "./NavLinks";
import CartLink from "./CartLink";

import logo from "assets/img/front/logo.PNG";
import person from "assets/img/front/person.PNG";
import cart from "assets/img/front/cart.PNG";
import Search from './Search';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const products = [
    {
      id: 1,
      name: 'Throwback Hip Bag',
      href: '#',
      color: 'Salmon',
      price: '$90.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
      id: 2,
      name: 'Medium Stuff Satchel',
      href: '#',
      color: 'Blue',
      price: '$32.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]


const Header = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user?.user);
    const cartItems = useSelector(state => state.cart.items);

    const storedCountry = localStorage.getItem('userCountry') || 'Unknown';	
    
const totalPrice = cartItems.reduce((total, product) => {
  const productPrice = parseFloat(product.price);
  return total + productPrice;
}, 0);

const formattedTotalPrice = totalPrice.toFixed(2);


    const [open, setOpen] = useState(false)
    const [loginRegisterOpen, setLoginRegisterOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const [resetToken, setResetToken] = useState('')
    const [resetLink, setResetLink] = useState("");
    const [resetTokenError, setResetTokenError] = useState('')
	
    const [redirect, setRedirect] = useState('')
    const [driverRegister, setDriverRegister] = useState(false)

    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [resetPasswordError, setResetPasswordError] = useState("");
    const [registerError, setRegisterError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");


  
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const [registerFormData, setRegisterFormData] = useState({
      name: '',
      business_name: '',
      email: '',
      phone_number: '',
      address: '',
      password: '',
      password_confirmation: '',
    });
    
    const [resetFormData, setResetFormData] = useState({
      email: '',
      new_password: '',
      new_password_confirmation: '',
    });

    const [forgotFormData, setForgotFormData] = useState({
      forgot_email: '',
    });

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
	setActiveTab(tabNumber);
        dispatch({
          type: 'CLEAR_MESSAGE',
        });
    };


    const handleSignInClick= (e) => {
	    setLoginOpen(true)
	    setActiveTab(1)
    }

    const handleRegisterClick= (e) => {
	    setLoginOpen(true)
	    setActiveTab(2)
    }

    const handleGetUserCountry = () => {
	if (storedCountry == 'UK')
	    return <>United Kingdom</>
	else if (storedCountry == 'US')
	    return <>United States</>
	else if (storedCountry == 'NG')
	    return <>Nigeria</>
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };    

    const handleRegisterInputChange = (e) => {
      const { name, value } = e.target;
      setRegisterFormData({
        ...registerFormData,
        [name]: value,
      });
    };    

    const handleResetInputChange = (e) => {
      const { name, value } = e.target;
      setResetFormData({
        ...resetFormData,
        [name]: value,
      });
    };    

    const handleForgotInputChange = (e) => {
      const { name, value } = e.target;
      setForgotFormData({
        ...forgotFormData,
        [name]: value,
      });
    };    

	const handleUploadClick = (e) => {
		e.preventDefault();
		setRedirect('?redirect=modal');
		setActiveTab(1);
		setLoginOpen(true);

		dispatch({
		  type: SET_MESSAGE,
		  payload: {type: "success", message: "Please sign in to upload a product"},
		});
	}

	const handleRegisterDriverClick = (e) => {
		e.preventDefault();
		setDriverRegister(true);
		setActiveTab(2);
		setLoginOpen(true);
	}


	const handleShowLoginForm = (e) => {
		e.preventDefault();
		//TODO: put reset loading, formdata and error in helper function
	        setLoading(false);
	        setResetPasswordError("");
	        setRegisterError("");

	    setFormData({
	      email: '',
	      password: '',
	    });

	    setRegisterFormData({
	      name: '',
	      email: '',
	      password: '',
	      password_confirmation: '',
	    });
	    
	    setResetFormData({
	      email: '',
	      new_password: '',
	      new_password_confirmation: '',
	    });

        dispatch({
          type: 'CLEAR_MESSAGE',
        });

		setActiveTab(1)
	}

	const handleShowRegisterForm = (e) => {
		e.preventDefault();
		//TODO: put reset loading, formdata and error in helper function
	        setLoading(false);
	        setLoginError(false);
	        setResetPasswordError("");
	        setRegisterError("");

	    setFormData({
	      email: '',
	      password: '',
	    });

	    setRegisterFormData({
	      name: '',
	      email: '',
	      password: '',
	      password_confirmation: '',
	    });
	    
	    setResetFormData({
	      email: '',
	      new_password: '',
	      new_password_confirmation: '',
	    });

        dispatch({
          type: 'CLEAR_MESSAGE',
        });

		setActiveTab(2)
	}

	const handleShowResetForm = (e) => {
		e.preventDefault();
		//TODO: put reset loading, formdata and error in helper function
	        setLoading(false);
	        setLoginError(false);
	        setRegisterError("");

	    setRegisterFormData({
	      name: '',
	      email: '',
	      password: '',
	      password_confirmation: '',
	    });
	    
	    setResetFormData({
	      email: '',
	      new_password: '',
	      new_password_confirmation: '',
	    });

        dispatch({
          type: 'CLEAR_MESSAGE',
        });
		setActiveTab(3)
	}

    const getCartDisplayImage = (product) => {
      return product.display_image ? `http://127.0.0.1:8000/uploads/${product.display_image.name}` : '';
    };

    const getDisplayFromImagesArray = (product) => {
      const displayImage = product.images.find(image => image.id === product.display_image_id);
      return displayImage ? `http://127.0.0.1:8000/uploads/${displayImage.name}` : '';
    };


	const handleRegister = (e) => {
		e.preventDefault();
console.log(registerFormData);
		setLoading(true);

		if (registerFormData.password != registerFormData.password_confirmation)
			setRegisterError("Passwords do not match");

		dispatch(register(registerFormData.name, registerFormData.business_name, registerFormData.email, registerFormData.phone_number, registerFormData.address, registerFormData.password, registerFormData.password_confirmation))
		.then(() => {
			console.log("Register success");
			setLoading(false);
			setRegisterError(false);
   setRegisterFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });


	setActiveTab(1);

		})
		.catch((error) => {
			console.log('error', error);
			setRegisterError("email already taken");
			setLoading(false);
		});
	};

const handleForgotLinkClick = (resetLink) => {
	setResetToken(resetLink)
	setSuccessMessage('')
}

    const handleResetPassword = async (e) => {
        e.preventDefault();
    
        setLoading(true);
        setResetPasswordError('');

	    console.log(resetFormData);


	    if(!resetToken)
	    {


		    try {
		      const forgotData = {email: forgotFormData.forgot_email}
		      const response = await axios.post('http://127.0.0.1:8000/api/v1/forgot-password', forgotData);
		      setResetLink(response.data.token);
		      setSuccessMessage(response.data.message);
		      setResetPasswordError('');
		      setLoading(false);
		    } catch (error) {

      if (error.response) {
        if (error.response.data.error) {
          setResetPasswordError(error.response.data.error);
        } else if (error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          setResetPasswordError(errorMessages);
        } else {
          setResetPasswordError('An unexpected error occurred.');
        }			    
      }
			    setLoading(false);
		      }
		    

	    }
	    else {

		    

      try {
                      const resetData = {email: forgotFormData.forgot_email, token: resetToken, password: resetFormData.new_password , password_confirmation: resetFormData.new_password_confirmation}

                      const response = await axios.post('http://127.0.0.1:8000/api/v1/reset-password', resetData);
                      setSuccessMessage('');
                      setResetPasswordError('');
                      setLoading(false);
	      	      setResetToken('');
		      setResetLink('');	

	handleTabClick(1);
        dispatch({
          type: 'SET_MESSAGE',
          payload: "Password reset successfull you can now login with your new password",
        });


                    } catch (error) {

      if (error.response) {
        if (error.response.data.error) {
          setResetPasswordError(error.response.data.error);
        } else if (error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          setResetPasswordError(errorMessages);
        } else {
          setResetPasswordError('An unexpected error occurred.');
        }
      }
                            setLoading(false);
                      }
		    



		   /*
		    if (resetFormData.email == '')
			    setResetPasswordError("Email cannot be empty");

		   if (resetFormData.new_password != resetFormData.new_password_confirmation)
		    {
				setResetPasswordError("Passwords do not match");
		    }
		    */

	    }



  }

const handleFacebookLogin = async (e) => {
window.location.href = 'http://127.0.0.1:8000/api/v1/auth/facebook';	
}

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
    //if (loginError == '')
	      dispatch(login(formData.email, formData.password))
        .then(() => {
	        console.log("LoggedIn");
		
		if (redirect)
		{
			navigate('/admin/upload-product?redirect=modal')
		}
		else
		{
          		navigate('/admin/default');
		}

          //window.location.reload();
        })
        .catch((error) => {
		console.log(error);
setLoginError(true);
          setLoading(false);
        });
    };


  const handleGoogleLogin = async (e) => {
	  e.preventDefault();
	window.location.href = 'http://127.0.0.1:8000/api/v1/auth/google';	
  };


    // if (isLoggedIn) {
    //   navigate('/admin/products');
    // }

    useEffect(() => {
      dispatch(fetchCartItems());
    }, [dispatch]);     

    return (
        <>


        <div className="bg-white">
            <div className="mx-auto max-w-2xl sm:px-6 lg:px-8 lg:max-w-7xl lg:px-8">
                <div className="pt-4 flex justify-between" style={{fontSize: "15px"}}>
                    <ul className="flex justify-between">
                        <li className="mr-6 hidden lg:block">Welcome to our Online Store!</li>
	    {isAuthenticated ? 
                        <li className="text-red-500 mr-6" style={{"color": "#ff5959"}}>
		            <a href="/admin/upload-product?redirect=modal">Upload Your Product</a>
		        </li>
		    :
                        <li onClick={(e) => handleUploadClick(e)} className="text-red-500 cursor-pointer mr-6" style={{"color": "#ff5959"}}>Upload Your Product</li>
	    }
                        <li onClick={(e) => handleRegisterDriverClick(e)} className="text-red-500 cursor-pointer" style={{"color": "#ff5959"}}>Register as a Driver</li>
                    </ul>
                    <ul className="flex justify-between">
                        <li className="text-red-500 mr-6 sm:mr-2" style={{"color": "#ff5959", "marginRight": "50px"}}>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" style={{"color": "#ff5959"}}>
                    For Sale
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>



</li>
                        <li className="hidden md:block">{handleGetUserCountry()}</li>
                    </ul>
                </div>
            </div>
        </div>









            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-4 sm:py-6 lg:max-w-7xl lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center" style={{ "gap": "1%" }} >
                        
                      <a href="/">
	    		<img style={{ "width": "218px" }} src={logo} alt="vensle" />
                       </a>
	    		<Search />

                        <div className="flex items-center" style={{ "font-size": "0.9rem" }}>
                            <div className="flex items-center">
                                <img src={person} style={{"marginRight":"4px"}} />
                                <div className="flex justify-space-between flex-col h-full">
	    		    {isAuthenticated &&
                                    <p style={{"fontSize":"12px", "marginTop": "0px", "marginBottom":"3px"}}>Hello {user.name}</p>
			    }
	    			  <h2 style={{"cursor":"pointer", "fontWeight":"600","marginTop":"-3px"}}>
			    {isAuthenticated ?
				    <a href="/admin/default">Dashboard</a>
			     :
				    <>
                                      <span onClick={handleSignInClick}>Sign In </span>/
                                      <span onClick={handleRegisterClick}>Register</span>
				    </>
			    }
                                  </h2>
			     
                                </div>
                            </div>

<CartLink />




                        </div>
                    </div>
                </div>
            </div>
            
            <NavLinks />


            <Transition.Root show={loginOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setLoginOpen}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-lg md:px-4 lg:max-w-xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-lg">
                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                        onClick={() => setLoginOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <div className="w-full">







    <div className="max-w-md mx-auto mt-8 pb-6 bg-white">
	    
        {activeTab === 3 && (

	 <form onSubmit={handleResetPassword}>   
      	    <div className="flex mb-4 justify-center">
	    	<h3 className="text-center inline border-b-2 border-orange-500 pb-1 py-2 px-4">FORGOT PASSWORD</h3>
	    </div>
      	    <div className="mt-4">
	    	<h6 onClick={handleShowLoginForm} className="mb-4 text-sm font-medium">Back</h6>

{successMessage && resetLink &&
	<p className="mb-2">
		{successMessage} to reset your password{' '} 
		<span
			className="cursor-pointer"
			onClick={() => handleForgotLinkClick(resetLink)}
			style={{"color":"green"}}
		>
			click here
		</span>
	</p>
}

{resetPasswordError && <p className="mb-4" style={{"color":"red"}}>{resetPasswordError}</p>}

{!resetToken
		?
<>
		{!successMessage && !resetLink &&
		    <div>
		      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
			Email address
		      </label>
		      <div className="mt-2">
			<input
			  id="forgot_email"
			  name="forgot_email"
			  type="email"
			  value={forgotFormData.forgot_email} 
			  onChange={handleForgotInputChange}
			  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
		      </div>
		    </div>
		}


</>
		:
<>
		{/*<div>
		      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
			Email address
		      </label>
		      <div className="mt-2">
			<input
			  id="email"
			  name="email"
			  type="email"
			  autoComplete="email"
			  required
			  value={resetFormData.email} 
			  onChange={handleResetInputChange}
			  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
		      </div>
		    </div>
		    */}



		    <div>
		      <label htmlFor="new_password" className="block text-sm font-medium leading-6 text-gray-900">
			New Password
		      </label>
		      <div className="mt-2">
			<input
			  id="new_password"
			  name="new_password"
			  type="password"
			  value={resetFormData.new_password} 
			  onChange={handleResetInputChange}
			  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
		      </div>
		    </div>

		    <div>
		      <label htmlFor="new_password_confirmation" className="block text-sm font-medium leading-6 text-gray-900">
			New Password Again
		      </label>
		      <div className="mt-2">
			<input
			  id="new_password_confirmation"
			  name="new_password_confirmation"
			  type="password"
			  value={resetFormData.new_password_confirmation} 
			  onChange={handleResetInputChange}
			  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
		      </div>
		    </div>


</>}


		{successMessage && resetLink ?
			""
			:
		    <div class="flex items-center mt-6 -mx-2">
		      <button
			type="submit"
			disabled={loading ? true : false}
			className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
	   {loading ? <span>Loading...</span> : <span>Reset Password</span>}
			</button>
		    </div>
		}



	    </div>
	 </form>

  )}
  {activeTab !== 3 && (
    <div>
      <div className="flex mb-6">
        <div
          className={`cursor-pointer text-center py-2 w-full px-4 ${
            activeTab === 1 ? 'border-b-2 border-orange-500 transition duration-300' : 'bg-white text-gray-500'
          }`}
          onClick={handleShowLoginForm}
        >
	    SIGN IN
        </div>
        <div
          className={`cursor-pointer text-center py-2 w-full px-4 ${
            activeTab === 2 ? 'border-b-2 border-orange-500 transition duration-300' : 'bg-white text-gray-500'
          }`}
          onClick={handleShowRegisterForm}
        >
          REGISTER
        </div>
      </div>

      <div className="mt-4">
        {activeTab === 1 && (
          <div className={`transition duration-300 ${activeTab === 1 ? 'opacity-100' : 'opacity-0'}`}>

                                        <section className="bg-white dark:bg-gray-900">
                                            <div className="container flex items-center justify-center px-6 mx-auto">
                                                <form onSubmit={handleLogin} className="w-full max-w-md">          



{message?.message?.dispatchError && <p style={{"color":"red", marginTop: "16px"}}>{message.message.dispatchError}</p>}


            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
		  value={formData.email} 
		  onChange={handleInputChange}
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
		message && message?.message?.email ? "border border-red-400":"border-0"
    	    }`}

                />
              </div>
	{message && message?.message?.email && 
		message.message.email.map((error, index)=>(<p style={{color:"red", fontSize: "13px"}}>{error}</p>))
	}

            </div>


            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a onClick={handleShowResetForm} href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
		  value={formData.password} 
		  onChange={handleInputChange}
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
		message && message?.message?.password ? "border border-red-400":"border-0"
    	    }`}
                />
              </div>
	{message && message?.message?.password && 
		message.message.password.map((error, index)=>(<p style={{color:"red", fontSize: "13px"}}>{error}</p>))
	}
	
            </div>

		    <div class="flex items-center mt-6 -mx-2">
		      <button 
			type="submit"
			disabled={loading ? true : false}
			className={`flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none ${
loading ? "bg-blue-400" : ""
			}`}
		      >
	   {loading ? <span>Loading...</span> : <span>Login</span>}
			</button>
		    </div>


                                                    <div class="flex items-center justify-between mt-4">
                                                        <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                                                        <a href="#" class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                                                            or login with Social Media
                                                        </a>

                                                        <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                                                    </div>

                                                    <div class="flex items-center mt-6 -mx-2">

<button
    onClick={handleFacebookLogin}
    type="button" class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">

    <span class="hidden mx-2 sm:inline">Sign in with Facebook</span>
</button>

	{/*
                                                        <button 
							 onClick={handleGoogleLogin}
							  type="button" class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                                                            <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                                                            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                                                                </path>
                                                            </svg>

                                                            <span class="hidden mx-2 sm:inline">Sign in with Google</span>
                                                        </button>
         */}
    
                                                        <a onClick={handleGoogleLogin} href="#" class="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-200">
                                                            <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                                                            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </div>

                                                </form>
                                            </div>
                                        </section>

          </div>
        )}
        {activeTab === 2 && (
          <div className={`transition duration-300 ${activeTab === 2 ? 'opacity-100' : 'opacity-0'}`}>

		{driverRegister && <div className="text-center">
<p>You are about to Register as a Driver</p>
			<p>
				Click to
				<span onClick={() => setDriverRegister(false)} className="mx-1 text-blue-500 cursor-pointer">
					Register as normal user
				</span>
			</p>
		</div>
		}
                                        <section class="bg-white dark:bg-gray-900">
                                            <div class="container flex items-center justify-center px-6 mx-auto">
                                                <form onSubmit={handleRegister} class="w-full max-w-md">          


{message?.message?.dispatchError && <p style={{"color":"red", marginTop: "16px"}}>{message.message.dispatchError}</p>}

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
		Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
		  value={registerFormData.name}
		  onChange={handleRegisterInputChange}
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
		message && message?.message?.name ? "border border-red-400":"border-0"
    	    }`}

                />
              </div>

	{message && message?.message?.name && 
		message.message.name.map((error, index)=>(<p style={{color:"red", fontSize: "13px"}}>{error}</p>))
	}

            </div>



            <div className="mt-4">
              <label htmlFor="business_name" className="block text-sm font-medium leading-6 text-gray-900">
		Business Name
              </label>
              <div className="mt-2">
                <input
                  id="business_name"
                  name="business_name"
                  type="text"
                  autoComplete="business_name"
		  value={registerFormData.business_name}
		  onChange={handleRegisterInputChange}
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
		message && message?.message?.business_name ? "border border-red-400":"border-0"
    	    }`}

                />
              </div>

	{message && message?.message?.business_name && 
		message.message.business_name.map((error, index)=>(<p style={{color:"red", fontSize: "13px"}}>{error}</p>))
	}

            </div>
	

            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
		  value={registerFormData.email}
		  onChange={handleRegisterInputChange}
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
		message && message?.message?.email ? "border border-red-400":"border-0"
    	    }`}
                />

              </div>

	{message && message?.message?.email && 
		message.message.email.map((error, index)=>(<p style={{color:"red", fontSize: "13px"}}>{error}</p>))
	}

            </div>


            <div className="mt-4">
              <label htmlFor="phone_number" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  autoComplete="phone_number"
		  value={registerFormData.phone_number}
		  onChange={handleRegisterInputChange}
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
		message && message?.message?.phone_number ? "border border-red-400":"border-0"
    	    }`}
                />

              </div>

	{message && message?.message?.phone_number && 
		message.message.phone_number.map((error, index)=>(<p style={{color:"red", fontSize: "13px"}}>{error}</p>))
	}

            </div>


            <div className="mt-4">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
		  value={registerFormData.address}
		  onChange={handleRegisterInputChange}
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
		message && message?.message?.address? "border border-red-400":"border-0"
    	    }`}
                />

              </div>

	{message && message?.message?.address && 
		message.message.address.map((error, index)=>(<p style={{color:"red", fontSize: "13px"}}>{error}</p>))
	}

            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
		Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
		  value={registerFormData.password} 
		  onChange={handleRegisterInputChange}

                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
		message && message?.message?.password ? "border border-red-400":"border-0"
    	    }`}

                />
              </div>

	{message && message?.message?.password && 
		message.message.password.map((error, index)=>(<p style={{color:"red", fontSize: "13px"}}>{error}</p>))
	}
            </div>


            <div className="mt-4">
              <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-gray-900">
		Password Again
              </label>
              <div className="mt-2">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
		  value={registerFormData.password_confirmation} 
		  onChange={handleRegisterInputChange}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                />
              </div>

            </div>

                                                    <div class="flex items-center mt-6 -mx-2">
                                                      <button type="submit" class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
	   {loading ? <span>Loading...</span> : <span>Register</span>}
                                                        </button>
                                                    </div>                                                    

                                                    <div class="flex items-center justify-between mt-4">
                                                        <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                                                        <a href="#" class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                                                            or login with Social Media
                                                        </a>

                                                        <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                                                    </div>

                                                    <div class="flex items-center mt-6 -mx-2">
                                                        <button type="button" class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                                                            <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                                                                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                                                                </path>
                                                            </svg>

                                                            <span class="hidden mx-2 sm:inline">Sign in with Google</span>
                                                        </button>

                                                        <a href="#" class="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-200">
                                                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </div>

                                                </form>
                                            </div>
                                        </section>


          </div>
        )}
      </div>

  </div>

 )}

    </div>




















                                    </div>
                                </div>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>






        </>
    )
}

export default Header;


