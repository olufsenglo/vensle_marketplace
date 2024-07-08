import { useState } from "react";
import { useDispatch } from "react-redux";
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

import two from "assets/img/front/temp/2.jpg"

const SingleProduct = ({ numberOfProducts, type, image = two }) => {
	const dispatch = useDispatch();
	const [isHovered, setIsHovered] = useState(false);

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

	const handleSaveItem = () => {
		dispatch({
			type: SET_MESSAGE,
			payload: { type: "success", message: "Item Saved successfully" },
		});
	}

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="w-full h-full border lg:border-none border-gray-200 bg-gray-100/50 lg:bg-white text-left cursor-pointer hover:bg-gray-100/50 rounded-md"
		>
			<div className="relative">
				<div className="absolute z-[1] left-0 top-3 left-3 flex items-center bg-white border rounded-md border-0 lg:border-primaryColor py-[0.2rem] px-2">
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
				<div className={`absolute z-[1] transition-all duration-300 cursor-pointer bg-gray-100 hover:bg-gray-300 right-3 flex justify-center items-center rounded-full ${numberOfProducts === 7 ? "top-3" : "top-2"}`}>
					<HeartIcon onClick={handleSaveItem} className={`p-1 h-6 w-6 tagHeartClassName`} />
				</div>
				<div className="relative overflow-hidden h-[170px] md:h-auto">
					<div className={`absolute transition-all duration-300 cursor-zoom-in bg-gray-100 hover:bg-gray-300 right-3 flex justify-center items-center rounded-full ${
						!isHovered ? "bottom-[-100%]" : "bottom-4"}`}>
						<MagnifyingGlassPlusIcon onClick={handleSaveItem} className={tagHeartClassName} />
					</div>
					<img
						src={image}
						className={`w-full h-full rounded object-cover ${imageClassName}`}
						alt="product"
					/>
				</div>
			</div>
			<div className="px-3 pb-2 pt-2 md:p-3">
				<div>
					<h3 className={`text-sm ${titleClassName}`}>Strawberries</h3>
					{type !== 'grocery' &&
						<div className="flex items-center mt-3 mb-2 text-gray-400">
							<MapPinIcon className="h-3 w-3 mr-1" />
							<p className={`text-[13px] line-clamp-1 ${locationClassName}`}>Eastern Gate, London</p>
						</div>
					}
					<h2 className={`text-primaryColor text-sm font-bold ${priceClassName}`}>$124.50</h2>
				</div>
				{type === 'grocery' &&
					<button className={`bg-transparent mt-2 font-semibold text-xs hover:border-transparent uppercase w-full rounded border border-primaryColor py-[0.4rem] px-2 text-red-500 hover:bg-primaryColor hover:text-white ${buttonClassName}`}>
						Add to cart
					</button>
				}
			</div>
		</div>
	)
}

export default SingleProduct;
