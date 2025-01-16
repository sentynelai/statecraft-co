import React, { useState, useRef, useEffect } from 'react';
import { Brain, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { getChatResponse } from '../lib/services/openai';
import { ChatMessage } from './chat/ChatMessage';
import { ChatInput } from './chat/ChatInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { selectedStore } = useStoreSelection();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (message: string) => {
    if (isLoading) return;

    const newMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const storeContext = selectedStore 
        ? `For Store #${selectedStore.id} with sales of $${(selectedStore.sales/1000000).toFixed(1)}M and ${selectedStore.customers} customers: ${message}`
        : message;

      const response = await getChatResponse(storeContext);
      
      if (response) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response,
          timestamp: new Date()
        }]);
      } else {
        setError('Lo siento, el servicio de IA no está disponible en este momento.');
      }
    } catch (error) {
      setError('Ocurrió un error al procesar tu mensaje. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {!isOpen ? (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 p-4 bg-[#00FF9C] rounded-full shadow-lg hover:bg-[#00FF9C]/90 transition-colors"
        >
          <Brain className="w-6 h-6 text-dark-950" />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-6 w-96 h-[500px] bg-dark-950/95 rounded-xl shadow-xl backdrop-blur-lg border border-dark-800/50 flex flex-col"
        >
          <div className="p-4 border-b border-dark-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-[#00FF9C] rounded-full"
              />
              <h3 className="font-medium">Sentynel AI</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-dark-800/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-dark-800/50 p-3 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin text-[#00FF9C]" />
                </div>
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};