import React, {useState} from "react";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Icon } from "leaflet";
// import parkData from "./parkData.json";

const position = [51.505, -0.09]

const TestSearch = () => {
    const [activePark, setActivePark] = useState(null);

    return (
        <div>
    {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} id="map">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer> */}
        </div>
    )
}

export default TestSearch;