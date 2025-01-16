import { fetchStoreData as fetchFromGoogleSheets } from './googleSheets';
import type { StoreData } from '../types';

export async function fetchStoreData(): Promise<StoreData[]> {
  try {
    const data = await fetchFromGoogleSheets();
    return data.sort((a, b) => b.sales - a.sales);
  } catch (error) {
    console.error('Failed to fetch store data:', error);
    throw error;
  }
}