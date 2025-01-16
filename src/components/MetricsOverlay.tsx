import React from 'react';
import { Users, MessageSquare, TrendingUp, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProvincialData } from '../hooks/useStoreData';

export const MetricsOverlay: React.FC = () => {
  const { data: provincialData } = useProvincialData();

  const metrics = [
    {
      icon: Users,
      label: 'Población Total',
      value: provincialData.reduce((acc, curr) => acc + curr.poblacion, 0).toLocaleString('es-AR')
    },
    {
      icon: MessageSquare,
      label: 'Conversaciones',
      value: '2.5K'
    },
    {
      icon: TrendingUp,
      label: 'Crecimiento',
      value: '+15%'
    },
    {
      icon: Activity,
      label: 'Actividad',
      value: '89%'
    }
  ];

  return (
    <div className="fixed top-24 right-4 space-y-4 w-64 hidden lg:block">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-lg p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00FF9C]/20">
              <metric.icon className="w-5 h-5 text-[#00FF9C]" />
            </div>
            <div>
              <p className="text-sm text-dark-400">{metric.label}</p>
              <p className="text-lg font-semibold">{metric.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};