import React from 'react';
import { Facebook, Instagram, Twitter, Video, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const DigitalStats: React.FC = () => {
  const socialMetrics = [
    { platform: 'Facebook', reach: 2500000, growth: 15, icon: Facebook, color: '#1877F2' },
    { platform: 'Instagram', reach: 1800000, growth: 22, icon: Instagram, color: '#E4405F' },
    { platform: 'Twitter', reach: 950000, growth: 8, icon: Twitter, color: '#1DA1F2' },
    { platform: 'TikTok', reach: 3200000, growth: 45, icon: Video, color: '#00F2EA' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {socialMetrics.map((metric, index) => (
        <motion.div
          key={metric.platform}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: `${metric.color}20` }}
            >
              <metric.icon 
                className="w-6 h-6"
                style={{ color: metric.color }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{metric.platform}</h3>
              <p className="text-dark-400">Audiencia Total</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-3xl font-bold">
                {(metric.reach / 1000000).toFixed(1)}M
              </p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-[#00FF9C]" />
                <span className="text-[#00FF9C]">+{metric.growth}%</span>
                <span className="text-dark-400 text-sm">vs. mes anterior</span>
              </div>
            </div>

            <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(metric.reach / 3200000) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: metric.color }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};