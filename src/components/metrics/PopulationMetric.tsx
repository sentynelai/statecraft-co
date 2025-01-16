import React from 'react';
import { Users } from 'lucide-react';
import { useProvincialData } from '../../hooks/useProvincialData';
import { calculateTotalPopulation } from '../../lib/utils/calculations';
import { motion } from 'framer-motion';

interface PopulationMetricProps {
  onClick: () => void;
}

export const PopulationMetric: React.FC<PopulationMetricProps> = ({ onClick }) => {
  const { data, isLoading, isError } = useProvincialData();
  const totalPopulation = !isLoading && !isError ? calculateTotalPopulation(data) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-16 w-16">
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="32"
            cy="32"
            r="28"
            className="stroke-dark-800"
            strokeWidth="6"
            fill="none"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="#8B5CF6"
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 28}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
            animate={{ 
              strokeDashoffset: 2 * Math.PI * 28 * 0.37
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-medium">63%</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-dark-400">Población</p>
        <p className="text-lg font-semibold">
          {isLoading ? 'Cargando...' : 
           isError ? 'Error' : 
           totalPopulation.toLocaleString('es-AR')}
        </p>
      </div>
    </motion.div>
  );
};