import useSWR from 'swr';
import { fetchProvincialData } from '../lib/services/data/provincial';
import type { SheetData } from '../lib/types/sheets';

export function useProvincialData() {
  const { data, error, isLoading, mutate } = useSWR<SheetData[]>(
    'provincial-data',
    async () => {
      try {
        const data = await fetchProvincialData();
        if (!data || data.length === 0) {
          throw new Error('No se encontraron datos en la hoja de cálculo');
        }
        return data;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        throw new Error(message);
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
    mutate // Expose mutate function for manual revalidation
  };
}

// Export alias for backward compatibility
export const useStoreData = useProvincialData;