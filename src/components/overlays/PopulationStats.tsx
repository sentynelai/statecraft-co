import React from 'react';
import { Users, Building2, School } from 'lucide-react';
import { useProvincialData } from '../../hooks/useStoreData';
import { motion } from 'framer-motion';

export const PopulationStats: React.FC = () => {
  const { data } = useProvincialData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((dept, index) => (
        <motion.div
          key={dept.departamento}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-xl p-4"
        >
          <h3 className="text-lg font-semibold mb-4">{dept.departamento}</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00FF9C]/20">
                <Users className="w-5 h-5 text-[#00FF9C]" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Población</p>
                <p className="text-lg font-medium">{dept.poblacion.toLocaleString('es-AR')}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <School className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Escuelas</p>
                <p className="text-lg font-medium">{dept.escuelas}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Building2 className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Hospitales</p>
                <p className="text-lg font-medium">{dept.hospitales}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};