import React from 'react'
import { GoogleMap, useJsApiLoader, Circle } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};


function MyComponent({ distance, zoom, center, setMap, map}) {

  // Place api key in environment variable
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBYcfW7ae2_1VSTj_F4V3opH_fD8YCADSk"
  })


  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])







  return isLoaded ? (
    <>
   
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */}
        {map && (
          <Circle
            center={center}
            radius={distance * 1000} // Radius in meters (adjust as needed)
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              zIndex: 1
            }}
          />
        )}
        <></>
      </GoogleMap>
    </>
  ) : <></>
}

export default React.memo(MyComponent)