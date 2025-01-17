import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { AnimatePresence, motion } from 'framer-motion';
import { LocationModals } from './map/LocationModals';
import { useProvincialData } from '../hooks/useProvincialData';
import type { SheetData } from '../lib/types/sheets';

const CORRIENTES_CENTER = { lat: -27.4806, lng: -58.8341 }; // Updated to Corrientes coordinates

interface TooltipState {
  content: string;
  x: number;
  y: number;
  visible: boolean;
}

export const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { data: locations, isLoading } = useProvincialData();
  const [selectedLocation, setSelectedLocation] = useState<SheetData | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    content: '',
    x: 0,
    y: 0,
    visible: false
  });
  
  useEffect(() => {
    if (!mapRef.current || isLoading || !locations?.length) return;

    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!API_KEY) {
      console.error('Google Maps API key is not configured');
      return;
    }

    const loader = new Loader({
      apiKey: API_KEY,
      version: 'weekly'
    });

    loader.load().then((google) => {
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current!, {
          center: CORRIENTES_CENTER,
          zoom: 8,
          styles: [
            {
              featureType: "all",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [{ color: "#ffffff" }, { weight: 1 }]
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#222222" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#111111" }]
            }
          ],
          disableDefaultUI: true,
          zoomControl: true
        });
      }

      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add markers for each location
      locations.forEach(location => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstanceRef.current,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#00FF9C',
            fillOpacity: 0.4,
            strokeWeight: 1,
            strokeColor: '#00FF9C',
            scale: 8
          }
        });

        marker.addListener('mouseover', (e: google.maps.MapMouseEvent) => {
          const event = e.domEvent as MouseEvent;
          setTooltip({
            content: location.departamento,
            x: event.clientX,
            y: event.clientY,
            visible: true
          });
        });

        marker.addListener('mouseout', () => {
          setTooltip(prev => ({ ...prev, visible: false }));
        });

        marker.addListener('click', () => setSelectedLocation(location));
        markersRef.current.push(marker);
      });
    }).catch(error => {
      console.error('Error loading Google Maps:', error);
    });

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [locations, isLoading]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="absolute inset-0" />
      
      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="fixed z-50 bg-black/90 text-white text-sm px-3 py-1.5 rounded-md pointer-events-none backdrop-blur-sm"
            style={{
              left: tooltip.x,
              top: tooltip.y - 40,
              transform: 'translateX(-50%)'
            }}
          >
            {tooltip.content}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {selectedLocation && (
          <LocationModals 
            location={selectedLocation} 
            onClose={() => setSelectedLocation(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};