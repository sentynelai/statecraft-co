import React from 'react';
import type { MapMarkerProps } from '../../lib/types/map';

export const MapMarker: React.FC<MapMarkerProps> = ({ position, data, onClick }) => {
  const marker = new google.maps.Marker({
    position,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#00FF9C',
      fillOpacity: 0.4,
      strokeWeight: 1,
      strokeColor: '#00FF9C',
      scale: 8
    }
  });

  marker.addListener('click', () => onClick(data));
  
  return null;
};