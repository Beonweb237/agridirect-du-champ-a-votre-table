import { useMemo } from 'react';
import { Polygon, Tooltip } from 'react-leaflet';

interface Region {
  name: string;
  nameEn: string;
  coords: [number, number][];
  color: string;
  label: string;
}

// Approximate Cameroon agricultural region polygons
const regions: Region[] = [
  {
    name: 'Ouest',
    nameEn: 'West',
    label: 'Cafe, Cacao',
    color: '#C75B2A',
    coords: [
      [5.0, 9.8], [5.0, 10.8], [5.6, 10.8], [5.6, 10.4], [5.4, 10.2],
      [5.4, 9.8], [5.2, 9.6], [5.0, 9.8],
    ],
  },
  {
    name: 'Centre',
    nameEn: 'Centre',
    label: 'Legumes, Volailles',
    color: '#4A7C3F',
    coords: [
      [3.2, 10.8], [3.2, 12.0], [4.2, 12.0], [4.2, 11.6], [4.0, 11.4],
      [4.0, 10.8], [3.6, 10.6], [3.2, 10.8],
    ],
  },
  {
    name: 'Littoral',
    nameEn: 'Littoral',
    label: 'Fruits Tropicaux',
    color: '#D4A017',
    coords: [
      [3.8, 9.4], [3.8, 10.0], [4.4, 10.0], [4.4, 9.8], [4.2, 9.6],
      [4.0, 9.4], [3.9, 9.3], [3.8, 9.4],
    ],
  },
  {
    name: 'Sud',
    nameEn: 'South',
    label: 'Cacao, Fruits',
    color: '#C75B2A',
    coords: [
      [2.2, 9.8], [2.2, 11.4], [3.0, 11.4], [3.0, 11.0], [2.8, 10.6],
      [2.8, 10.0], [2.5, 9.8], [2.2, 9.8],
    ],
  },
];

interface RegionOverlayProps {
  visible: boolean;
  lang: string;
}

export default function RegionOverlay({ visible, lang }: RegionOverlayProps) {
  const isEn = lang === 'en';

  const regionElements = useMemo(() => {
    return regions.map((region) => (
      <Polygon
        key={region.name}
        positions={region.coords}
        pathOptions={{
          fillColor: region.color,
          fillOpacity: visible ? 0.1 : 0,
          color: region.color,
          weight: visible ? 2 : 0,
          opacity: visible ? 0.4 : 0,
        }}
      >
        {visible && (
          <Tooltip direction="center" permanent opacity={0.9} className="bg-transparent border-0 shadow-none">
            <div className="text-center px-2 py-1">
              <span className="block font-semibold text-xs text-soil-900">
                {isEn ? region.nameEn : region.name}
              </span>
              <span className="block text-[10px] text-soil-600">{region.label}</span>
            </div>
          </Tooltip>
        )}
      </Polygon>
    ));
  }, [visible, isEn]);

  if (!visible) return null;
  return <>{regionElements}</>;
}
