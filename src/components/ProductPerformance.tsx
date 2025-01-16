import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { useStoreSelection } from '../hooks/useStoreSelection';

const products = [
  { name: 'CV ACAI ENERGIZE PWR', current: 2687687, target: 3142264 },
  { name: 'CV FIT & WELLNESS', current: 2458583, target: 2947759 },
  { name: 'CV ENERGY BOOST', current: 1667353, target: 2248490 },
  { name: 'CV PASSION BLISS', current: 1619596, target: 1982840 },
  { name: 'CV CHIA SUPREMACY', current: 1415081, target: 1598339 },
  { name: 'CV EXOTIC INDULGENCE', current: 203795, target: 337743 }
];

export const ProductPerformance: React.FC = () => {
  const { selectedStore } = useStoreSelection();

  return (
    <AnimatePresence>
      {selectedStore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed right-4 top-24 w-96 bg-dark-950/90 backdrop-blur-lg rounded-xl border border-dark-800/50 p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-[#00FF9C]" />
            <h2 className="text-lg font-semibold">Store Products</h2>
          </div>

          <div className="space-y-4">
            {products.map((product, index) => {
              const progress = (product.current / product.target) * 100;
              
              return (
                <motion.div
                  key={product.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-200">{product.name}</span>
                    <span className="text-[#00FF9C]">
                      ${(product.current / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  
                  <div className="relative h-2 bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute h-full bg-[#00FF9C]/50 rounded-full"
                    />
                    <div 
                      className="absolute h-full bg-[#00FF9C] rounded-full"
                      style={{ width: `${(product.current / product.target) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-dark-400">
                    <span>Current: ${(product.current / 1000000).toFixed(2)}M</span>
                    <span>Target: ${(product.target / 1000000).toFixed(2)}M</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};