import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const AskSentinel: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user', content: input }
    ];
    setMessages(newMessages);
    setInput('');

    // TODO: Implement OpenAI API call here
    // For now, we'll just add a mock response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { 
          role: 'assistant', 
          content: 'I am Sentinel, your AI assistant. I\'m here to help analyze store data and provide insights. How can I assist you today?' 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-0 right-0 w-96 m-6">
      <div className="glass rounded-xl overflow-hidden">
        <div className="p-4 border-b border-dark-800">
          <h2 className="text-lg font-semibold">Ask Sentinel</h2>
        </div>
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-accent-400 text-dark-950'
                    : 'bg-dark-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t border-dark-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-dark-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-accent-400"
            />
            <button
              type="submit"
              className="p-2 bg-accent-400 rounded-lg hover:bg-accent-500 transition-colors"
            >
              <Send className="h-5 w-5 text-dark-950" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};