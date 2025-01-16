import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import { Logo } from './Logo';
import { useProvincialData } from '../hooks/useProvincialData';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const { mutate } = useProvincialData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '0000') {
      try {
        // Trigger data fetch before login
        await mutate();
        onLogin();
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-dark-950/50 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9C]/20 via-dark-950/50 to-purple-500/20" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="glass rounded-xl p-8 border border-dark-800/50">
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

          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-lg bg-[#00FF9C]/20">
              <Lock className="w-6 h-6 text-[#00FF9C]" />
            </div>
            <h2 className="text-2xl font-bold">Acceso Restringido</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-dark-400 mb-2">
                Código de Acceso
              </label>
              <input
                type="password"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00FF9C] transition-colors"
                placeholder="Ingrese el código"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm"
                >
                  <X className="w-4 h-4" />
                  <span>Código incorrecto o error de conexión. Intente nuevamente.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full bg-[#00FF9C] text-dark-950 rounded-lg px-4 py-3 font-medium hover:bg-[#00FF9C]/90 transition-colors"
            >
              Ingresar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};