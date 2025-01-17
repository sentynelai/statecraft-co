import useSWR from 'swr';
import { fetchEventsData, EventItem } from '../lib/services/eventsService';

export function useEventsData(departamento?: string) {
  const { data, error, isLoading } = useSWR<EventItem[]>(
    'events-data',
    fetchEventsData,
    {
      refreshInterval: 300000, // 5 minutes
      revalidateOnFocus: true,
      dedupingInterval: 60000, // 1 minute
    }
  );

  const filteredEvents = departamento
    ? data?.filter(item => item.departamento === departamento)
    : data;

  return {
    events: filteredEvents || [],
    isLoading,
    isError: error
  };
}