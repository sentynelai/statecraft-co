import React from 'react';
import { Facebook, MessageCircle, Users } from 'lucide-react';
import type { SheetData } from '../../lib/types/sheets';
import { motion } from 'framer-motion';

interface AudienceStatsProps {
  location: SheetData;
}

export const AudienceStats: React.FC<AudienceStatsProps> = ({ location }) => {
  const platforms = [
    { 
      name: 'Meta', 
      value: [location.audienciaFbA, location.audienciaFbB],
      icon: Facebook,
      color: '#1877F2'
    },
    { 
      name: 'GMP', 
      value: location.audienciaGmp,
      icon: MessageCircle,
      color: '#00FF9C'
    },
    { 
      name: 'WhatsApp', 
      value: location.whatsapp,
      icon: Users,
      color: '#25D366'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-dark-400">Audiencia Digital</h3>
      <div className="grid grid-cols-2 gap-4">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            <div 
              className="p-1.5 rounded-lg"
              style={{ backgroundColor: `${platform.color}20` }}
            >
              <platform.icon 
                className="w-4 h-4"
                style={{ color: platform.color }}
              />
            </div>
            <div>
              <p className="text-xs text-dark-400">{platform.name}</p>
              <p className="text-sm font-medium">
                {Array.isArray(platform.value) 
                  ? `${platform.value[0].toLocaleString('es-AR')} - ${platform.value[1].toLocaleString('es-AR')}`
                  : platform.value.toLocaleString('es-AR')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};