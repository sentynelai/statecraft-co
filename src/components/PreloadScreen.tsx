import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Map, Wifi, CheckCircle2, X } from 'lucide-react';
import { Logo } from './Logo';

interface PreloadScreenProps {
  onDemoConsent: (useDemo: boolean) => void;
}

export const PreloadScreen: React.FC<PreloadScreenProps> = ({ onDemoConsent }) => {
  const [loadingStates, setLoadingStates] = useState({
    sheets: 'loading',
    map: 'loading',
    assistant: 'loading'
  });

  useEffect(() => {
    // Simulate loading states
    const timer1 = setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, sheets: 'success' }));
    }, 1000);

    const timer2 = setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, map: 'success' }));
    }, 2000);

    const timer3 = setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, assistant: 'success' }));
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Auto-redirect when all services are loaded
  useEffect(() => {
    const allLoaded = Object.values(loadingStates).every(state => state === 'success');
    if (allLoaded) {
      // Small delay before redirect for smooth transition
      const redirectTimer = setTimeout(() => {
        onDemoConsent(true);
      }, 500);
      return () => clearTimeout(redirectTimer);
    }
  }, [loadingStates, onDemoConsent]);

  const services = [
    { name: 'Base de Datos Provincial', icon: Database, state: loadingStates.sheets },
    { name: 'Mapa Interactivo', icon: Map, state: loadingStates.map },
    { name: 'Asistente IA', icon: Wifi, state: loadingStates.assistant }
  ];

  return (
    <div className="fixed inset-0 bg-dark-950 flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold mb-2">Bienvenido a Statecraft</h1>
          <p className="text-dark-400">Provincia de Entre Ríos</p>
        </motion.div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="glass rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <service.icon className="w-5 h-5 text-[#00FF9C]" />
                <span>{service.name}</span>
              </div>
              {service.state === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-[#00FF9C]" />
              ) : service.state === 'error' ? (
                <X className="w-5 h-5 text-red-500" />
              ) : (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-[#00FF9C] border-t-transparent rounded-full"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};