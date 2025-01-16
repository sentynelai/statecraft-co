import { fetchSheetData } from '../api/sheets';
import { parseSheetRow, validateSheetData } from './parser';
import type { SheetData } from '../../types/sheets';

export async function fetchProvincialData(): Promise<SheetData[]> {
  try {
    const rawData = await fetchSheetData();
    
    if (!Array.isArray(rawData)) {
      throw new Error('Invalid data format received from spreadsheet');
    }

    const parsedData = rawData
      .map(parseSheetRow)
      .filter(validateSheetData);

    if (parsedData.length === 0) {
      throw new Error('No valid data found in spreadsheet');
    }

    return parsedData;
      
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Error fetching provincial data: ${message}`);
  }
}