import React from 'react';
import { ShoppingBag, Users, TrendingUp, Activity } from 'lucide-react';
import { STORE_DATA } from '../data/stores';

export const StoreStats: React.FC = () => {
  const totalSales = STORE_DATA.reduce((acc, store) => acc + store.sales, 0);
  const totalCustomers = STORE_DATA.reduce((acc, store) => acc + store.customers, 0);
  const totalDigitalAudience = STORE_DATA.reduce((acc, store) => acc + store.digitalAudience, 0);
  const avgTrend = STORE_DATA.reduce((acc, store) => acc + store.trend, 0) / STORE_DATA.length;

  const stats = [
    {
      label: 'Total Sales',
      value: `$${(totalSales / 1000000).toFixed(1)}M`,
      icon: ShoppingBag,
      trend: '+12%',
      color: '#00FF9C'
    },
    {
      label: 'Customers',
      value: `${(totalCustomers / 1000).toFixed(1)}K`,
      icon: Users,
      trend: '+8%',
      color: '#00FF9C'
    },
    {
      label: 'Digital Audience',
      value: `${(totalDigitalAudience / 1000).toFixed(1)}K`,
      icon: TrendingUp,
      trend: '+15%',
      color: '#00FF9C'
    },
    {
      label: 'Growth Rate',
      value: `${avgTrend.toFixed(1)}%`,
      icon: Activity,
      trend: '+5%',
      color: '#00FF9C'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">Store Performance</h2>
      <div className="grid gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-dark-800/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm">{stat.label}</p>
                <p className="text-xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="bg-[#00FF9C]/20 p-3 rounded-lg">
                <stat.icon className="w-5 h-5 text-[#00FF9C]" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-[#00FF9C] text-sm">{stat.trend}</span>
              <span className="text-dark-400 text-sm ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};