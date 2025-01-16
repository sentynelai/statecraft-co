import React from 'react';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-dark-950">
      <motion.div 
        className="relative mb-8"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Brain className="w-16 h-16 text-[#00FF9C]" />
        <motion.div 
          className="absolute -top-2 -right-2 w-4 h-4 bg-[#00FF9C] rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold mb-2">Cargando Datos</h1>
        <p className="text-dark-400 text-center">
          Conectando con la base de datos provincial...
          <br />
          <span className="text-sm">Esto puede tomar unos segundos</span>
        </p>
      </motion.div>

      <motion.div
        className="mt-8 h-2 w-48 bg-dark-800 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="h-full bg-[#00FF9C]"
          animate={{ 
            x: ['-100%', '100%'],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{ width: '50%' }}
        />
      </motion.div>
    </div>
  );
};