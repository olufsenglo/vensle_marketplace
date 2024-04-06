import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CreateMessage = () => {
  const accessToken = useSelector((state) => state.auth?.user?.token);

  const [receiverId, setReceiverId] = useState('');
  const [content, setContent] = useState('');
  const [messageId, setMessageId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const endpoint = messageId ? `https://nominet.vensle.com/backend/api/v1/messages/${messageId}/replies` : 'https://nominet.vensle.com/backend/api/v1/messages';

    const data = messageId ? { content: content } : { receiver_id: receiverId, content: content };

    axios.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        setSuccessMessage(messageId ? 'Reply sent successfully!' : 'Message sent successfully!');
        setContent('');
        setReceiverId('');
        setMessageId('');
      })
      .catch(error => {
        setErrorMessage(`Failed to ${messageId ? 'send reply' : 'send message'}. Please try again.`);
        console.error('Error sending message:', error);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{messageId ? 'Reply to Message' : 'Send Message'}</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="receiverId" className="block text-gray-700 font-semibold mb-2">Receiver:</label>
            <input type="text" id="receiverId" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">{messageId ? 'Reply Content:' : 'Message Content:'}</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="border border-gray-400 rounded-md p-2 w-full" rows="4"></textarea>
        </div>
          <div className="mb-4">
            <label htmlFor="messageId" className="block text-gray-700 font-semibold mb-2">Message ID (for reply):</label>
            <input type="text" id="messageId" value={messageId} onChange={(e) => setMessageId(e.target.value)} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">{messageId ? 'Send Reply' : 'Send Message'}</button>
      </form>
    </div>
  );
};

export default CreateMessage;
