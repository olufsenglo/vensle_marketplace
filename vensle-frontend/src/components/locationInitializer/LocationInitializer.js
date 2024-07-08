import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../actions/locationActions';

const LocationInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLocation = async () => {
      const storedLocation = localStorage.getItem('location');
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&location=${longitude},${latitude}`);
          const data = await response.json();
          if (
	       data.address &&
	       data.address.City && 
	       data.address.CntryName &&
	       data.address.CountryCode
	  ) {
            const newLocation = {
              city: data.address.City,
              country: data.address.CntryName,
              countryCode: data.address.CountryCode,
	      lat: latitude,
              lng: longitude,
            };
            if (!storedLocation) {
              localStorage.setItem('location', JSON.stringify(newLocation));
              dispatch(setLocation(newLocation));
            } else {
              const parsedStoredLocation = JSON.parse(storedLocation);
              if (
                parsedStoredLocation.city !== newLocation.city ||
                parsedStoredLocation.country !== newLocation.country ||
                parsedStoredLocation.countryCode !== newLocation.countryCode ||
                parsedStoredLocation.lat !== newLocation.lat ||
                parsedStoredLocation.lng !== newLocation.lng
              ) {
                localStorage.setItem('location', JSON.stringify(newLocation));
                dispatch(setLocation(newLocation));
              } else {
                dispatch(setLocation(parsedStoredLocation));
              }
            }
          }
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    };

    fetchLocation();
  }, [dispatch]);

  return null;
};

export default LocationInitializer;
