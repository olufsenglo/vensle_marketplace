import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Lists from "./components/Lists";

const SentMessages = () => {
	const accessToken = useSelector((state) => state.auth?.user?.token);
	const [sentMessages, setSentMessages] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(true);

	const fetchSentMessages = () => {
		setErrorMessage('');
		axios.get('http://127.0.0.1:8000/api/v1/messages/sent', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
			.then(response => {
				setSentMessages(response.data);
				setLoading(false);
			})
			.catch(error => {
				console.error('Error fetching inbox messages:', error);
				setErrorMessage("Error fetching messages")
				setLoading(false);
			});
	}
	useEffect(() => {
		fetchSentMessages();
	}, [accessToken]);

	if (loading) {
		return <p className='absolute inset-0 flex justify-center items-center'>Loading...</p>;
	}

	return (
		<div className="mt-5 h-full p-4 overflow-hidden">
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
			<div className="flex gap-4">
				<Lists
					messages={sentMessages}
					fetchSentMessages={fetchSentMessages}
					direction="to"
				/>
			</div>
		</div>
	);
};

export default SentMessages;
