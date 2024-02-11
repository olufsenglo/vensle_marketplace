import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { SET_MESSAGE } from "actions/types";

const MessageForm = ({
	type,
	receiverId,
	setOpen,
	messageId='',
	setMessageId,
	setLeftVisible,
	redirect=false,
	refetchMessages=false,
	setViewMessage=false,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const accessToken = useSelector((state) => state.auth?.user?.token);

	const [content, setContent] = useState('');
	const [contentError, setContentError] = useState("");
	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrorMessage('');
		setContentError("");
		setLoading(true);
	
		if (content) {
			const endpoint = type === "reply" ?
				`http://localhost:8000/api/v1/messages/${messageId}/replies` : 'http://localhost:8000/api/v1/messages';

			const data = type === "reply" ? { content: content } : { receiver_id: receiverId, content: content };

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
					<textarea
						id="content"
						value={content}
						onChange={(e) => setContent(e.target.value)} className="block h-full min-h-[10rem] w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>

					<p className="text-red-500 text-sm">{contentError}</p>

				</div>

				<div className="mt-3">
					<button
						type="submit"
						disabled={loading}
						className={`block w-full rounded-md px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${loading ? "bg-red-400" : "bg-red-600"
							}`}
					>
						{loading ? 'Loading' : (messageId ? 'Send Reply' : 'Send Message')}
					</button>
				</div>
			</form>
		</>
	)
}

export default MessageForm;
