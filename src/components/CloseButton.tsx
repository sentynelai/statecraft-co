import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModalStore } from '../stores/modalStore';

export const CloseButton: React.FC = () => {
  const { closeAllModals } = useModalStore();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={closeAllModals}
      className="fixed top-28 right-8 z-50 px-4 py-2 bg-dark-900/90 rounded-lg backdrop-blur-sm hover:bg-dark-800/90 transition-colors flex items-center gap-2 border border-dark-800/50"
    >
      <X className="w-4 h-4" />
      <span className="text-sm">Cerrar Todo</span>
    </motion.button>
  );
};