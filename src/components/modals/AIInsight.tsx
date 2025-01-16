import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface AIInsightProps {
  content?: string;
}

export const AIInsight: React.FC<AIInsightProps> = ({ content }) => {
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-4 bg-dark-800/30 rounded-lg"
    >
      <div className="flex items-center gap-2 mb-2">
        <Brain className="w-5 h-5 text-[#00FF9C]" />
        <span className="text-sm font-medium">Insight de Sentynel</span>
      </div>
      <p className="text-sm text-dark-400">{content}</p>
    </motion.div>
  );
};