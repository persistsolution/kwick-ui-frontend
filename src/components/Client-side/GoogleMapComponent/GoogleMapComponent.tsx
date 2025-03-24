import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GoogleMapComponent = ({ userLocation, franchiseLocation }) => {
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setGoogleLoaded(true);
    }
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyADZAncocVsQMiK8ebIDhli29nk5GWWydk"
      onLoad={() => setGoogleLoaded(true)}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={userLocation} zoom={12}>
        {/* Render markers only when Google Maps API is available */}
        {googleLoaded && userLocation?.lat && (
          <Marker
            position={userLocation}
            icon={{
              url: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
              scaledSize: new window.google.maps.Size(50, 50),
              anchor: new window.google.maps.Point(25, 50),
            }}
          />
        )}

        {googleLoaded && franchiseLocation?.lat && (
          <Marker
            position={franchiseLocation}
            icon={{
              url: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              scaledSize: new window.google.maps.Size(50, 50),
              anchor: new window.google.maps.Point(25, 50),
            }}
          />
        )}

        {googleLoaded && userLocation?.lat && franchiseLocation?.lat && (
          <Polyline
            path={[userLocation, franchiseLocation]}
            options={{
              strokeColor: "#ff4500",
              strokeOpacity: 0.8,
              strokeWeight: 5,
              geodesic: true,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
