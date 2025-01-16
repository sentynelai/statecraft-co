import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventCardProps {
  content: string;
  index: number;
}

export const EventCard: React.FC<EventCardProps> = ({ content, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 bg-dark-800/30 rounded-lg hover:bg-dark-800/40 transition-all border border-dark-800/50"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-[#00FF9C]/20">
          <Calendar className="w-5 h-5 text-[#00FF9C]" />
        </div>
        <div className="space-y-2 flex-1">
          <p className="text-dark-200">{content}</p>
          <div className="flex items-center gap-4 text-sm text-dark-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Entre Ríos</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Próximamente</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};