import React from 'react';
import { BarChart3, Users, DollarSign, TrendingUp } from 'lucide-react';
import { STORE_DATA } from '../data/stores';

export const Metrics = () => {
  const totalSales = STORE_DATA.reduce((acc, store) => acc + store.sales, 0);
  const totalCustomers = STORE_DATA.reduce((acc, store) => acc + store.customers, 0);
  const totalDigitalAudience = STORE_DATA.reduce((acc, store) => acc + store.digitalAudience, 0);

  const stats = [
    {
      label: 'Total Sales',
      value: `$${(totalSales / 1000000).toFixed(1)}M`,
      change: '+12%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      label: 'Customers',
      value: totalCustomers.toLocaleString(),
      change: '+8%',
      icon: Users,
      trend: 'up',
    },
    {
      label: 'Digital Audience',
      value: totalDigitalAudience.toLocaleString(),
      change: '+15%',
      icon: TrendingUp,
      trend: 'up',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <div className="bg-dark-800/50 p-3 rounded-lg">
              <stat.icon className="w-6 h-6 text-accent-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-400">{stat.change}</span>
            <span className="text-dark-400 text-sm ml-2">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};