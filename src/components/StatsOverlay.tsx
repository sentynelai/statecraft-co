import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { PopulationStats } from './overlays/PopulationStats';
import { DigitalStats } from './overlays/DigitalStats';
import { ConversationStats } from './overlays/ConversationStats';

interface StatsOverlayProps {
  type: 'population' | 'digital' | 'conversations';
  onClose: () => void;
}

export const StatsOverlay: React.FC<StatsOverlayProps> = ({ type, onClose }) => {
  const components = {
    population: PopulationStats,
    digital: DigitalStats,
    conversations: ConversationStats
  };

  const Component = components[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed top-36 left-4 right-4 bottom-4 z-20"
    >
      <div className="bg-dark-950/80 backdrop-blur-md rounded-xl p-6 h-full border border-dark-800/50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {type === 'population' && 'Estadísticas de Población'}
            {type === 'digital' && 'Audiencia Digital'}
            {type === 'conversations' && 'Análisis de Conversaciones'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <Component />
      </div>
    </motion.div>
  );
};