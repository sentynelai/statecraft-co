import React from 'react';
import { STORE_DATA } from '../data/stores';

export const RegionStats: React.FC = () => {
  const regionData = STORE_DATA.reduce((acc, store) => {
    if (!acc[store.region]) {
      acc[store.region] = {
        sales: 0,
        stores: 0,
      };
    }
    acc[store.region].sales += store.sales;
    acc[store.region].stores += 1;
    return acc;
  }, {} as Record<string, { sales: number; stores: number }>);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Regional Overview</h2>
      <div className="space-y-4">
        {Object.entries(regionData).map(([region, data]) => (
          <div key={region} className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{region}</p>
              <p className="text-lg font-semibold">${(data.sales / 1000000).toFixed(1)}M</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Stores</p>
              <p className="text-lg font-semibold">{data.stores}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}