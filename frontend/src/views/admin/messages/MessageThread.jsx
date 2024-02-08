import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MessageThread = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const messageId = pathname.split('/').pop();	

  const [messageThread, setMessageThread] = useState(null);
  const accessToken = useSelector((state) => state.auth?.user?.token);

  useEffect(() => {
    if (!messageId) return;

    axios.get(`http://127.0.0.1:8000/api/v1/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
      })
      .then(response => {
        setMessageThread(response.data);
      })
      .catch(error => {
        console.error('Error fetching message thread:', error);
      });
  }, [messageId]);

  if (!messageThread) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Message Thread</h2>
      <div className="border border-gray-200 p-4 mb-4">
        <p className="font-semibold">{messageThread.content}</p>
        <ul className="list-disc ml-6 mt-2">
          {messageThread.replies?.map(reply => (
            <li key={reply.id}>{reply.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageThread;
