import React, { useState, useEffect } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Slider from 'react-slick';
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

				<p className="cursor-pointer ml-2 mb-4" onClick={() => setOpen(false)}>Back</p>

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
							<div className="rounded-2xl bg-gray-50 py-5 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:pb-8 lg:pt:6">
								<div className="mx-auto px-2">
									<h3 className="text-2xl mb-5 font-bold tracking-tight text-gray-900">
										{selectedProduct.name}
									</h3>
									<div className="flex items-center">
										<div className="flex items-center">
											{[0, 1, 2, 3, 4].map((rating) => (
												<StarIcon
													key={rating}
													className={classNames(
														selectedProduct?.ratings > rating ? 'text-orange-900' : 'text-orange-200',
														'h-3 w-3 flex-shrink-0'
													)}
													aria-hidden="true"
												/>
											))}
										</div>

										<p className="text-sm leading-5 text-gray-600">
											<span className="text-gray-400">{selectedProduct?.ratings}</span> (16 Feedbacks)
										</p>
									</div>
									<h4 className="text-xl mt-3 mb-5">
										{selectedProduct?.currency} {selectedProduct?.price}
									</h4>
									<h4 className="text-lg font-semibold text-gray-600">Product Details</h4>


									<p className="mt-2 text-base leading-7">
										{selectedProduct?.description}
									</p>

									<p className="text-sm flex items-center text-black-200 font-medium text-gray-700 mt-3">

										<svg class="h-3 w-3 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>

										{selectedProduct?.city}
									</p>
									<p className="text-sm flex items-center text-black-200 font-medium text-gray-700 mt-3">

										<svg class="h-3 w-3 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>

										Posted {selectedProduct?.created_at}
									</p>

									<div className="flex items-center">
										<a
											href={`/admin/edit-product?id=${selectedProduct?.id}`}
											className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										>
											Edit
										</a>

									</div>
								</div>
							</div>
						</div>
					</div>


					{/*
	<div className="flex">
	*/}
					<Slider {...settings}>
						{selectedProduct.images[0] && selectedProduct.images.map((image, index) => (
							<div className="p-2">
								{handleShowSelectedImage(image, index)}
							</div>
						))}
					</Slider>
					{/*
        </div>
	*/}




				</div>
			</div>




		</div>
	)
}

export default PreviewPopup;
