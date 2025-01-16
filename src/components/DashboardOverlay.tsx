import React from 'react';
import { useStoreData } from '../hooks/useStoreData';
import { MetricsGrid } from './MetricsGrid';
import { SocialOverview } from './SocialOverview';
import { RegionalStats } from './RegionalStats';

export const DashboardOverlay: React.FC = () => {
  const { stores, isLoading } = useStoreData();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="h-48 bg-dark-800/50 rounded-xl" />
          <div className="h-48 bg-dark-800/50 rounded-xl" />
          <div className="h-48 bg-dark-800/50 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 overflow-y-auto pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
        <MetricsGrid stores={stores} />
        <SocialOverview stores={stores} />
        <RegionalStats stores={stores} />
      </div>
    </div>
  );
};