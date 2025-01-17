import React from 'react';
import { Users, Facebook, MessageCircle, Chrome, Calendar, Newspaper, X } from 'lucide-react';
import { useProvincialData } from '../../hooks/useProvincialData';
import { useNewsData } from '../../hooks/useNewsData';
import { useEventsData } from '../../hooks/useEventsData';
import { calculateTotalPopulation, calculateAudienceTotals } from '../../lib/utils/calculations';
import { Modal } from '../ui/Modal';
import { ModalOverlay } from '../ui/ModalOverlay';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalStore } from '../../stores/modalStore';
import { EventCard } from './EventCard';
import { NewsCard } from './NewsCard';

export const InfoModals: React.FC = () => {
  const { data } = useProvincialData();
  const { news } = useNewsData();
  const { events } = useEventsData();
  const { closeAllModals, isOpen } = useModalStore();
  
  const totalPopulation = calculateTotalPopulation(data);
  const audienceTotals = calculateAudienceTotals(data);

  const modals = [
    {
      title: 'Demografía',
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00FF9C]/20">
              <Users className="w-5 h-5 text-[#00FF9C]" />
            </div>
            <div>
              <p className="text-sm text-dark-400">Población Total</p>
              <p className="text-lg font-semibold">{totalPopulation.toLocaleString('es-AR')}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-4">Audiencia Digital</h3>
            <div className="space-y-4">
              {[
                { name: 'Meta', icon: Facebook, color: '#1877F2', value: [audienceTotals.fbA, audienceTotals.fbB] },
                { name: 'Google', icon: Chrome, color: '#4285F4', value: audienceTotals.gmp },
                { name: 'WhatsApp', icon: MessageCircle, color: '#25D366', value: audienceTotals.whatsapp }
              ].map((platform) => (
                <div key={platform.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <platform.icon className="w-4 h-4" style={{ color: platform.color }} />
                      <span>{platform.name}</span>
                    </div>
                    <span>
                      {Array.isArray(platform.value) 
                        ? `${platform.value[0].toLocaleString()} - ${platform.value[1].toLocaleString()}`
                        : platform.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: platform.color }}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(Array.isArray(platform.value) 
                          ? (platform.value[0] + platform.value[1]) 
                          : platform.value) / audienceTotals.total * 100}%` 
                      }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Tendencias',
      icon: MessageCircle,
      content: (
        <div className="space-y-4">
          <p className="text-dark-400">
            Las publicaciones tratan sobre <strong>seguridad</strong>, <strong>salud pública</strong>, 
            <strong>eventos culturales</strong>, <strong>turismo</strong> y <strong>problemáticas 
            sociales y económicas</strong>, reflejando las principales preocupaciones e intereses 
            de la comunidad.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-dark-800/30 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Temas Principales</h4>
              <ul className="space-y-2 text-sm text-dark-400">
                <li>• Seguridad ciudadana</li>
                <li>• Desarrollo económico</li>
                <li>• Infraestructura urbana</li>
                <li>• Educación pública</li>
                <li>• Medio ambiente</li>
              </ul>
            </div>
            <div className="p-4 bg-dark-800/30 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Tendencias Emergentes</h4>
              <ul className="space-y-2 text-sm text-dark-400">
                <li>• Innovación tecnológica</li>
                <li>• Turismo sostenible</li>
                <li>• Cultura local</li>
                <li>• Deportes y recreación</li>
                <li>• Salud comunitaria</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Eventos',
      icon: Calendar,
      content: (
        <div className="space-y-4">
          {events && events.length > 0 ? (
            events.slice(0, 5).map((event, index) => (
              <EventCard key={index} event={event} index={index} />
            ))
          ) : (
            <p className="text-dark-400">No hay eventos disponibles en este momento.</p>
          )}
        </div>
      )
    },
    {
      title: 'Noticias',
      icon: Newspaper,
      content: (
        <div className="space-y-4">
          {news && news.length > 0 ? (
            news.slice(0, 5).map((item, index) => (
              <NewsCard key={index} news={item} index={index} />
            ))
          ) : (
            <p className="text-dark-400">No hay noticias disponibles en este momento.</p>
          )}
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <ModalOverlay />
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={closeAllModals}
            className="fixed top-6 right-4 z-50 px-4 py-2 bg-dark-950/90 rounded-lg backdrop-blur-sm hover:bg-dark-800/90 transition-colors flex items-center gap-2 border border-dark-800/50"
          >
            <X className="w-4 h-4" />
            <span className="text-sm">Cerrar Todo</span>
          </motion.button>
          <div className="fixed top-24 left-0 right-0 bottom-4 px-4 z-40 overflow-y-auto">
            <div className="max-w-7xl mx-auto pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modals.map((modal) => (
                  <Modal
                    key={modal.title}
                    title={modal.title}
                    icon={modal.icon}
                  >
                    {modal.content}
                  </Modal>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};