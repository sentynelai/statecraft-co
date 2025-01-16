import React from 'react';
import { Newspaper, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface NewsCardProps {
  content: string;
  index: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({ content, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group p-4 bg-dark-800/30 rounded-lg hover:bg-dark-800/40 transition-all border border-dark-800/50"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-purple-500/20">
          <Newspaper className="w-5 h-5 text-purple-500" />
        </div>
        <div className="space-y-2 flex-1">
          <p className="text-dark-200">{content}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-dark-400">Fuente: Gobierno de Entre Ríos</span>
            <div className="flex items-center gap-1 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm">Leer más</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};