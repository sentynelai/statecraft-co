import React from 'react';
import { motion } from 'framer-motion';
import { formatTimestamp } from '../../lib/utils/dateUtils';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, timestamp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          role === 'user'
            ? 'bg-[#00FF9C] text-dark-950'
            : 'bg-dark-800/50'
        }`}
      >
        {content}
        <div className="text-xs opacity-50 mt-1">
          {formatTimestamp(timestamp)}
        </div>
      </div>
    </motion.div>
  );
};