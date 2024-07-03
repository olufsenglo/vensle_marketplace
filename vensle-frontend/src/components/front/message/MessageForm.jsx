import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { SET_MESSAGE } from "actions/types";

import ButtonLoading from "components/Loading/ButtonLoading";

const BASE_URL = "https://nominet.vensle.com/backend"
const MessageForm = ({
	type,
	receiverId,
	setOpen,
	messageId = '',
	productId = '',
	setMessageId,
	setLeftVisible,
	redirect = false,
	refetchMessages = false,
	setViewMessage = false,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const accessToken = useSelector((state) => state.auth?.user?.token);

	const [content, setContent] = useState('');
	const [contentError, setContentError] = useState("");
	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleFillMessage = (message) => {
		setContent(message)
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		setErrorMessage('');
		setContentError("");
		setLoading(true);

		if (content) {
			const endpoint = type === "reply" ?
				`${BASE_URL}/api/v1/messages/${messageId}/replies` : `${BASE_URL}/api/v1/messages`;

			const data = type === "reply" ? { content: content } : { receiver_id: receiverId, product_id: productId, content: content };

			axios.post(endpoint, data, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			})
				.then(response => {
					dispatch({
						type: SET_MESSAGE,
						payload: { type: "success", message: "Message sent" },
					});

					setContent('');
					setLoading(false);
					if (type === 'reply') {
						setMessageId('');
						setOpen(false);
					} else if (type === 'sendMessageHomePage') {
						setLeftVisible(true);
					}
					if (refetchMessages) {
						refetchMessages();
					}
					if (setViewMessage) {
						setViewMessage(false);
					}
					if (redirect) {
						navigate(redirect);
					}

				})
				.catch(error => {
					setErrorMessage(`Failed to ${messageId ? 'send reply' : 'send message'}. Please try again.`);
					setLoading(false);
					console.error('Error sending message:', error);
				});
		}
		else {
			setLoading(false);
			setContentError("Please enter a message")
		}

	};

	return (
		<>
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
			<form onSubmit={handleSubmit} className="flex flex-1 flex-col">
				<div className="mt-2.5 flex-1 flex flex-col">
					<div class="flex flex-wrap gap-2 text-xs mb-3">
						<span onClick={() => handleFillMessage("How is it")} class="border border-gray-400 rounded-full hover:bg-gray-300 cursor-pointer transition duration-300 px-3 py-[0.1rem] lg:py-1
					">How is it
						</span>
						<span onClick={() => handleFillMessage("I like this")} class="border border-gray-400 rounded-full hover:bg-gray-300 cursor-pointer transition duration-300 px-3 py-[0.1rem] lg:py-1">
							I like this
						</span>
						<span onClick={() => handleFillMessage("How are you doing")} class="border border-gray-400 rounded-full hover:bg-gray-300 cursor-pointer transition duration-300 px-3 py-[0.1rem] lg:py-1">How are you doing
						</span>
						<span onClick={() => handleFillMessage("Do you still have this product")} class="border border-gray-400 rounded-full hover:bg-gray-300 cursor-pointer transition duration-300 px-3 py-[0.1rem] lg:py-1">Do you still have this product
						</span>
					</div>
					<textarea
						id="content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="block h-full lg:min-h-[10rem] w-full rounded-md border-0 px-3.5 py-1.5 lg:py-2 text-sm lg:text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
					</textarea>

					<p className="text-red-500 text-[13px]">{contentError}</p>

				</div>

				<div className="mt-3">
					<button
						type="submit"
						disabled={loading}
						className={`block w-full rounded-md px-3 py-3 text-center text-sm uppercase text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor ${loading ? "bg-red-400" : "bg-primaryColor"
							}`}
					>
						{loading && <ButtonLoading />}
						{messageId ? 'Send Reply' : 'Send Message'}
					</button>
				</div>
			</form>
		</>
	)
}

export default MessageForm;
