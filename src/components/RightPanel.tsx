import React from 'react';
import { useProvincialData } from '../hooks/useStoreData';
import { Building2, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export const RightPanel: React.FC = () => {
  const { data } = useProvincialData();

  const sortedByBudget = [...data].sort((a, b) => b.presupuesto - a.presupuesto);
  const maxBudget = Math.max(...data.map(d => d.presupuesto));

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold mb-6">Presupuesto por Departamento</h2>
      
      {sortedByBudget.map((dept, index) => (
        <motion.div
          key={dept.departamento}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="glass rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#00FF9C]" />
              <span className="font-medium">{dept.departamento}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#00FF9C]" />
              <span>${(dept.presupuesto / 1000000).toFixed(1)}M</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-dark-400">
              <span>Población: {dept.poblacion.toLocaleString('es-AR')}</span>
              <span>Densidad: {dept.densidad.toFixed(1)}</span>
            </div>
            
            <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(dept.presupuesto / maxBudget) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-[#00FF9C] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}