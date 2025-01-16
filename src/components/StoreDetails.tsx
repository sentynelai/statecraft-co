import React from 'react';
import { X, TrendingUp, TrendingDown, DollarSign, Users, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStoreSelection } from '../hooks/useStoreSelection';

export const StoreDetails: React.FC = () => {
  const { selectedStore, setSelectedStore } = useStoreSelection();

  if (!selectedStore) return null;

  const metrics = [
    {
      label: 'Sales',
      value: `$${(selectedStore.sales / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'text-[#00FF9C]',
      bgColor: 'bg-[#00FF9C]/20'
    },
    {
      label: 'Customers',
      value: `${(selectedStore.customers / 1000).toFixed(1)}K`,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20'
    },
    {
      label: 'Performance',
      value: `${(selectedStore.trend >= 0 ? '+' : '')}${selectedStore.trend}%`,
      icon: Activity,
      color: selectedStore.trend >= 0 ? 'text-green-400' : 'text-red-400',
      bgColor: selectedStore.trend >= 0 ? 'bg-green-400/20' : 'bg-red-400/20'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed top-24 right-4 w-80 bg-dark-950/90 backdrop-blur-lg rounded-xl border border-dark-800/50 overflow-hidden"
    >
      <div className="p-4 border-b border-dark-800/50 flex justify-between items-center">
        <h3 className="font-medium">Store #{selectedStore.id}</h3>
        <button
          onClick={() => setSelectedStore(null)}
          className="p-1.5 hover:bg-dark-800/50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div>
                <p className="text-sm text-dark-400">{metric.label}</p>
                <p className="text-lg font-medium">{metric.value}</p>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-3 bg-dark-800/50 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            {selectedStore.trend >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className="text-sm font-medium">Growth Trend</span>
          </div>
          <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.abs(selectedStore.trend)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${
                selectedStore.trend >= 0 ? 'bg-green-400' : 'bg-red-400'
              }`}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};