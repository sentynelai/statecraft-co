import React from 'react';
import { motion } from 'framer-motion';

export const ModalOverlay: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-950/70 backdrop-blur-sm z-30"
    />
  );
};