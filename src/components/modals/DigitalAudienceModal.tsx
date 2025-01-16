import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, MessageCircle, Users, X, Chrome } from 'lucide-react';
import { useProvincialData } from '../../hooks/useProvincialData';
import { calculateAudienceTotals } from '../../lib/utils/calculations';

interface DigitalAudienceModalProps {
  onClose: () => void;
  aiResponse?: string;
}

export const DigitalAudienceModal: React.FC<DigitalAudienceModalProps> = ({ onClose, aiResponse }) => {
  const { data } = useProvincialData();
  const audienceTotals = calculateAudienceTotals(data);

  const platforms = [
    {
      name: 'Facebook A',
      value: audienceTotals.fbA,
      icon: Facebook,
      color: '#1877F2',
      bgColor: 'bg-[#1877F2]/20',
      textColor: 'text-[#1877F2]',
      progress: (audienceTotals.fbA / audienceTotals.total) * 100
    },
    {
      name: 'Facebook B',
      value: audienceTotals.fbB,
      icon: Facebook,
      color: '#1877F2',
      bgColor: 'bg-[#1877F2]/20',
      textColor: 'text-[#1877F2]',
      progress: (audienceTotals.fbB / audienceTotals.total) * 100
    },
    {
      name: 'Google',
      value: audienceTotals.gmp,
      icon: Chrome,
      color: '#4285F4',
      bgColor: 'bg-[#4285F4]/20',
      textColor: 'text-[#4285F4]',
      progress: (audienceTotals.gmp / audienceTotals.total) * 100
    },
    {
      name: 'WhatsApp',
      value: audienceTotals.whatsapp,
      icon: MessageCircle,
      color: '#25D366',
      bgColor: 'bg-[#25D366]/20',
      textColor: 'text-[#25D366]',
      progress: (audienceTotals.whatsapp / audienceTotals.total) * 100
    }
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
        className="bg-dark-950/90 rounded-xl w-full max-w-4xl border border-dark-800/50 backdrop-blur-xl"
      >
        <div className="p-6 flex justify-between items-center border-b border-dark-800/50">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-[#00FF9C]" />
            <h2 className="text-2xl font-bold">Audiencia Digital</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-800/30 rounded-xl p-6 hover:bg-dark-800/40 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${platform.bgColor}`}>
                    <platform.icon 
                      className={`w-6 h-6 ${platform.textColor}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{platform.name}</h3>
                    <p className="text-dark-400">Audiencia Total</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-3xl font-bold">
                    {platform.value.toLocaleString('es-AR')}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-400">Alcance</span>
                      <span className={platform.textColor}>{platform.progress.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${platform.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: platform.color }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-[#00FF9C]/10 rounded-xl border border-[#00FF9C]/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-[#00FF9C]" />
                <span className="font-medium">Análisis de Audiencia</span>
              </div>
              <p className="text-dark-400">{aiResponse}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};