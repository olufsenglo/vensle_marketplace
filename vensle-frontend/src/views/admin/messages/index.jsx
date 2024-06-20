import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import Lists from "./components/Lists";

//const baseURL = "https://nominet.vensle.com/backend";
const baseURL = "http://localhost:8000";
const Messages = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state.auth?.user?.token);

  const [inboxMessages, setInboxMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, accessToken]);

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/messages/inbox?per_page=10`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        setInboxMessages(response.data.data);
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
