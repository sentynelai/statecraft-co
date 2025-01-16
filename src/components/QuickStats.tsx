import React from 'react';
import { motion } from 'framer-motion';
import { Users, School, Building2, DollarSign } from 'lucide-react';
import { useProvincialData } from '../hooks/useStoreData';

export const QuickStats: React.FC = () => {
  const { data } = useProvincialData();

  const totals = data.reduce((acc, curr) => ({
    poblacion: acc.poblacion + curr.poblacion,
    escuelas: acc.escuelas + curr.escuelas,
    hospitales: acc.hospitales + curr.hospitales,
    presupuesto: acc.presupuesto + curr.presupuesto
  }), {
    poblacion: 0,
    escuelas: 0,
    hospitales: 0,
    presupuesto: 0
  });

  const stats = [
    {
      label: 'Población Total',
      value: totals.poblacion.toLocaleString('es-AR'),
      icon: Users,
      color: '#00FF9C'
    },
    {
      label: 'Escuelas',
      value: totals.escuelas.toLocaleString('es-AR'),
      icon: School,
      color: '#3B82F6'
    },
    {
      label: 'Hospitales',
      value: totals.hospitales.toLocaleString('es-AR'),
      icon: Building2,
      color: '#8B5CF6'
    },
    {
      label: 'Presupuesto',
      value: `$${(totals.presupuesto / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: '#10B981'
    }
  ];

  return (
    <div className="h-full space-y-4 overflow-y-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-xl p-4 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <stat.icon 
                className="w-5 h-5"
                style={{ color: stat.color }}
              />
            </div>
            <div>
              <p className="text-sm text-dark-400">{stat.label}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-xl p-4 backdrop-blur-md"
      >
        <h3 className="text-sm font-medium text-dark-400 mb-3">Departamentos</h3>
        <div className="space-y-2 max-h-[calc(100vh-24rem)] overflow-y-auto">
          {data.map((dept, index) => (
            <motion.div
              key={dept.departamento}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="p-3 rounded-lg hover:bg-dark-800/50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-center">
                <span>{dept.departamento}</span>
                <span className="text-sm text-dark-400">
                  {dept.poblacion.toLocaleString('es-AR')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};