import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
   ArrowLeftIcon,
   MapPinIcon,
   ClockIcon,
   StarIcon,
   ChevronLeftIcon,
   ChevronRightIcon
} from '@heroicons/react/20/solid'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const baseURL = 'https://nominet.vensle.com/backend';

const PreviewPopup = ({ selectedProduct, open, setOpen }) => {

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 1
	};

	const defaultImagePath = selectedProduct.display_image && selectedProduct.display_image.name ?
		`${baseURL}/uploads/${selectedProduct.display_image.name}` :
		"";
	const [previewImage, setPreviewImage] = useState(defaultImagePath);
	const [imgIndex, setImgIndex] = useState(0);


	const getImagePath = (name) => {
		return `${baseURL}/uploads/${name}`;
	};

	const handleNextPreviewImage = () => {
		const selectedIndexLen = selectedProduct.images.length - 1
		const index = (imgIndex + 1) > selectedIndexLen ? 0 : imgIndex + 1;
		setImgIndex(index);
		const path = getImagePath(selectedProduct.images[index].name)
		setPreviewImage(path)
	}

	const handlePreviousPreviewImage = () => {
		const selectedIndexLen = selectedProduct.images.length - 1
		const index = (imgIndex - 1) < 0 ? selectedIndexLen : imgIndex - 1;
		setImgIndex(index);
		const path = getImagePath(selectedProduct.images[index].name)
		setPreviewImage(path)
	}

	const handleSetPreviewImage = (e, image, index) => {
		e.preventDefault();
		setImgIndex(index);
		setPreviewImage(getImagePath(image));
	}

	const handleShowSelectedImage = (image, index) => {
		return (<a onClick={(e) => handleSetPreviewImage(e, image.name, index)} href="#"
			className={`block border-2 rounded-lg overflow-hidden dark:border-transparent dark:hover:border-blue-300 hover:border-red-300 ${index == imgIndex ? 'border-red-300' : 'border-transparent'
				}`}>
			<img
				src={getImagePath(image.name)}
				alt="Preview"
				class="object-cover w-full lg:h-20"
			/>
		</a>)
	}

	if (!selectedProduct)
		return <></>

	return (
		<div style={{ "top": "0", "left": "0", "zIndex": "5" }} className="absolute w-full h-full p-4 bg-white">



			<div className="bg-white">

				<p className="cursor-pointer ml-2 mb-4" onClick={() => setOpen(false)}>
		                	<ArrowLeftIcon className="h-4 w-4" />
				</p>


				<div className="mx-auto max-w-7xl">
					<div className="mx-auto lg:mx-0 lg:flex lg:max-w-none">


						<div className="w-full px-4">
							<div className="">
								<div className="relative mb-2 lg:h-[28rem]">

									<span className="absolute left-0 cursor-pointer" style={{ top: "50%" }} onClick={handlePreviousPreviewImage}>
										<ChevronLeftIcon className="h-8 w-8" />
									</span>
									<img
										style={{ padding: "0 3rem" }}
										src={previewImage}
										alt="/"
										className=" object-cover w-full lg:h-full "
									/>
									<span className="absolute right-0 cursor-pointer" style={{ top: "50%" }} onClick={handleNextPreviewImage}>
										<ChevronRightIcon className="h-8 w-8" />
									</span>
								</div>


							</div>
						</div>




						<div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-xs lg:flex-shrink-0">
							<div className="rounded-2xl bg-gray-50 px-4 py-5 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:pb-8 lg:pt-6">
								<div className="px-2">
									<h3 className="text-2xl mb-5 tracking-tight text-gray-900">
										{selectedProduct.name}
									</h3>
                                <div className="flex items-center">
                                  {selectedProduct?.total_feedback > 0 ? (
                                    <>
                                      <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                          <StarIcon
                                            key={rating}
                                            className="mr-1 h-3 w-3 flex-shrink-0 text-orange-900"
                                            aria-hidden="true"
                                          />
                                        ))}
                                      </div>

                                      <p className="text-sm leading-5">
                                        <span className="mx-1">
                                          {selectedProduct?.ratings}
                                        </span>{" "}
                                        (
                                        {selectedProduct &&
                                          selectedProduct.total_feedback}{" "}
                                        Feedback
                                        {selectedProduct &&
                                          selectedProduct.total_feedback > 1 &&
                                          "s"}
                                        )
                                      </p>
                                    </>)
                                    :
                                    (<p className="text-sm leading-5">No Feedback</p>)}
                                </div>
									<h4 className="text-xl text-red-600 mt-3 mb-5">
										{selectedProduct?.currency} {selectedProduct?.price}
									</h4>
                                					<h4 className="text-xl">Product Details</h4>


									<p className="mt-2 text-base leading-7">
										{selectedProduct?.description}
									</p>

									<p className="text-sm flex items-center font-medium mt-6">
										<MapPinIcon className="mr-2 h-3 w-3" />
										{selectedProduct?.city}
									</p>
									<p className="text-sm flex items-center font-medium mt-3">
                                  						<ClockIcon className="mr-2 h-3 w-3" />
										Posted {selectedProduct?.created_at}
									</p>

									<div className="flex items-center">
										<Link
											to={`/admin/edit-product?id=${selectedProduct?.id}`}
											className="mt-10 block w-full rounded-md bg-red-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
										>
											Edit
										</Link>

									</div>
								</div>
							</div>
						</div>
					</div>


	<div className="flex">
						{selectedProduct.images[0] && selectedProduct.images.map((image, index) => (
							<div className="p-2">
								{handleShowSelectedImage(image, index)}
							</div>
						))}
        </div>




				</div>
			</div>




		</div>
	)
}

export default PreviewPopup;
