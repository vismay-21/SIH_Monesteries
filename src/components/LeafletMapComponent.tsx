// SIH_Monasteries-main/src/components/LeafletMapComponent.tsx

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Default icon for markers (Leaflet's default marker isn't bundled with react-leaflet)
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LeafletMapComponentProps {
  monasteryPosition: L.LatLngExpression; // [latitude, longitude]
  monasteryName: string;
  zoom?: number;
}

const LocationMarker = ({ setCenter }: { setCenter: (pos: L.LatLngExpression) => void }) => {
  const [position, setPosition] = useState<L.LatLngExpression | null>(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      setCenter(e.latlng); // Update the parent component's center
    },
    locationerror(e) {
      console.error("Geolocation error:", e.message);
    },
  });

  useEffect(() => {
    map.locate(); // Request user's location when component mounts
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={defaultIcon}>
      <Popup>You are here!</Popup>
    </Marker>
  );
};

export const LeafletMapComponent = ({ monasteryPosition, monasteryName, zoom = 13 }: LeafletMapComponentProps) => {
  const [mapCenter, setMapCenter] = useState<L.LatLngExpression>(monasteryPosition);

  // Function to update map center if user location is found
  const handleUserLocationFound = (userPos: L.LatLngExpression) => {
    // Optionally, you might want to set the map center to a point between the monastery and user
    // For now, let's just make sure the map eventually centers on one of them or a good overview.
    // We'll prioritize showing both if possible.
    setMapCenter(monasteryPosition); // Re-center on monastery by default, user marker will show up too
  };

  return (
    <MapContainer center={monasteryPosition} zoom={zoom} scrollWheelZoom={false} className="h-full w-full rounded-lg">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Monastery Marker */}
      <Marker position={monasteryPosition} icon={defaultIcon}>
        <Popup>{monasteryName}</Popup>
      </Marker>

      {/* User Location Marker */}
      <LocationMarker setCenter={handleUserLocationFound} />
    </MapContainer>
  );
};