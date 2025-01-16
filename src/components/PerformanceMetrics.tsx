import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { STORE_DATA } from '../data/stores';

export const PerformanceMetrics: React.FC = () => {
  const topStores = [...STORE_DATA]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Top Performing Stores</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {topStores.map((store) => (
          <div key={store.id} className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">Store #{store.id}</p>
                <p className="text-lg font-semibold mt-1">
                  ${(store.sales / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className={`flex items-center ${
                store.trend > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {store.trend > 0 ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span className="text-sm ml-1">{Math.abs(store.trend)}%</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Customers</span>
                <span>{(store.customers / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-400">Digital</span>
                <span>{(store.digitalAudience / 1000).toFixed(1)}K</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}