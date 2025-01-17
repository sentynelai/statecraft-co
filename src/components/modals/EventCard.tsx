import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { EventItem } from '../../lib/services/eventsService';

interface EventCardProps {
  event: EventItem;
  index: number;
}

export const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group p-4 bg-dark-800/30 rounded-lg hover:bg-dark-800/40 transition-all border border-dark-800/50"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-[#00FF9C]/20">
          <Calendar className="w-5 h-5 text-[#00FF9C]" />
        </div>
        <div className="space-y-2 flex-1">
          <h3 className="font-medium">{event.evento}</h3>
          <div className="flex items-center justify-between text-sm">
            <span className="text-dark-400">{event.departamento}</span>
            {event.enlace && (
              <a
                href={event.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#00FF9C] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="text-sm">Más información</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};