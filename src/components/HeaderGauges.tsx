import React from 'react';
import { DollarSign, Zap, Share2 } from 'lucide-react';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { useStoreData } from '../hooks/useStoreData';
import { motion } from 'framer-motion';

export const HeaderGauges: React.FC = () => {
  const { stores, allStores } = useStoreData();
  const { selectedStore } = useStoreSelection();

  const calculateMetrics = () => {
    const storeList = selectedStore ? stores : allStores;
    const totalSales = storeList.reduce((acc, store) => acc + store.sales, 0);
    const avgTrend = storeList.reduce((acc, store) => acc + store.trend, 0) / storeList.length;
    const totalSocial = storeList.reduce((acc, store) => 
      acc + Object.values(store.socialMedia).reduce((a, b) => a + b, 0), 0
    );

    return {
      sales: totalSales,
      trend: avgTrend,
      social: totalSocial
    };
  };

  const metrics = calculateMetrics();
  
  const gauges = [
    {
      label: 'Sales',
      value: `$${(metrics.sales / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      gauge: selectedStore ? 
        (selectedStore.sales / Math.max(...allStores.map(s => s.sales))) * 100 : 100
    },
    {
      label: 'Velocity',
      value: `${metrics.trend.toFixed(1)}%`,
      icon: Zap,
      gauge: selectedStore ? 
        ((selectedStore.trend + 20) / 40) * 100 : 85
    },
    {
      label: 'Social',
      value: `${(metrics.social / 1000000).toFixed(1)}M`,
      icon: Share2,
      gauge: selectedStore ? 
        (Object.values(selectedStore.socialMedia).reduce((a, b) => a + b, 0) / 
        Math.max(...allStores.map(s => 
          Object.values(s.socialMedia).reduce((a, b) => a + b, 0)
        ))) * 100 : 92
    }
  ];

  return (
    <div className="flex items-center gap-4">
      {gauges.map((gauge, index) => (
        <motion.div
          key={gauge.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2"
        >
          <div className="relative h-10 w-10">
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-dark-800"
                strokeWidth="4"
                fill="none"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-[#00FF9C]"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - gauge.gauge / 100) }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <gauge.icon className="w-4 h-4 text-[#00FF9C]" />
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-dark-400">{gauge.label}</p>
            <p className="text-sm font-semibold">{gauge.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};