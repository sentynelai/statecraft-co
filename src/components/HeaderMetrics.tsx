import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PopulationMetric } from './metrics/PopulationMetric';
import { ConversationModal } from './modals/ConversationModal';
import { DigitalAudienceModal } from './modals/DigitalAudienceModal';
import { PopulationStatsModal } from './modals/PopulationStatsModal';
import { getChatResponse } from '../lib/services/openai';

type ModalType = 'conversations' | 'digital' | 'population' | null;

export const HeaderMetrics: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [aiResponse, setAIResponse] = useState<string | null>(null);

  const handleMetricClick = async (type: ModalType) => {
    if (!type) return;
    
    setActiveModal(type);
    
    let prompt = '';
    switch (type) {
      case 'conversations':
        prompt = 'En una sola oración, resume el análisis de conversaciones en Entre Ríos.';
        break;
      case 'digital':
        prompt = 'En una sola oración, resume el alcance digital en Entre Ríos.';
        break;
      case 'population':
        prompt = 'En una sola oración, resume la distribución poblacional de Entre Ríos.';
        break;
    }

    try {
      const response = await getChatResponse(prompt);
      setAIResponse(response);
    } catch (error) {
      console.error('Error getting AI response:', error);
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setAIResponse(null);
  };

  return (
    <>
      <div className="flex items-center gap-8">
        {/* Population Metric */}
        <PopulationMetric 
          onClick={() => handleMetricClick('population')} 
        />

        {/* Other metrics remain the same... */}
      </div>

      <AnimatePresence mode="wait">
        {activeModal === 'conversations' && (
          <ConversationModal onClose={handleCloseModal} aiResponse={aiResponse} />
        )}
        {activeModal === 'digital' && (
          <DigitalAudienceModal onClose={handleCloseModal} aiResponse={aiResponse} />
        )}
        {activeModal === 'population' && (
          <PopulationStatsModal onClose={handleCloseModal} aiResponse={aiResponse} />
        )}
      </AnimatePresence>
    </>
  );
};