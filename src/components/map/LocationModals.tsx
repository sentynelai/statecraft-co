import React from 'react';
import { motion } from 'framer-motion';
import { Users, X } from 'lucide-react';
import type { SheetData } from '../../lib/types/sheets';
import { AudienceStats } from './AudienceStats';
import { LocationInsight } from './LocationInsight';
import { InfluencersModal } from './InfluencersModal';

interface LocationModalsProps {
  location: SheetData;
  onClose: () => void;
}

export const LocationModals: React.FC<LocationModalsProps> = ({ location, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-24 overflow-y-auto"
    >
      <div className="w-full max-w-4xl space-y-4">
        {/* Population and Digital Audience */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-dark-950/90 rounded-xl border border-dark-800/50 backdrop-blur-xl"
        >
          <div className="p-6 flex justify-between items-center border-b border-dark-800/50">
            <h2 className="text-2xl font-bold">{location.departamento}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-dark-800/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00FF9C]/20">
                <Users className="w-5 h-5 text-[#00FF9C]" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Población</p>
                <p className="text-lg font-semibold">{location.poblacion.toLocaleString('es-AR')}</p>
              </div>
            </div>
            <AudienceStats location={location} />
          </div>
        </motion.div>

        {/* Location Insights */}
        <LocationInsight location={location} />

        {/* Influencers Section */}
          <div className="px-6 pb-6">
            <InfluencersModal departamento={location.departamento} />
          </div>
      </div>
    </motion.div>
  );
};