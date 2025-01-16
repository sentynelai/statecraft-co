import React from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import useSWR from 'swr';

interface InfluencerData {
  departamento: string;
  influencer: string;
  url: string;
  penetracion: string;
  categoria: string;
}

interface InfluencersModalProps {
  departamento: string;
}

export const InfluencersModal: React.FC<InfluencersModalProps> = ({ departamento }) => {
  const { data: influencers, error } = useSWR<InfluencerData[]>(
    `https://sheets.googleapis.com/v4/spreadsheets/${import.meta.env.VITE_GOOGLE_SPREADSHEET_ID}/values/Influencers!A2:E?key=${import.meta.env.VITE_GOOGLE_SHEETS_API_KEY}`,
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.values) return [];
      
      return data.values
        .map((row: string[]) => ({
          departamento: row[0],
          influencer: row[1],
          url: row[2],
          penetracion: row[3],
          categoria: row[4]
        }))
        .filter(item => item.departamento === departamento);
    }
  );

  if (error) return null;
  if (!influencers?.length) return null;

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-purple-500/20">
          <Users className="w-5 h-5 text-purple-500" />
        </div>
        <h3 className="text-lg font-semibold">Influencers</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-800/50">
              <th className="text-left py-2 px-4 text-dark-400 font-medium">Influencer</th>
              <th className="text-left py-2 px-4 text-dark-400 font-medium">Penetración</th>
              <th className="text-left py-2 px-4 text-dark-400 font-medium">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {influencers.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-dark-800/30 transition-colors"
              >
                <td className="py-2 px-4">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#00FF9C] hover:underline"
                  >
                    {item.influencer}
                  </a>
                </td>
                <td className="py-2 px-4">{item.penetracion}</td>
                <td className="py-2 px-4">
                  <span className="px-2 py-1 bg-dark-800/50 rounded-full text-sm">
                    {item.categoria}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};