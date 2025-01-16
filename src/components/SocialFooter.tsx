import React from 'react';
import { Facebook, Instagram, Twitter, Video } from 'lucide-react';
import { useStoreData } from '../hooks/useStoreData';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { motion, AnimatePresence } from 'framer-motion';

export const SocialFooter: React.FC = () => {
  const { stores } = useStoreData();
  const { selectedStore } = useStoreSelection();

  const calculateSocialMetrics = () => {
    if (selectedStore) {
      return {
        facebook: selectedStore.socialMedia.facebook,
        instagram: selectedStore.socialMedia.instagram,
        twitter: selectedStore.socialMedia.twitter,
        tiktok: selectedStore.socialMedia.tiktok
      };
    }

    return stores.reduce((acc, store) => ({
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
  };

  const socialMetrics = calculateSocialMetrics();

  const platforms = [
    { name: 'Facebook', value: socialMetrics.facebook, icon: Facebook, color: '#1877F2' },
    { name: 'Instagram', value: socialMetrics.instagram, icon: Instagram, color: '#E4405F' },
    { name: 'Twitter', value: socialMetrics.twitter, icon: Twitter, color: '#1DA1F2' },
    { name: 'TikTok', value: socialMetrics.tiktok, icon: Video, color: '#00F2EA' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-950/60 backdrop-blur-md py-2 px-4">
      <div className="flex items-center justify-center gap-8">
        {platforms.map((platform) => (
          <motion.div
            key={platform.name}
            className="relative group"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-2">
              <platform.icon 
                className="w-5 h-5" 
                style={{ color: platform.color }} 
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${platform.name}-${platform.value}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm font-medium"
                >
                  {(platform.value / 1000000).toFixed(1)}M
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-dark-900/90 rounded-lg text-xs whitespace-nowrap pointer-events-none"
            >
              {platform.name} {selectedStore ? 'Store' : 'Total'} Reach
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};