import React from 'react';
import { Users, School, Building2 } from 'lucide-react';
import { useProvincialData } from '../hooks/useStoreData';
import { motion } from 'framer-motion';

export const TopMetrics: React.FC = () => {
  const { data } = useProvincialData();

  const totals = data.reduce((acc, curr) => ({
    poblacion: acc.poblacion + curr.poblacion,
    escuelas: acc.escuelas + curr.escuelas,
    hospitales: acc.hospitales + curr.hospitales
  }), {
    poblacion: 0,
    escuelas: 0,
    hospitales: 0
  });

  const metrics = [
    {
      icon: Users,
      label: 'Población Total',
      value: totals.poblacion.toLocaleString('es-AR'),
      color: '#00FF9C'
    },
    {
      icon: School,
      label: 'Escuelas',
      value: totals.escuelas.toLocaleString('es-AR'),
      color: '#3B82F6'
    },
    {
      icon: Building2,
      label: 'Hospitales',
      value: totals.hospitales.toLocaleString('es-AR'),
      color: '#8B5CF6'
    }
  ];

  return (
    <div className="p-4">
      <div className="glass rounded-xl p-4">
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: -20 }}
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
      </div>
    </div>
  );
}