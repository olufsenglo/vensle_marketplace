import {
	MapPinIcon,
	TruckIcon,
	QuestionMarkCircleIcon,
	CameraIcon,
} from "@heroicons/react/20/solid";
import {
	HeartIcon,
} from '@heroicons/react/24/outline'

import two from "assets/img/front/temp/2.jpg"

const SingleProduct = ({ numberOfProducts, type, image = two }) => {

	let tagTextClassName = "text-sm"
	let tagHeartClassName = "p-2 h-10 w-10"
	let tagTypeImgClassName = "h-6 w-6 mr-2"
	let titleClassName = "md:text-base"
	let priceClassName = "md:text-base pt-2"
	let locationClassName = "md:text-sm"
	let imageClassName = "md:!h-[19.5rem]"
	let buttonClassName = "md:py-[0.65rem] md:text-sm mt-6"
	if (numberOfProducts == 6) {
		tagTextClassName = "text-xs"
		tagTypeImgClassName = "h-4 w-4 mr-1"
		tagHeartClassName = "p-1 h-8 w-8"
		imageClassName = "md:!h-[10.5rem]"
		buttonClassName = "md:py-[0.5rem] md:text-sm mt-5"
		locationClassName = "md:text-xs"
	} else if (numberOfProducts == 7) {
		tagTextClassName = "text-xs"
		tagTypeImgClassName = "h-4 w-4 mr-1"
		tagHeartClassName = "p-1 h-6 w-6"
		imageClassName = "md:!h-[9rem]"
		titleClassName = "md:text-sm"
		locationClassName = "md:text-xs"
		priceClassName = "md:text-[0.95rem] pt-1"
		buttonClassName = "md:py-[0.3rem] md:text-xs mt-3"
	}

	return (
		<div className="text-left cursor-pointer hover:bg-gray-100/50 rounded-md">
			<div className="relative">
				<div className="absolute left-0 top-3 left-3 flex items-center bg-white border rounded-md border-primaryColor py-[0.2rem] px-2">
					{type === 'grocery'
						? <TruckIcon className={`text-primaryColor ${tagTypeImgClassName}`} />
						: (type == 'request'
							? <QuestionMarkCircleIcon className={`text-primaryColor ${tagTypeImgClassName}`} />
							: <CameraIcon className={`text-primaryColor ${tagTypeImgClassName}`} />
						)
					}
					<p className={`text-primaryColor ${tagTextClassName}`}>
						{type === 'grocery'
							? 'Delivery'
							: (type == 'request'
								? 'Request'
								: 'Pickup')}
					</p>
				</div>
				<div className={`absolute cursor-pointer bg-gray-100 hover:bg-gray-300 right-3 flex justify-center items-center rounded-full ${numberOfProducts === 7 ? "top-3" : "top-2"}`}>
					<HeartIcon className={tagHeartClassName} />
				</div>
				<img
					src={image}
					className={`w-full rounded object-cover ${imageClassName}`}
					alt="product"
				/>
			</div>
			<div className="p-3">
				<div>
					<h3 className={`text-sm ${titleClassName}`}>Strawberries</h3>
					{type !== 'grocery' &&
						<div className="flex items-center mt-1 mb-1 text-gray-400">
							<MapPinIcon className="h-3 w-3 mr-1" />
							<p className={locationClassName}>London</p>
						</div>
					}
					<h2 className={`text-primaryColor text-sm font-bold ${priceClassName}`}>$124.50</h2>
				</div>
				{type === 'grocery' &&
					<button className={`bg-transparent font-semibold text-xs hover:border-transparent uppercase w-full rounded border border-primaryColor py-[0.4rem] px-2 text-red-500 hover:bg-primaryColor hover:text-white ${buttonClassName}`}>
						Add to cart
					</button>
				}
			</div>
		</div>
	)
}

export default SingleProduct;
