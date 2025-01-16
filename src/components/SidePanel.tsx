import React, { useState } from 'react';
import { useStoreData } from '../hooks/useStoreData';
import { StoreList } from './StoreList';
import { SocialStats } from './SocialStats';

export const SidePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stores' | 'social'>('stores');
  const { stores, isLoading } = useStoreData();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00FF9C]"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-dark-800/50">
        <button
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'stores'
              ? 'text-[#00FF9C] border-b-2 border-[#00FF9C]'
              : 'text-dark-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('stores')}
        >
          Stores
        </button>
        <button
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'social'
              ? 'text-[#00FF9C] border-b-2 border-[#00FF9C]'
              : 'text-dark-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('social')}
        >
          Social Media
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'stores' ? (
          <StoreList stores={stores || []} />
        ) : (
          <SocialStats stores={stores || []} />
        )}
      </div>
    </div>
  );
};