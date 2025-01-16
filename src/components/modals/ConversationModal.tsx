import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Hash, Users, X, TrendingUp } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { TopicsList } from './TopicsList';
import { AIInsight } from './AIInsight';

interface ConversationModalProps {
  onClose: () => void;
  aiResponse?: string;
}

export const ConversationModal: React.FC<ConversationModalProps> = ({ onClose, aiResponse }) => {
  const metrics = [
    {
      title: 'Total Menciones',
      value: '39,700',
      icon: MessageSquare,
      trend: '+12.5%',
      trendLabel: 'vs. mes anterior',
      color: '#00FF9C'
    },
    {
      title: 'Temas Activos',
      value: '5',
      icon: Hash,
      trend: '+5.2%',
      trendLabel: 'nuevos temas',
      color: '#3B82F6'
    },
    {
      title: 'Participantes',
      value: '31,760',
      icon: Users,
      trend: '+18.7%',
      trendLabel: 'engagement',
      color: '#8B5CF6'
    }
  ];

  const topics = [
    { name: 'Educación', mentions: 11910, sentiment: 78 },
    { name: 'Salud', mentions: 9925, sentiment: 65 },
    { name: 'Transporte', mentions: 7940, sentiment: 45 },
    { name: 'Seguridad', mentions: 5955, sentiment: 52 },
    { name: 'Cultura', mentions: 3970, sentiment: 88 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark-950/90 rounded-xl w-full max-w-4xl border border-dark-800/50 backdrop-blur-xl max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 flex justify-between items-center border-b border-dark-800/50">
          <h2 className="text-2xl font-bold">Análisis de Conversaciones</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8 overflow-y-auto">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>

          {/* Topics List */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Temas Principales</h3>
            <TopicsList topics={topics} />
          </div>

          {/* AI Insight */}
          <AIInsight content={aiResponse} />
        </div>
      </motion.div>
    </motion.div>
  );
};