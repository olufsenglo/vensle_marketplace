// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Circle } from 'react-leaflet';

// const Search = () => {
//     const [radius, setRadius] = useState(20);
//     const [products, setProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [userLocation, setUserLocation] = useState({ lat: 51.505, lng: -0.09 }); // Default user location

//     const handleRadiusChange = (newRadius) => {
//         setRadius(newRadius);
//         fetchProducts(searchTerm, newRadius);
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//         fetchProducts(e.target.value, radius);
//     };

//     const calculateDistance = (point1, point2) => {
//         const earthRadius = 6371;

//         const toRadians = (degrees) => {
//             return degrees * (Math.PI / 180);
//         };

//         const lat1 = toRadians(point1.lat);
//         const lon1 = toRadians(point1.lng);
//         const lat2 = toRadians(point2.lat);
//         const lon2 = toRadians(point2.lng);

//         const dLat = lat2 - lat1;
//         const dLon = lon2 - lon1;

//         const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//                 Math.cos(lat1) * Math.cos(lat2) *
//                 Math.sin(dLon / 2) * Math.sin(dLon / 2);

//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//         const distance = earthRadius * c;

//         return distance;
//     };

//     const handleMapClick = (e) => {
//         const clickedLatLng = e.latlng;
//         const newRadius = calculateDistance(userLocation, clickedLatLng);
//         setRadius(newRadius);
//         fetchProducts(searchTerm, newRadius);
//     };

//     const handleSearchClick = () => {
//         fetchProducts(searchTerm, radius);
//     };

//     const fetchProducts = async (searchTerm, searchRadius) => {
//         try {
//             // Make an API call to the backend to fetch products
//             const response = await fetch(`/api/products/search?term=${searchTerm}&radius=${searchRadius}`);
//             const data = await response.json();
//             setProducts(data.products);
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };

//     return (
//         <div className="relative">
//             <input
//                 type="text"
//                 placeholder="Search for products..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="p-2 border rounded focus:outline-none focus:border-blue-500"
//             />

//             <div className="absolute top-full left-0 mt-2 bg-white p-4 shadow-lg rounded">
//                 <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} style={{ width: '300px', height: '300px' }} onClick={handleMapClick}>
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <Circle center={[userLocation.lat, userLocation.lng]} radius={radius * 1000} />
//                 </MapContainer>

//                 <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700">Distance Radius (km)</label>
//                     <input
//                         type="range"
//                         min="1"
//                         max="50"
//                         step="1"
//                         value={radius}
//                         onChange={(e) => handleRadiusChange(e.target.value)}
//                         className="w-full mt-1"
//                     />
//                     <span className="text-sm text-gray-500">Current Radius: {radius} km</span>
//                 </div>

//                 <button onClick={handleSearchClick} className="mt-4 p-2 bg-blue-500 text-white rounded">Search</button>
//             </div>

//             <div className="mt-4">
//                 <h2 className="text-lg font-semibold">Products:</h2>
//                 <ul>
//                     {products.map((product) => (
//                         <li key={product.id}>{product.name}</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Search;
