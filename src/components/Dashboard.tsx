import React from 'react';
import { Map } from './Map';
import { Header } from './Header';
import { ChatAssistant } from './ChatAssistant';
import { motion, AnimatePresence } from 'framer-motion';
import { StatsOverlay } from './StatsOverlay';
import { InfoModals } from './modals/InfoModals';
import { useProvincialData } from '../hooks/useProvincialData';
import { useModalStore } from '../stores/modalStore';
import { LoadingScreen } from './LoadingScreen';

export const Dashboard: React.FC = () => {
  const [activeOverlay, setActiveOverlay] = React.useState<string | null>(null);
  const { data: provincialData, isLoading } = useProvincialData();
  const { isOpen } = useModalStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-screen bg-dark-950 overflow-hidden relative">
      {/* Fullscreen Map */}
      <div className="absolute inset-0">
        <Map />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* Info Modals */}
      <AnimatePresence>
        {isOpen && provincialData.length > 0 && (
          <div className="relative z-20">
            <InfoModals />
          </div>
        )}
      </AnimatePresence>

      {/* Stats Overlay */}
      <AnimatePresence>
        {activeOverlay && (
          <StatsOverlay 
            type={activeOverlay as 'population' | 'digital' | 'conversations'} 
            onClose={() => setActiveOverlay(null)} 
          />
        )}
      </AnimatePresence>

      {/* Chat Assistant */}
      <ChatAssistant />
    </div>
  );
};