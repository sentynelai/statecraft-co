import React from 'react';
import { MessageSquare, TrendingUp, Hash, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const ConversationStats: React.FC = () => {
  const topics = [
    { name: 'Educación', mentions: 12500, sentiment: 78 },
    { name: 'Salud', mentions: 9800, sentiment: 65 },
    { name: 'Transporte', mentions: 7200, sentiment: 45 },
    { name: 'Seguridad', mentions: 6500, sentiment: 52 },
    { name: 'Cultura', mentions: 5900, sentiment: 88 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#00FF9C]/20">
              <MessageSquare className="w-5 h-5 text-[#00FF9C]" />
            </div>
            <div>
              <p className="text-sm text-dark-400">Total Menciones</p>
              <p className="text-2xl font-bold">41.9K</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-[#00FF9C]" />
            <span className="text-[#00FF9C]">+12.5%</span>
            <span className="text-dark-400">vs. mes anterior</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Hash className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-dark-400">Temas Activos</p>
              <p className="text-2xl font-bold">15</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="text-blue-500">+5.2%</span>
            <span className="text-dark-400">nuevos temas</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-dark-400">Participantes</p>
              <p className="text-2xl font-bold">8.2K</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <span className="text-purple-500">+18.7%</span>
            <span className="text-dark-400">engagement</span>
          </div>
        </motion.div>
      </div>

      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">Temas Principales</h3>
        <div className="space-y-6">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{topic.name}</span>
                <span className="text-sm text-dark-400">
                  {topic.mentions.toLocaleString()} menciones
                </span>
              </div>
              <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${topic.sentiment}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[#00FF9C] rounded-full"
                />
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-dark-400">Sentimiento</span>
                <span className="text-[#00FF9C]">{topic.sentiment}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};