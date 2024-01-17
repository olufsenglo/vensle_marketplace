import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const NotificationIcon = () => {
  const baseURL = 'https://nominet.vensle.com/backend';
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const accessToken = useSelector((state) => state.auth.user.token);

  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userAlerts, setUserAlerts] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/user-alerts/unread-count`, {
              headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`,
              },	
    })
      .then(response => setUnreadCount(response.data.unreadCount))
      .catch(error => console.error('Error fetching unread count:', error));

    axios.get(`${baseURL}/api/v1/user-alerts/unread`, {
              headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`,
              },	
    })
      .then(response => setUserAlerts(response.data.userAlerts))
      .catch(error => console.error('Error fetching unread alerts:', error));
  }, []);

  const markAsRead = () => {
    axios.put(
	    `${baseURL}/api/v1/user-alerts/mark-as-read`,
	    {},
	    {
              headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`,
              },	
    })
      .then(() => {
        setUnreadCount(0);
        setUserAlerts([]);
      })
      .catch(error => console.error('Error marking alerts as read:', error));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9a2 2 0 100-4 2 2 0 000 4zm0 0a6 6 0 100-12 6 6 0 000 12z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 21c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2"
          ></path>
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full px-2">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            {userAlerts.length > 0 ? (
              <ul>
                {userAlerts.map(alert => (
                  <li key={alert.id} className={`mb-2 ${alert.read ? 'opacity-50' : 'font-bold'}`}>
                    {alert.title}: {alert.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No new notifications.</p>
            )}
          </div>
          <div className="p-2 bg-gray-100 text-center">
            <button onClick={markAsRead} className="text-blue-500 hover:underline">
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
