import React from 'react';
import { motion } from 'framer-motion';
import { Users, X } from 'lucide-react';
import type { LocationData } from '../../lib/types/map';

interface LocationInfoProps {
  data: LocationData;
  onClose: () => void;
}

export const LocationInfo: React.FC<LocationInfoProps> = ({ data, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark-950/90 rounded-xl w-full max-w-lg border border-dark-800/50 backdrop-blur-xl"
      >
        <div className="p-6 flex justify-between items-center border-b border-dark-800/50">
          <h2 className="text-2xl font-bold">{data.departamento}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00FF9C]/20">
              <Users className="w-5 h-5 text-[#00FF9C]" />
            </div>
            <div>
              <p className="text-sm text-dark-400">Población</p>
              <p className="text-lg font-semibold">{data.poblacion.toLocaleString('es-AR')}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};