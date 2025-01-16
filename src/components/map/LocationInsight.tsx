import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import type { SheetData } from '../../lib/types/sheets';

interface LocationInsightProps {
  location: SheetData;
}

export const LocationInsight: React.FC<LocationInsightProps> = ({ location }) => {
  const insights = [
    { title: 'Análisis', content: location.analisis },
    { title: 'Recomendaciones', content: location.recomendaciones },
    { title: 'Noticias', content: location.conclusiones }
  ];

  return (
    <>
      {insights.map((insight, index) => (
        <motion.div
          key={insight.title}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-dark-950/90 rounded-xl border border-dark-800/50 backdrop-blur-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#00FF9C]/20">
              <FileText className="w-5 h-5 text-[#00FF9C]" />
            </div>
            <h3 className="text-lg font-semibold">{insight.title}</h3>
          </div>
          
          <p className="text-dark-400 whitespace-pre-line">
            {insight.content || 'No hay información disponible.'}
          </p>
        </motion.div>
      ))}
    </>
  );
};