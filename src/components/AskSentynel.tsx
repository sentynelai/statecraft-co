import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const AskSentynel: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement OpenAI integration
    console.log('Message:', message);
    setMessage('');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="glass rounded-xl p-4 flex gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Sentynel anything..."
            className="flex-1 bg-dark-800/50 rounded-lg px-4 py-2 text-white placeholder-dark-400 border border-dark-700 focus:outline-none focus:border-accent-400"
          />
          <button
            type="submit"
            className="bg-accent-400 hover:bg-accent-500 text-white rounded-lg px-6 py-2 flex items-center gap-2 transition-colors"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}