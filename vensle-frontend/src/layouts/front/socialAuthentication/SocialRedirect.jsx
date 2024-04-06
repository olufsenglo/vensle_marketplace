import React, { useEffect } from "react";

const SocialRedirect = () => {
  const hostURL = "https://nominet.vensle.com";
  useEffect(() => {
    // Retrieve user data and token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get("user");
    const tokenParam = urlParams.get("token");

    const userData = userParam ? JSON.parse(userParam) : null;

    // Store user data and token in local storage
    if (userData && tokenParam) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: userData,
          token: tokenParam,
          socialProfile: "true",
        })
      );
    }

    window.location.href = `${hostURL}/admin/default`;
  }, []);

  return <div>Logging in. You will be redirected soon...</div>;
};

export default SocialRedirect;
