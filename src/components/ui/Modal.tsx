import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ModalProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, icon: Icon, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-shrink-0 w-full glass rounded-xl p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-[#00FF9C]" />
        <h2 className="font-medium">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
};