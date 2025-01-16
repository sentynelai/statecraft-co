import { SHEETS_CONFIG } from '../../config/sheets';
import { fetchWithRetry } from '../utils/fetch';

const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

export async function fetchSheetData() {
  if (!API_KEY) {
    throw new Error('Google Sheets API key is not configured');
  }

  const url = `${SHEETS_CONFIG.API_BASE_URL}/${SHEETS_CONFIG.SPREADSHEET_ID}/values/${SHEETS_CONFIG.SHEET_NAME}!${SHEETS_CONFIG.DATA_RANGE}?key=${API_KEY}`;
  
  try {
    const response = await fetchWithRetry(url);
    const data = await response.json();
    
    if (!data.values) {
      throw new Error('No data found in spreadsheet');
    }

    console.log("API Sheets", data);
    
    return data.values;
  } catch (error) {
    console.error('Sheet fetch error:', error);
    throw new Error('Failed to fetch sheet data');
  }
}