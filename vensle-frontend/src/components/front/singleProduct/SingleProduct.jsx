import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import {
	MapPinIcon,
	TruckIcon,
	QuestionMarkCircleIcon,
	CameraIcon,
} from "@heroicons/react/20/solid";
import {
	HeartIcon,
	MagnifyingGlassPlusIcon,
} from '@heroicons/react/24/outline'

import { SET_MESSAGE } from "actions/types";
import { addToCart } from "actions/actions";

import ButtonLoading from "components/Loading/ButtonLoading";
import two from "assets/img/front/temp/2.jpg"

const imageBaseURL = process.env.REACT_APP_IMAGE_BASE_URL;
const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

const SingleProduct = ({
	numberOfProducts, type, section, image = two, product, handleProductQuickView
}) => {
        const accessToken = useSelector((state) => state?.auth?.user?.token);
        const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);
	const dispatch = useDispatch();

	const [isHovered, setIsHovered] = useState(false);
  	const [loading, setLoading] = useState(false);

	if (section === "popularGrocery") {
		product = product?.product
	}

  const displayImageId = product?.display_image?.id;
  if (product?.images?.length > 0 && displayImageId) {
    // Find the index of the display_image in the images array
    const displayImageIndex = product.images.findIndex(
      (img) => img.id === displayImageId
    );

    // Rearrange the images array if display_image is found
    const rearrangedImages =
      displayImageIndex !== -1
        ? [
          product.images[displayImageIndex],
          ...product.images.slice(0, displayImageIndex),
          ...product.images.slice(displayImageIndex + 1),
        ]
        : product.images;

    // Update the product object with rearranged or unchanged images
    product = {
      ...product,
      images: rearrangedImages,
    };
  }


  const handleAddToCart = (e, product) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 300);
    dispatch(addToCart({ ...product, quantity: 1 }));
  };


  const handleSaveItem = async (e) => {
    e.preventDefault();
    //TODO: should be after api call, improve for instant feedback
    if (isAuthenticated) {
	    dispatch({
	      type: SET_MESSAGE,
	      payload: { type: "success", message: "Item Saved successfully" },
	    });
	    try {
	      const response = await axios.post(
		`${apiBaseURL}/saved-products`,
		{product_id: product.id},
		{
		  headers: {
		    "Content-Type": "application/json",
		    Authorization: `Bearer ${accessToken}`,
		  },
		}
	      );

	    } catch (error) {
	      console.error("Error saving product", error);
	    };
    } else {
	    dispatch({
	      type: SET_MESSAGE,
	      payload: { type: "success", message: "Please login to saved this product" },
	    });
    }
  }

	//TODO: useEffect
	let tagTextClassName = "lg:text-sm"
	let tagHeartClassName = "lg:p-2 lg:h-10 lg:w-10"
	let tagTypeImgClassName = "lg:h-6 lg:w-6 mr-2"
	let titleClassName = "md:text-base"
	let priceClassName = "md:text-base pt-2"
	let locationClassName = "md:text-sm"
	let imageClassName = "md:!h-[19.5rem]"
	let buttonClassName = "md:py-[0.65rem] md:text-sm lg:mt-6"
	if (numberOfProducts == 6) {
		tagTextClassName = "lg:text-xs"
		tagTypeImgClassName = "lg:h-4 lg:w-4 mr-1"
		tagHeartClassName = "lg:p-1 lg:h-8 lg:w-8"
		imageClassName = "md:!h-[10.5rem]"
		buttonClassName = "md:py-[0.5rem] md:text-sm lg:mt-5"
		locationClassName = "md:text-xs"
	} else if (numberOfProducts == 7) {
		tagTextClassName = "lg:text-xs"
		tagTypeImgClassName = "lg:h-4 lg:w-4 mr-1"
		tagHeartClassName = "lg:p-1 lg:h-6 lg:w-6"
		imageClassName = "md:!h-[9rem]"
		titleClassName = "md:text-sm"
		locationClassName = "md:text-xs"
		priceClassName = "md:text-[0.95rem] pt-1"
		buttonClassName = "md:py-[0.3rem] md:text-xs lg:mt-3"
	}

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const getImagePath = () => {
		return `${imageBaseURL}/${product.display_image?.name}`;
	};

	const formatPrice = (price) => {
		return Number(parseFloat(price).toFixed(2)).toLocaleString('en', {
			minimumFractionDigits: 2
		});
	}

  const buttonControlStyle = {
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.18)'
  }
	return (
		<Link to={`/product-detail/${product?.id}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="w-full h-full border lg:border-none border-gray-200 bg-gray-100/50 lg:bg-white text-left cursor-pointer hover:bg-gray-100/50 rounded-md"
		>
<span onClick={(e) => handleProductQuickView(e, product)} className="absolute lg:hidden inset-0 z-[2]"></span>
			<div className="relative">

				<div className="absolute z-[3] left-0 top-3 left-3 flex items-center bg-white border rounded-md border-0 lg:border-primaryColor py-[0.2rem] px-2">
					{type === 'grocery'
						? <TruckIcon className={`text-primaryColor h-[0.9rem] w-[0.9rem] ${tagTypeImgClassName}`} />
						: (type == 'request'
							? <QuestionMarkCircleIcon className={`text-primaryColor h-[0.9rem] w-[0.9rem] ${tagTypeImgClassName}`} />
							: <CameraIcon className={`text-primaryColor h-[0.9rem] w-[0.9rem] ${tagTypeImgClassName}`} />
						)
					}
					<p className={`text-[10px] text-primaryColor ${tagTextClassName}`}>
						{type === 'grocery'
							? 'Delivery'
							: (type == 'request'
								? 'Request'
								: 'Pickup')}
					</p>
				</div>
				<div  style={buttonControlStyle} className={`absolute z-[3] bg-white hover:bg-[#ededed] transition-all duration-300 cursor-pointer right-3 flex justify-center items-center rounded-full ${numberOfProducts === 7 ? "top-3" : "top-2"}`}>
					<HeartIcon onClick={handleSaveItem} className={`p-1 h-6 w-6 ${tagHeartClassName}`} />
				</div>
				<div className="relative overflow-hidden h-[170px] md:h-auto">
					<div className={`absolute transition-all duration-300 cursor-zoom-in bg-gray-100 hover:bg-gray-300 right-3 flex justify-center items-center rounded-full ${
						!isHovered ? "bottom-[-100%]" : "bottom-4"}`}>
		<MagnifyingGlassPlusIcon
    		     onClick={(e) => handleProductQuickView(e, product)}
		     className={tagHeartClassName}
		/>
					</div>
					{product ?
					<img
						src={getImagePath()}
						className={`w-full h-full rounded !object-contain ${imageClassName}`}
						alt="product"
					/>
					:
					<img
						src={image}
						className={`w-full h-full rounded !object-contain ${imageClassName}`}
						alt="product"
					/>
					}
				</div>
			</div>
			<div className="px-3 pb-2 pt-2 md:p-3">
				<div>
					<h3 className={`text-sm ${titleClassName} line-clamp-1`}>{product?.name}</h3>
					{type !== 'grocery' &&
						<div className="flex items-center mt-3 mb-2 text-gray-400">
							<MapPinIcon className="h-3 w-3 mr-1" />
							<p className={`text-[13px] line-clamp-1 ${locationClassName}`}>{product?.city}, {product?.country}</p>
						</div>
					}
					<h2 className={`text-primaryColor text-sm font-bold ${priceClassName}`}>
						{product?.currency}{product && formatPrice(product.price)}
					</h2>
				</div>
				{type === 'grocery' &&
					<button
					    onClick={(e) => handleAddToCart(e, product)}
					    className={`flex justify-center items-center bg-transparent mt-2 font-semibold text-xs hover:border-transparent uppercase w-full rounded border border-primaryColor py-[0.4rem] px-2 text-red-500 hover:bg-primaryColor hover:text-white ${buttonClassName}`}
					>
						{loading && <ButtonLoading />}
						Add to cart
					</button>
				}
			</div>
		</Link>
	)
}

export default SingleProduct;
