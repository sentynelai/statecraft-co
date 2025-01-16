import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Dumbbell, Coffee, Leaf, Sun, X } from 'lucide-react';
import { useStoreSelection } from '../hooks/useStoreSelection';

const audiences = [
  { name: 'Sport Enthusiasts', icon: Dumbbell, percentage: 35, color: '#00FF9C' },
  { name: 'Health Conscious', icon: Heart, percentage: 28, color: '#FF6B6B' },
  { name: 'Energy Seekers', icon: Coffee, percentage: 15, color: '#4ECDC4' },
  { name: 'Wellness Warriors', icon: Leaf, percentage: 12, color: '#45B7D1' },
  { name: 'Active Lifestyle', icon: Sun, percentage: 10, color: '#96CEB4' }
];

interface Props {
  onClose: () => void;
}

export const AudienceMap: React.FC<Props> = ({ onClose }) => {
  const { selectedStore } = useStoreSelection();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed top-24 right-4 w-96 max-w-[calc(100vw-2rem)] bg-dark-950/90 backdrop-blur-lg rounded-xl border border-dark-800/50 p-4 z-50"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#00FF9C]" />
          <h2 className="text-lg font-semibold">
            {selectedStore ? `Store #${selectedStore.id} ` : ''}
            Audience Demographics
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-dark-800/50 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {audiences.map((audience, index) => (
          <motion.div
            key={audience.name}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative p-4 bg-dark-800/50 rounded-lg overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <audience.icon className="w-5 h-5" style={{ color: audience.color }} />
                <span className="text-sm font-medium">{audience.name}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: audience.color }}>
                {audience.percentage}%
              </div>
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10"
              style={{ color: audience.color }}
            >
              <audience.icon className="w-full h-full" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-dark-800/30 rounded-lg">
        <div className="text-sm text-dark-400 mb-2">Total Audience Growth</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#00FF9C] rounded-full"
            />
          </div>
          <span className="text-sm font-medium text-[#00FF9C]">+75%</span>
        </div>
      </div>
    </motion.div>
  );
};