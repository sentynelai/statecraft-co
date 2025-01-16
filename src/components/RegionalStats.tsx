import React from 'react';
import { MapPin } from 'lucide-react';
import type { StoreData } from '../types';

interface RegionalStatsProps {
  stores: StoreData[];
}

export const RegionalStats: React.FC<RegionalStatsProps> = ({ stores }) => {
  const regions = stores.reduce((acc, store) => {
    if (!acc[store.region]) {
      acc[store.region] = {
        sales: 0,
        stores: 0
      };
    }
    acc[store.region].sales += store.sales;
    acc[store.region].stores += 1;
    return acc;
  }, {} as Record<string, { sales: number; stores: number }>);

  return (
    <div className="glass rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Regional Performance</h2>
      <div className="space-y-4">
        {Object.entries(regions).map(([region, data]) => (
          <div key={region} className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00FF9C]/20">
                <MapPin className="w-5 h-5 text-[#00FF9C]" />
              </div>
              <div>
                <p className="text-sm text-dark-400">{region}</p>
                <p className="text-lg font-semibold">${(data.sales / 1000000).toFixed(1)}M</p>
              </div>
            </div>
            <div className="text-sm text-dark-400">{data.stores} stores</div>
          </div>
        ))}
      </div>
    </div>
  );
};