import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendLabel: string;
  color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  color
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800/30 rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
          <p className="text-sm text-dark-400">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <TrendingUp className="w-4 h-4" style={{ color }} />
        <span style={{ color }}>{trend}</span>
        <span className="text-dark-400">{trendLabel}</span>
      </div>
    </motion.div>
  );
};