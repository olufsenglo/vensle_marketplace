import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
        setLoading(false);
      });
  }, [accessToken]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-5 h-full">
      <h2 className="text-2xl font-bold mb-4">Inbox Messages</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
	  
      {inboxMessages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        inboxMessages.map(message => (
         <Link key={message.id} to={`/admin/messages/5`}>
           <div className="border border-gray-200 p-4 mb-4">
            {message?.latest_reply && (
              <div className="mb-2">
                <p className="font-semibold">{message.latest_reply.content}</p>
              </div>
            )}
              <p>{message.content}</p>
           </div>		
         </Link>
        ))
      )}
    </div>
  );
};

export default Messages;
