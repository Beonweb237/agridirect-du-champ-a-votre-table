import L from 'leaflet';

export function createLeafIcon(color: string = '#C75B2A', size: number = 36): L.DivIcon {
  const halfSize = size / 2;
  return L.divIcon({
    className: 'custom-leaf-marker',
    html: `
      <svg width="${size}" height="${size}" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
        <path d="M18 2C12 2 6 7 6 14C6 21 14 30 18 34C22 30 30 21 30 14C30 7 24 2 18 2Z" fill="${color}" stroke="white" stroke-width="2"/>
        <path d="M18 6C14 6 10 10 10 15C10 18 12 22 14 24C13 21 12 18 13 15C14 12 16 10 18 10C20 10 22 12 23 15C24 18 23 21 22 24C24 22 26 18 26 15C26 10 22 6 18 6Z" fill="rgba(255,255,255,0.3)"/>
      </svg>
    `,
    iconSize: [size, size],
    iconAnchor: [halfSize, size],
    popupAnchor: [0, -size - 4],
  });
}

export const defaultLeafIcon = createLeafIcon('#C75B2A', 36);
export const selectedLeafIcon = createLeafIcon('#4A7C3F', 40);
export const hoverLeafIcon = createLeafIcon('#9E471F', 40);
