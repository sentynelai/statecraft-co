import React from 'react';
import { Users, Facebook, Instagram, Twitter, Video } from 'lucide-react';
import { useStoreData } from '../hooks/useStoreData';

export const PopulationStats: React.FC = () => {
  const { stores, isLoading, isError } = useStoreData();

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (isError || !stores) {
    return <div className="text-red-500">Failed to load data</div>;
  }

  const sortedStores = [...stores].sort((a, b) => {
    const totalA = Object.values(a.socialMedia).reduce((sum, val) => sum + val, 0);
    const totalB = Object.values(b.socialMedia).reduce((sum, val) => sum + val, 0);
    return totalB - totalA;
  });

  const maxSocialReach = Math.max(...sortedStores.map(store => 
    Object.values(store.socialMedia).reduce((sum, val) => sum + val, 0)
  ));

  return (
    <div className="space-y-4">
      {sortedStores.slice(0, 10).map((store) => {
        const totalReach = Object.values(store.socialMedia).reduce((sum, val) => sum + val, 0);
        const percentage = (totalReach / maxSocialReach) * 100;

        return (
          <div key={store.id} className="glass rounded-lg p-4 backdrop-blur-md bg-dark-950/20 border border-dark-800/20">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-dark-400">Store #{store.id}</span>
              <span className="text-sm font-medium">
                {(totalReach / 1000).toFixed(1)}K Total Reach
              </span>
            </div>

            {/* Social Media Stats */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-[#1877F2]" />
                <span className="text-sm">{(store.socialMedia.facebook / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#E4405F]" />
                <span className="text-sm">{(store.socialMedia.instagram / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex items-center gap-2">
                <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                <span className="text-sm">{(store.socialMedia.twitter / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#00F2EA]" />
                <span className="text-sm">{(store.socialMedia.tiktok / 1000).toFixed(1)}K</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00FF9C] rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${percentage}%`,
                  boxShadow: '0 0 10px rgba(0, 255, 156, 0.5)'
                }} 
              />
            </div>

            {/* Additional Metrics */}
            <div className="flex justify-between text-sm text-dark-400 mt-2">
              <span>Growth: <span className={store.trend >= 0 ? 'text-[#00FF9C]' : 'text-red-400'}>
                {store.trend >= 0 ? '+' : ''}{store.trend}%
              </span></span>
              <span>Sales: ${(store.sales / 1000000).toFixed(1)}M</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};