import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
import { Logo } from './Logo';
import { HeaderMetrics } from './HeaderMetrics';
import { RefreshButton } from './RefreshButton';
import { useModalStore } from '../stores/modalStore';

export const Header: React.FC = () => {
  const { openModals } = useModalStore();

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <button
            onClick={openModals}
            className="px-4 py-2 bg-[#00FF9C]/20 hover:bg-[#00FF9C]/30 text-[#00FF9C] rounded-lg flex items-center gap-2 transition-colors"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Métricas principales</span>
          </button>
          <RefreshButton />
        </div>
        <HeaderMetrics />
      </div>
    </motion.div>
  );
};