import React from 'react';
import { motion } from 'framer-motion';

interface Topic {
  name: string;
  mentions: number;
  sentiment: number;
}

interface TopicsListProps {
  topics: Topic[];
}

export const TopicsList: React.FC<TopicsListProps> = ({ topics }) => {
  return (
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
  );
};