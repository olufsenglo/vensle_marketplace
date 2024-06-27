import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Card from "components/card";
import CardMenu from "components/card/CardMenu";
import Switch from "components/switch";
import ButtonLoading from "components/Loading/ButtonLoading";

const baseURL = "https://nominet.vensle.com/backend";
function Notification({ handlePreferenceUpdate, notificationPrefLoading }) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state.auth?.user?.token);


  const [loading, setLoading] = useState([]);
  const [preferences, setPreferences] = useState([]);

  
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const updatedPreferences = preferences.map(pref =>
      pref.id === id ? { ...pref, checked } : pref
    );
    setPreferences(updatedPreferences);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      //TODO: create get preference endpoint instead of using this
      try {
        const response = await axios.get(
          `${baseURL}/api/v1/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
        );
        const apiPreferences = response.data.notification_preferences
        const transformedPreferences = Object.keys(apiPreferences).map(key => ({
          id: key,
          label: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), // Capitalize each word
          checked: apiPreferences[key]
        }));
        
        setPreferences(transformedPreferences);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching saved products:", error);
        setLoading(false)
      }
    };

    fetchData();
  }, []);


  return (
    <Card extra={"w-full h-full p-3"}>
      <div className="relative mb-3 flex items-center justify-between pt-1">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Notifications
        </h4>
        <CardMenu />
      </div>
      <div className="flex flex-col">
        {loading && <p>Loading...</p>}
          {preferences.map(preference => (
          <div key={preference.id} className="mt-3 flex items-center gap-3">
            <Switch
              id={preference.id}
              checked={preference.checked}
              onChange={handleCheckboxChange}
              color={"red"}
            />
            <label
              htmlFor={preference.id}
              className="text-base font-medium text-navy-700 dark:text-white"
            >
              {preference.label}
            </label>
          </div>
        ))}

      </div>

      <div className="mt-4 mb-1 flex justify-end">
        <button
          onClick={() => handlePreferenceUpdate(preferences)}
          className="linear flex items-center mt-3 px-12 rounded-xl bg-primaryColor py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-400 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
        >
          {notificationPrefLoading && <ButtonLoading />}
          Update
        </button>
      </div>
    </Card>
  );
}

export default Notification;
