import React from 'react';
import { useProvincialData } from '../hooks/useStoreData';
import { School, Building2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const BottomMetrics: React.FC = () => {
  const { data } = useProvincialData();

  // Calculate per capita metrics
  const totalPopulation = data.reduce((acc, curr) => acc + curr.poblacion, 0);
  const totalSchools = data.reduce((acc, curr) => acc + curr.escuelas, 0);
  const totalHospitals = data.reduce((acc, curr) => acc + curr.hospitales, 0);

  const metrics = [
    {
      label: 'Habitantes por Escuela',
      value: Math.round(totalPopulation / totalSchools).toLocaleString('es-AR'),
      icon: School,
      color: '#00FF9C'
    },
    {
      label: 'Habitantes por Hospital',
      value: Math.round(totalPopulation / totalHospitals).toLocaleString('es-AR'),
      icon: Building2,
      color: '#3B82F6'
    },
    {
      label: 'Densidad Poblacional',
      value: `${Math.round(data.reduce((acc, curr) => acc + curr.densidad, 0) / data.length)} hab/km²`,
      icon: Users,
      color: '#8B5CF6'
    }
  ];

  return (
    <div className="p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-4"
      >
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${metric.color}20` }}>
                <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
              </div>
              <div>
                <p className="text-sm text-dark-400">{metric.label}</p>
                <p className="text-lg font-semibold">{metric.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}