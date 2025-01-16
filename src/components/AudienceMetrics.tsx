import React from 'react';
import { Users, Radio, TrendingUp, ArrowRight, X } from 'lucide-react';
import { useStoreData } from '../hooks/useStoreData';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { motion } from 'framer-motion';

export const AudienceMetrics: React.FC = () => {
  const { stores } = useStoreData();
  const { selectedStore, setSelectedStore } = useStoreSelection();

  if (!selectedStore) return null;

  const socialReach = Object.values(selectedStore.socialMedia).reduce((a, b) => a + b, 0);
  const metrics = {
    sales: selectedStore.sales,
    customers: selectedStore.customers,
    socialReach,
    trend: selectedStore.trend
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="fixed left-4 top-24 w-64 bg-dark-950/90 backdrop-blur-lg rounded-xl p-4 border border-dark-800/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#00FF9C]">Store #{selectedStore.id}</h3>
        <button
          onClick={() => setSelectedStore(null)}
          className="p-1 hover:bg-dark-800/50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {[
          { label: 'Sales', value: `$${(metrics.sales / 1000000).toFixed(1)}M`, icon: Users, color: '[#00FF9C]' },
          { label: 'Customers', value: `${(metrics.customers / 1000).toFixed(1)}K`, icon: Radio, color: 'blue-500' },
          { label: 'Growth', value: `${metrics.trend >= 0 ? '+' : ''}${metrics.trend}%`, icon: TrendingUp, color: metrics.trend >= 0 ? '[#00FF9C]' : 'red-400' },
          { label: 'Social', value: `${(metrics.socialReach / 1000).toFixed(1)}K`, icon: ArrowRight, color: 'orange-500' }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between bg-dark-800/30 rounded-lg p-2"
          >
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg bg-${item.color}/20`}>
                <item.icon className={`w-3.5 h-3.5 text-${item.color}`} />
              </div>
              <span className="text-xs">{item.label}</span>
            </div>
            <span className={`text-sm font-medium ${item.label === 'Growth' ? `text-${item.color}` : ''}`}>
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-4 p-3 bg-[#00FF9C]/5 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-xs text-[#00FF9C] mb-2">Performance Score</div>
        <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#00FF9C] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(metrics.trend + 100) / 2}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};