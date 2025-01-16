import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MapErrorProps {
  message: string;
}

export const MapError: React.FC<MapErrorProps> = ({ message }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-dark-900">
      <div className="text-center p-8">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Map Loading Error</h3>
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  );
};