import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import {
	removeFromCart,
	decreaseQuantity,
	increaseQuantity,
} from "actions/actions";

const baseURL = "https://nominet.vensle.com/backend";

const CartDrawer = ({ open, setOpen }) => {
	const dispatch = useDispatch();

	const cartItems = useSelector((state) => state.cart.items);
	const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);

	const validCartItems = cartItems.filter(item => item !== null);

	const totalPrice = validCartItems.reduce((total, product) => {
		const productPrice = parseFloat(product.price);
		return total + productPrice;
	}, 0);

	function formatPrice(price) {
		return Number(parseFloat(price).toFixed(2)).toLocaleString('en', {
			minimumFractionDigits: 2
		});
	}

	const formattedTotalPrice = formatPrice(totalPrice);

	const handleRemoveFromCart = (itemId) => {
		dispatch(removeFromCart(itemId));
	};

	const handleDecreaseQuantity = (itemId) => {
		dispatch(decreaseQuantity(itemId));
	};

	const handleIncreaseQuantity = (itemId) => {
		dispatch(increaseQuantity(itemId));
	};

	const getCartDisplayImage = (product) => {
		return product?.display_image
			? `${baseURL}/uploads/${product.display_image.name}`
			: "";
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
									<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
										<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-lg font-medium text-gray-900">
													Shopping cart
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
														onClick={() => setOpen(false)}
													>
														<span className="absolute -inset-0.5" />
														<span className="sr-only">Close panel</span>
														<XMarkIcon
															className="h-6 w-6"
															aria-hidden="true"
														/>
													</button>
												</div>
											</div>

											<div className="mt-8">
												<div className="flow-root">
													{validCartItems.length === 0 ? (
														<p>Your cart is empty.</p>
													) : (
														<ul
															className="-my-6 divide-y divide-gray-200"
														>
															{validCartItems.map((item) => (
																<li key={item.id} className="flex py-6">
																	<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
																		<img
																			src={getCartDisplayImage(item)}
																			alt={item.name}
																			className="h-full w-full object-cover object-center"
																		/>
																	</div>

																	<div className="ml-4 flex flex-1 flex-col">
																		<div>
																			<div className="flex justify-between text-base font-medium text-gray-900">
																				<h3>
																					<Link to={item.href}>
																						{item.name}
																					</Link>
																				</h3>
																				<p className="ml-4">
																					$
																					{formatPrice(
																						item.price * item.quantity
																					)}
																				</p>
																			</div>
																			<p className="mt-1 text-sm text-gray-500">
																				red
																			</p>
																		</div>
																		<div className="flex flex-1 items-end justify-between text-sm">
																			<p className="text-gray-500">
																				Qty {item.quantity}
																			</p>

																			<div class="sm:order-1">
																				<div class="mx-auto flex h-8 items-stretch text-gray-600">
																					<button
																						onClick={() =>
																							handleDecreaseQuantity(item.id)
																						}
																						class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-gray-800 hover:text-white"
																					>
																						-
																					</button>
																					<div class="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
																						{item.quantity}
																					</div>
																					<button
																						onClick={() =>
																							handleIncreaseQuantity(item.id)
																						}
																						class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-gray-800 hover:text-white"
																					>
																						+
																					</button>
																				</div>
																			</div>

																			<div className="flex">
																				<button
																					type="button"
																					onClick={() =>
																						handleRemoveFromCart(item.id)
																					}
																					className="font-medium text-red-500 hover:text-red-400"
																				>
																					Remove
																				</button>
																			</div>
																		</div>
																	</div>
																</li>
															))}
														</ul>
													)}
												</div>
											</div>
										</div>

										<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
											<div className="flex justify-between text-base font-medium text-gray-900">
												<p>Subtotal</p>
												<p>${formattedTotalPrice}</p>
											</div>
											<p className="mt-0.5 text-sm text-gray-500">
												Shipping and taxes calculated at checkout.
											</p>
											<div className="mt-6">
												{isAuthenticated ?
													<Link
														to="/cart"
														className="border-transparent flex items-center justify-center rounded-md border bg-red-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-600"
													>
														Checkout
													</Link>
													:
													<Link
														to="/"
														className="border-transparent flex items-center justify-center rounded-md border bg-red-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-600"
													>
														Please Login to Checkout
													</Link>
												}
											</div>
											<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
												<p>
													or{" "}
													<button
														type="button"
														className="font-medium text-red-600 hover:text-red-500"
														onClick={() => setOpen(false)}
													>
														Continue Shopping
														<span aria-hidden="true"> &rarr;</span>
													</button>
												</p>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default CartDrawer;