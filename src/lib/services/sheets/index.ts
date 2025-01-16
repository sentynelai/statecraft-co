import { fetchSheetData } from '../api/sheets';
import { parseSheetRow, validateSheetData } from './parser';
import type { SheetData } from '../../types/sheets';

const SHEET_NAME = 'Demografia';
const DATA_RANGE = `${SHEET_NAME}!A2:Z`;

export async function fetchProvincialData(): Promise<SheetData[]> {
  try {
    const rawData = await fetchSheetData(DATA_RANGE);
    
    if (!Array.isArray(rawData)) {
      throw new Error('Invalid data format received from spreadsheet');
    }

    return rawData
      .map(parseSheetRow)
      .filter(validateSheetData);
      
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Error al obtener datos: ${message}`);
  }
}