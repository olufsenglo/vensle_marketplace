import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Lists from "./components/Lists";

const Messages = () => {
  const [inboxMessages, setInboxMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((state) => state.auth?.user?.token);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/messages/inbox', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        setInboxMessages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching inbox messages:', error);
        setErrorMessage("Error fetching messages")
        setLoading(false);
      });
  }, [accessToken]);

  if (loading) {
	  return <p className='absolute inset-0 flex justify-center items-center'>Loading...</p>;
  }

  return (
		<div className="mt-5 h-full p-4 overflow-hidden">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

			<div className="flex gap-4">
				<Lists
					messages={inboxMessages}
	  				direction="from"
				/>
			</div>
    </div>
  );
};

export default Messages;
