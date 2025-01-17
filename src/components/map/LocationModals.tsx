import React from 'react';
import { motion } from 'framer-motion';
import { Users, X } from 'lucide-react';
import type { SheetData } from '../../types/sheets';
import { AudienceStats } from './AudienceStats';
import { LocationInsight } from './LocationInsight';
import { InfluencersModal } from './InfluencersModal';
import { useNewsData } from '../../hooks/useNewsData';
import { useEventsData } from '../../hooks/useEventsData';
import { NewsCard } from '../modals/NewsCard';
import { EventCard } from '../modals/EventCard';

interface LocationModalsProps {
  location: SheetData;
  onClose: () => void;
}

export const LocationModals: React.FC<LocationModalsProps> = ({ location, onClose }) => {
  const { news } = useNewsData(location.departamento);
  const { events } = useEventsData(location.departamento);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-24 overflow-y-auto"
    >
      <div className="w-full max-w-4xl space-y-4">
        {/* Demographics and Digital Audience */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-dark-950/90 rounded-xl border border-dark-800/50 backdrop-blur-xl"
        >
          <div className="p-6 flex justify-between items-center border-b border-dark-800/50">
            <h2 className="text-2xl font-bold">{location.departamento}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-dark-800/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00FF9C]/20">
                <Users className="w-5 h-5 text-[#00FF9C]" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Población</p>
                <p className="text-lg font-semibold">{location.poblacion.toLocaleString('es-AR')}</p>
              </div>
            </div>
            <AudienceStats location={location} />
          </div>
        </motion.div>

        {/* Analysis and Recommendations */}
        <LocationInsight location={location} />

        {/* Events Section */}
        {events && events.length > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-dark-950/90 rounded-xl border border-dark-800/50 backdrop-blur-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Eventos</h3>
            <div className="space-y-4">
              {events.slice(0, 5).map((event, index) => (
                <EventCard key={index} event={event} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* News Section */}
        {news && news.length > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-dark-950/90 rounded-xl border border-dark-800/50 backdrop-blur-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Noticias</h3>
            <div className="space-y-4">
              {news.slice(0, 5).map((item, index) => (
                <NewsCard key={index} news={item} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Influencers Section */}
        <div className="px-6 pb-6">
          <InfluencersModal departamento={location.departamento} />
        </div>
      </div>
    </motion.div>
  );
};