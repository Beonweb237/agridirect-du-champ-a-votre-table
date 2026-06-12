import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { createLeafIcon } from '@/components/map/LeafIcon';
import 'leaflet/dist/leaflet.css';

interface MiniMapProps {
  latitude: number;
  longitude: number;
  producerName: string;
  categoryLabel: string;
  farmSize: string;
}

function MapController({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
}

export default function MiniMap({ latitude, longitude, producerName, categoryLabel, farmSize }: MiniMapProps) {
  const pinIcon = createLeafIcon('#C75B2A', 36);

  return (
    <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-card">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
      >
        <MapController lat={latitude} lng={longitude} />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker
          position={[latitude, longitude]}
          icon={pinIcon}
        >
          <Popup>
            <div className="text-center">
              <p className="font-semibold text-sm text-soil-900">{producerName}</p>
              <p className="text-xs text-soil-600">{categoryLabel}</p>
              <p className="text-xs text-soil-500">{farmSize}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
