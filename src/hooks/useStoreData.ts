import useSWR from 'swr';
import { fetchProvincialData } from '../lib/googleSheets';
import { DEMO_DATA } from '../lib/demoData';
import { atom, useAtom } from 'jotai';

const useDemoDataAtom = atom<boolean | null>(null); // null means user hasn't decided yet

export function useProvincialData() {
  const [useDemoData, setUseDemoData] = useAtom(useDemoDataAtom);

  const { data, error, isLoading } = useSWR(
    'provincial-data',
    async () => {
      if (useDemoData === true) {
        return DEMO_DATA;
      }

      try {
        const data = await fetchProvincialData();
        if (!data || data.length === 0) {
          throw new Error('No data available');
        }
        return data;
      } catch (error) {
        if (useDemoData === false) {
          throw error; // Only throw if user explicitly declined demo data
        }
        return DEMO_DATA;
      }
    },
    {
      refreshInterval: useDemoData ? 0 : 300000,
      revalidateOnFocus: !useDemoData,
      dedupingInterval: 60000,
      errorRetryCount: useDemoData === false ? 2 : 0,
      suspense: true
    }
  );

  return {
    data: data || [],
    isLoading,
    isError: error,
    isEmpty: !isLoading && !error && (!data || data.length === 0),
    useDemoData,
    setUseDemoData
  };
}

// Export the hook with both names for compatibility
export const useStoreData = useProvincialData;