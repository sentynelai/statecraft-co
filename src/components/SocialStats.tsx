import React from 'react';
import { Facebook, Instagram, Twitter, Video } from 'lucide-react';
import { StoreData } from '../types';

interface SocialStatsProps {
  stores: StoreData[];
}

export const SocialStats: React.FC<SocialStatsProps> = ({ stores }) => {
  const totalSocial = stores.reduce(
    (acc, store) => ({
      facebook: acc.facebook + store.socialMedia.facebook,
      instagram: acc.instagram + store.socialMedia.instagram,
      twitter: acc.twitter + store.socialMedia.twitter,
      tiktok: acc.tiktok + store.socialMedia.tiktok,
    }),
    { facebook: 0, instagram: 0, twitter: 0, tiktok: 0 }
  );

  const platforms = [
    { name: 'Facebook', value: totalSocial.facebook, icon: Facebook, color: '#1877F2' },
    { name: 'Instagram', value: totalSocial.instagram, icon: Instagram, color: '#E4405F' },
    { name: 'Twitter', value: totalSocial.twitter, icon: Twitter, color: '#1DA1F2' },
    { name: 'TikTok', value: totalSocial.tiktok, icon: Video, color: '#00F2EA' },
  ];

  const maxValue = Math.max(...Object.values(totalSocial));

  return (
    <div className="p-4 space-y-6">
      {platforms.map((platform) => (
        <div key={platform.name}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <platform.icon className="w-5 h-5" style={{ color: platform.color }} />
              <span className="font-medium">{platform.name}</span>
            </div>
            <span className="text-sm">
              {(platform.value / 1000000).toFixed(1)}M
            </span>
          </div>
          <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(platform.value / maxValue) * 100}%`,
                backgroundColor: platform.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};