import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Facebook = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Extract code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // Make a request to exchange the code for an access token
    const exchangeToken = async () => {
	    console.log(code);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/auth/facebook/callback?${code}`);

        const { user, token } = response.data;

//redirect ///
console.log('user, token', user, token)

      } catch (error) {
        console.error('Error exchanging code for token:', error);
      }
    };

    // Call the function when the component mounts
    if (code) {
      exchangeToken();
    }
  }, []);


  return (
    <div>
	  <p>Login Successfull Redirecting...</p>
    </div>
  );
};

export default Facebook;
