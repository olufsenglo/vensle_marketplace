import { Fragment, useState, useEffect } from "react";
import axios from "axios";

import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Top = () => {
  const baseURL = "https://nominet.vensle.com/backend";
  const [distance, setDistance] = useState(20);
  const [userLocation, setUserLocation] = useState(null);
  const [userCountry, setUserCountry] = useState(null);
  const [products, setProducts] = useState([]);

  const handleDistanceChange = (event) => {
    const newDistance = parseInt(event.target.value, 10);
    setDistance(newDistance);
    fetchProducts(userLocation, newDistance, userCountry);
  };

  const fetchProducts = (location, selectedDistance, country) => {
    if (location) {
      if (!country) country = "UK";

      axios
        .get(
          `${baseURL}/api/v1/products?lat=${location.lat}&lng=${location.lng}&distance=${selectedDistance}&country=${country}`
        )
        .then((response) => setProducts(response.data.data))
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            fetchProducts(
              { lat: latitude, lng: longitude },
              distance,
              userCountry
            );
          },
          (error) => {
            console.error("Error getting user location:", error);
            setUserLocation({ lat: 51.509865, lng: -0.118092 });
            // Handle geolocation permission denied with an alert
            if (error.code === 1) {
              alert(
                "Geolocation permission denied. Please enable location services."
              );
            }
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    const getUserCountry = () => {
      /*
    axios.get('https://ipinfo.io')
      .then(response => {
        const country = response.data.country;
        setUserCountry(country);
      })
      .catch(error => {
        console.error('Error getting user country:', error);
      });
      */
      setUserCountry("UK");
    };

    getUserLocation();
    getUserCountry();
  }, [distance]);

  return (
    <div className="bg-white">
      <div className="container mx-auto my-8 bg-gray-100 p-8">
        <label className="mb-4 block">
          Select Distance:
          <select
            className="ml-2 p-2"
            value={distance}
            onChange={handleDistanceChange}
          >
            <option value={10}>10 km</option>
            <option value={20}>20 km</option>
            <option value={30}>30 km</option>
          </select>
        </label>

        {userLocation && (
          <p className="mb-4">
            Your Location: {userLocation.lat}, {userLocation.lng}
          </p>
        )}

        <p className="mb-4">Selected Distance: {distance} km</p>

        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-4 bg-white p-4 shadow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>Latitude: {product.latitude}</p>
              <p>Longitude: {product.longitude}</p>
              <p>Country: {product.country}</p>
            </li>
          ))}
        </ul>
      </div>

      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex justify-between p-4"
          style={{ padding: "19px 0rem", fontSize: "15px" }}
        >
          <ul className="flex justify-between">
            <li className="mr-6 hidden md:block">
              Welcome to our Online Store!
            </li>
            <li className="mr-6 text-red-500" style={{ color: "#ff5959" }}>
              Upload Your Product
            </li>
            <li className="text-red-500" style={{ color: "#ff5959" }}>
              Register as a Driver
            </li>
          </ul>
          <ul className="flex justify-between">
            <li
              className="mr-6 text-red-500"
              style={{ color: "#ff5959", marginRight: "50px" }}
            >
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    style={{ color: "#ff5959" }}
                  >
                    For Sale
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="ring-black absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
            <li className="hidden md:block">United Kingdom</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Top;
