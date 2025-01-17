import useSWR from 'swr';
import { fetchSheetData } from '../lib/services/sheetService';
import type { SheetData } from '../lib/types/sheets';

export function useProvincialData() {
  const { data, error, isLoading, mutate } = useSWR<SheetData[]>(
    'provincial-data',
    async () => {
      try {
        const data = await fetchSheetData();
        if (!data || data.length === 0) {
          console.warn('No data found in spreadsheet');
          return [];
        }
        return data;
      } catch (error) {
        console.error('Error fetching provincial data:', error);
        return [];
      }
    },
    {
      refreshInterval: 300000, // 5 minutes
      revalidateOnFocus: true,
      dedupingInterval: 60000, // 1 minute
      errorRetryCount: 3,
      suspense: false,
      shouldRetryOnError: true,
      fallbackData: [] // Provide empty array as fallback
    }
  );

  return {
    data: data || [],
    isLoading,
    isError: !!error,
    error: error instanceof Error ? error.message : 'Error desconocido',
    mutate
  };
}

// Export alias for backward compatibility
export const useStoreData = useProvincialData;