import type { SheetData } from '../../types/sheets';
import { parseCSVRow, validateRow } from './parser';

export async function readCSVData(): Promise<SheetData[]> {
  try {
    const response = await fetch('/src/data/demografia.csv');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    const lines = text.split('\n');
    
    // Skip header row
    const dataRows = lines.slice(1);
    
    return dataRows
      .map(parseCSVRow)
      .filter((row): row is SheetData => row !== null)
      .filter(validateRow);
      
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Error reading CSV data: ${message}`);
  }
}