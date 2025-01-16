import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-dark-800/50">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-dark-800/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#00FF9C]"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="p-2 bg-[#00FF9C] rounded-lg hover:bg-[#00FF9C]/90 transition-colors disabled:opacity-50"
        >
          <Send className="w-5 h-5 text-dark-950" />
        </button>
      </div>
    </form>
  );
};