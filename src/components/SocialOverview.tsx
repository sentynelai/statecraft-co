import React from 'react';
import { Facebook, Instagram, Twitter, TrendingUp } from 'lucide-react';
import type { StoreData } from '../types';

interface SocialOverviewProps {
  stores: StoreData[];
}

export const SocialOverview: React.FC<SocialOverviewProps> = ({ stores }) => {
  const totalSocial = stores.reduce((acc, store) => ({
    facebook: acc.facebook + store.socialMedia.facebook,
    instagram: acc.instagram + store.socialMedia.instagram,
    twitter: acc.twitter + store.socialMedia.twitter,
    tiktok: acc.tiktok + store.socialMedia.tiktok
  }), {
    facebook: 0,
    instagram: 0,
    twitter: 0,
    tiktok: 0
  });

  const platforms = [
    { name: 'Facebook', value: totalSocial.facebook, icon: Facebook, color: '#1877F2' },
    { name: 'Instagram', value: totalSocial.instagram, icon: Instagram, color: '#E4405F' },
    { name: 'Twitter', value: totalSocial.twitter, icon: Twitter, color: '#1DA1F2' },
    { name: 'TikTok', value: totalSocial.tiktok, icon: TrendingUp, color: '#000000' }
  ];

  return (
    <div className="glass rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Social Media Overview</h2>
      <div className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${platform.color}20` }}>
                <platform.icon className="w-5 h-5" style={{ color: platform.color }} />
              </div>
              <div>
                <p className="text-sm text-dark-400">{platform.name}</p>
                <p className="text-lg font-semibold">
                  {(platform.value / 1000).toFixed(1)}K
                </p>
              </div>
            </div>
            <div className="text-sm text-green-400">+12%</div>
          </div>
        ))}
      </div>
    </div>
  );
};