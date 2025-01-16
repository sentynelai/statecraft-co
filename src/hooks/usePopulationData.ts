import useSWR from 'swr';
import { fetchSheetData } from '../lib/services/sheetService';
import { calculateTotalPopulation } from '../lib/utils/calculations';

export function usePopulationData() {
  const { data, error, isLoading } = useSWR(
    'population-total',
    async () => {
      try {
        const sheetData = await fetchSheetData();
        return calculateTotalPopulation(sheetData);
      } catch (error) {
        console.error('Population data fetch error:', error);
        return 0;
      }
    },
    {
      refreshInterval: 300000, // 5 minutes
      revalidateOnFocus: true,
      dedupingInterval: 60000, // 1 minute
      errorRetryCount: 3,
      fallbackData: 0,
      shouldRetryOnError: false
    }
  );

  return {
    totalPopulation: data || 0,
    isLoading,
    isError: error
  };
}