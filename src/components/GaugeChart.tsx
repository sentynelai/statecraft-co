import React from 'react';
import { motion } from 'framer-motion';

interface GaugeChartProps {
  value: number;
  label: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ 
  value, 
  label, 
  color = '#00FF9C',
  size = 'md'
}) => {
  const sizes = {
    sm: 60,
    md: 80,
    lg: 100
  };

  const diameter = sizes[size];
  const strokeWidth = size === 'sm' ? 6 : 8;
  const radius = (diameter - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (100 - value) / 100 * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: diameter, height: diameter }}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-dark-800"
          />
          <motion.circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progress }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">{value}%</span>
        </div>
      </div>
      <span className="mt-2 text-xs text-dark-400">{label}</span>
    </div>
  );
};