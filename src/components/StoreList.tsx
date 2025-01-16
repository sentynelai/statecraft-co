import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { StoreData } from '../types';

interface StoreListProps {
  stores: StoreData[];
}

export const StoreList: React.FC<StoreListProps> = ({ stores }) => {
  const sortedStores = [...stores].sort((a, b) => b.sales - a.sales);

  return (
    <div className="divide-y divide-dark-800/50">
      {sortedStores.map((store) => (
        <div key={store.id} className="p-4 hover:bg-dark-800/20">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">Store #{store.id}</h3>
              <p className="text-sm text-dark-400">{store.region}</p>
            </div>
            <div className={`flex items-center gap-1 ${
              store.trend >= 0 ? 'text-[#00FF9C]' : 'text-red-400'
            }`}>
              {store.trend >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {store.trend >= 0 ? '+' : ''}{store.trend}%
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-dark-400">Sales</p>
              <p className="font-medium">${(store.sales / 1000000).toFixed(1)}M</p>
            </div>
            <div>
              <p className="text-dark-400">Customers</p>
              <p className="font-medium">{(store.customers / 1000).toFixed(1)}K</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};