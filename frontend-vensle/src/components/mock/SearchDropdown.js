// import React, { useState } from 'react';
// import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
// import axios from 'axios';

// const SearchDropdown = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [radius, setRadius] = useState(10); // Initial radius value in kilometers
//   const [mapCenter, setMapCenter] = useState([0, 0]); // Initial map center coordinates

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearchClick = () => {
//     // Make the axios request here using searchTerm and radius
//     // You can pass the searchTerm and radius to your backend API for product search

//     // Example axios request (replace with your API endpoint)
//     axios.get(`/api/products?search=${searchTerm}&radius=${radius}`)
//       .then((response) => {
//         // Handle the response, update UI, etc.
//         onSearch(response.data);
//       })
//       .catch((error) => {
//         console.error('Error searching products:', error);
//       });
//   };

//   const handleMapClick = (e) => {
//     // Update the map center and calculate the radius based on the clicked position
//     setMapCenter([e.latlng.lat, e.latlng.lng]);
//     const newRadius = calculateRadiusInKm(mapCenter, [e.latlng.lat, e.latlng.lng]);
//     setRadius(newRadius);
//   };

//   const calculateRadiusInKm = (point1, point2) => {
//     // This is a basic example, you may want to use a more accurate formula in production
//     const R = 6371; // Earth's radius in kilometers
//     const lat1 = point1[0];
//     const lon1 = point1[1];
//     const lat2 = point2[0];
//     const lon2 = point2[1];

//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   };

//   return (
//     <div className="relative">
//       <input
//         type="text"
//         placeholder="Search for products..."
//         value={searchTerm}
//         onChange={handleInputChange}
//         className="border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
//       />

//       {/* Dropdown with map for radius selection */}
//       <div className="absolute top-full left-0 mt-2 p-4 bg-white border rounded shadow-md">
//         <label htmlFor="radius">Search Radius (km): {radius.toFixed(2)}</label>

//         {/* Use react-leaflet to create an interactive map */}
//         <MapContainer
//           center={mapCenter}
//           zoom={13}
//           style={{ height: '200px', width: '100%', marginBottom: '10px' }}
//           onClick={handleMapClick}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
  
//           <CircleMarker center={mapCenter} radius={5} />
//         </MapContainer>

//         <button
//           onClick={handleSearchClick}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchDropdown;
