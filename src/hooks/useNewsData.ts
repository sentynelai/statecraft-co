import useSWR from 'swr';
import { fetchNewsData, NewsItem } from '../lib/services/newsService';

export function useNewsData(departamento?: string) {
  const { data, error, isLoading } = useSWR<NewsItem[]>(
    'news-data',
    fetchNewsData,
    {
      refreshInterval: 300000, // 5 minutes
      revalidateOnFocus: true,
      dedupingInterval: 60000, // 1 minute
    }
  );

  const filteredNews = departamento
    ? data?.filter(item => item.departamento === departamento)
    : data;

  return {
    news: filteredNews || [],
    isLoading,
    isError: error
  };
}