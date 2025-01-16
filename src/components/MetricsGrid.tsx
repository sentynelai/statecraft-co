import React from 'react';
import { DollarSign, Users, TrendingUp } from 'lucide-react';
import type { StoreData } from '../types';

interface MetricsGridProps {
  stores: StoreData[];
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ stores }) => {
  const totalSales = stores.reduce((acc, store) => acc + store.sales, 0);
  const totalCustomers = stores.reduce((acc, store) => acc + store.customers, 0);
  const avgTrend = stores.reduce((acc, store) => acc + store.trend, 0) / stores.length;

  const metrics = [
    {
      label: 'Total Sales',
      value: `$${(totalSales / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      trend: '+12%'
    },
    {
      label: 'Total Customers',
      value: `${(totalCustomers / 1000).toFixed(1)}K`,
      icon: Users,
      trend: '+8%'
    },
    {
      label: 'Average Growth',
      value: `${avgTrend.toFixed(1)}%`,
      icon: TrendingUp,
      trend: '+15%'
    }
  ];

  return (
    <div className="glass rounded-xl p-4">
      <div className="grid gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00FF9C]/20">
                <metric.icon className="w-5 h-5 text-[#00FF9C]" />
              </div>
              <div>
                <p className="text-sm text-dark-400">{metric.label}</p>
                <p className="text-lg font-semibold">{metric.value}</p>
              </div>
            </div>
            <div className="text-sm text-[#00FF9C]">{metric.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
};