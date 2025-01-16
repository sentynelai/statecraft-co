import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useProvincialData } from '../hooks/useProvincialData';

export const RefreshButton: React.FC = () => {
  const { mutate, isLoading } = useProvincialData();

  return (
    <button
      onClick={() => mutate()}
      disabled={isLoading}
      className="px-4 py-2 bg-[#00FF9C]/20 hover:bg-[#00FF9C]/30 text-[#00FF9C] rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
    >
      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
      <span>Actualizar DS</span>
    </button>
  );
};