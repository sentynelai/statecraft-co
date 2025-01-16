import React from 'react';
import { motion } from 'framer-motion';
import { Users, School, Building2, X } from 'lucide-react';
import { useProvincialData } from '../../hooks/useStoreData';

interface PopulationStatsModalProps {
  onClose: () => void;
}

export const PopulationStatsModal: React.FC<PopulationStatsModalProps> = ({ onClose }) => {
  const { data } = useProvincialData();
  
  // Sort cities by population in descending order
  const sortedCities = [...data].sort((a, b) => b.poblacion - a.poblacion);

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
        className="bg-dark-950/90 rounded-xl w-full max-w-4xl border border-dark-800/50 backdrop-blur-xl max-h-[80vh] overflow-hidden"
      >
        <div className="p-6 flex justify-between items-center border-b border-dark-800/50">
          <h2 className="text-2xl font-bold">Estadísticas de Población</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCities.slice(0, 6).map((city, index) => (
              <motion.div
                key={city.departamento}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-800/30 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold mb-4">{city.departamento}.</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#00FF9C]/20">
                      <Users className="w-5 h-5 text-[#00FF9C]" />
                    </div>
                    <div>
                      <p className="text-sm text-dark-400">Población</p>
                      <p className="text-lg font-medium">
                        {city.poblacion.toLocaleString('es-AR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <School className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-dark-400">Escuelas</p>
                      <p className="text-lg font-medium">{city.escuelas}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Building2 className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-dark-400">Hospitales</p>
                      <p className="text-lg font-medium">{city.hospitales}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};