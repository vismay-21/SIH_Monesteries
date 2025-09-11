import React, { useEffect, useMemo, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // ensure Leaflet UI is styled

// Default marker icon (Leaflet doesn't bundle assets with react-leaflet)
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LeafletMapComponentProps {
  monasteryPosition: L.LatLngExpression; // [lat, lng]
  monasteryName: string;
  zoom?: number;
}

const metersToNice = (m: number) => {
  if (!Number.isFinite(m)) return '';
  if (m < 1000) return `${Math.round(m)} m`;
  const km = m / 1000;
  return `${km.toFixed(km < 10 ? 1 : 0)} km`;
};

export const LeafletMapComponent: React.FC<LeafletMapComponentProps> = ({
  monasteryPosition,
  monasteryName,
  zoom = 13,
}) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [useSatellite, setUseSatellite] = useState(false);

  // user geolocation state
  const [userPos, setUserPos] = useState<L.LatLng | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const monasteryLL = useMemo(
    () => L.latLng(monasteryPosition as any),
    [monasteryPosition]
  );

  const distanceText = useMemo(() => {
    if (!userPos) return null;
    return metersToNice(userPos.distanceTo(monasteryLL));
  }, [userPos, monasteryLL]);

  // Add a metric scale on mount
  useEffect(() => {
    if (!map) return;
    const ctl = L.control.scale({ imperial: false, metric: true });
    ctl.addTo(map);
    return () => {
      // ensure cleanup returns void
      ctl.remove();
    };
  }, [map]);

  // Locate using browser Geolocation API (more reliable than map.locate on some setups)
  const locateMe = () => {
    setGeoError(null);
    if (!('geolocation' in navigator)) {
      setGeoError('Geolocation is not available in this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy: acc } = pos.coords;
        const ll = L.latLng(latitude, longitude);
        setUserPos(ll);
        setAccuracy(acc ?? null);
        if (map) map.flyTo(ll, Math.max(map.getZoom(), 14), { duration: 0.8 });
      },
      (err) => {
        setGeoError(
          err?.message ||
            'Unable to get your location. If you’re not on HTTPS, the browser may block geolocation.'
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Fit both Rumtek and user position
  const fitBoth = () => {
    if (!map || !userPos) return;
    const bounds = L.latLngBounds([monasteryLL, userPos]).pad(0.25);
    map.fitBounds(bounds, { animate: true });
  };

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden">
      <MapContainer
  center={monasteryPosition}
  zoom={zoom}
  scrollWheelZoom={true}
  className="h-full w-full rounded-lg"
  zoomControl={false} // disable default control
  ref={(instance) => {
    if (instance && !map) {
      setMap(instance);
      // add zoom control manually at bottom-right
      L.control.zoom({ position: "bottomright" }).addTo(instance);
    }
  }}
>

        {/* Basemap layers */}
        {!useSatellite ? (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        ) : (
          <TileLayer
            attribution='Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        {/* Rumtek marker */}
        <Marker position={monasteryLL} icon={defaultIcon}>
          <Popup>{monasteryName}</Popup>
        </Marker>

        {/* User marker & accuracy */}
        {userPos && (
          <>
            <Marker position={userPos} icon={defaultIcon}>
              <Popup>You are here</Popup>
            </Marker>
            {typeof accuracy === 'number' && (
              <Circle
                center={userPos}
                radius={accuracy}
                pathOptions={{ color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 0.2 }}
              />
            )}
          </>
        )}
      </MapContainer>

      {/* Floating UI: basemap toggle */}
      <div className="absolute top-3 right-3 z-[500] pointer-events-auto">
        <button
          onClick={() => setUseSatellite((v) => !v)}
          className="rounded-md bg-white/90 backdrop-blur px-3 py-2 text-sm shadow ring-1 ring-black/5 hover:bg-white"
          title="Toggle basemap"
        >
          {useSatellite ? '🗺️ Map' : '🛰️ Satellite'}
        </button>
      </div>

      {/* Floating UI: actions & distance (top-left) */}
      <div className="absolute top-3 left-3 z-[500] space-y-2 pointer-events-auto">
        {distanceText && (
          <div className="rounded-md bg-white/90 backdrop-blur px-3 py-2 text-sm shadow ring-1 ring-black/5">
            <div className="font-medium">Distance to Rumtek</div>
            <div className="text-gray-700">{distanceText}</div>
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={locateMe}
            className="rounded-md bg-white/90 backdrop-blur px-3 py-2 text-sm shadow ring-1 ring-black/5 hover:bg-white"
            title="Locate me"
          >
            📍 Locate me
          </button>
          <button
            onClick={fitBoth}
            disabled={!userPos}
            className={`rounded-md px-3 py-2 text-sm shadow ring-1 ring-black/5 ${
              userPos
                ? 'bg-white/90 backdrop-blur hover:bg-white'
                : 'bg-white/60 text-gray-400 cursor-not-allowed'
            }`}
            title="Show both locations"
          >
            🔍 Fit both
          </button>
        </div>

        {geoError && (
          <div className="max-w-[260px] rounded-md bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-red-200 shadow">
            {geoError}
          </div>
        )}
      </div>
    </div>
  );
};
