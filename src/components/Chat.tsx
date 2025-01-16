import React, { useState } from 'react';
import { Send, Loader } from 'lucide-react';

export const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      setMessages(prev => [...prev, { role: 'user', content: input }]);
      
      // Simulate API call - Replace with actual OpenAI API integration
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({ 
          role: 'assistant', 
          content: 'This is a simulated response. Please integrate with OpenAI API for actual functionality.' 
        }), 1500)
      );
      
      setMessages(prev => [...prev, response as { role: 'assistant', content: string }]);
      setInput('');
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass rounded-xl p-4 h-[400px] flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <div className="w-3 h-3 bg-[#00FF9C] rounded-full animate-pulse" />
          <div className="w-3 h-3 bg-[#00FF9C] rounded-full absolute top-0 animate-ping" />
        </div>
        <h2 className="text-lg font-semibold">Ask Sentynel</h2>
      </div>

      <div className="flex-1 overflow-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-dark-800 ml-auto max-w-[80%]'
                : 'bg-[#00FF9C]/10 max-w-[80%]'
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-[#00FF9C] p-3">
            <Loader className="w-4 h-4 animate-spin" />
            <span>Sentynel is thinking...</span>
          </div>
        )}
        {error && (
          <div className="text-red-400 p-3 bg-red-400/10 rounded-lg">
            {error}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-dark-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#00FF9C]"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="p-2 rounded-lg bg-[#00FF9C] text-dark-900 hover:bg-[#00FF9C]/90 transition-colors disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};