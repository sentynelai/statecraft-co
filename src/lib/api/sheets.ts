import { SHEETS_CONFIG } from '../constants';

const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

export async function fetchSheetData(range: string): Promise<any> {
  const url = `${BASE_URL}/${SHEETS_CONFIG.SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.values;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}