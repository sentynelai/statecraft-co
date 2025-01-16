import { ProvincialData } from '../types';

const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

// Make sure the spreadsheet is publicly readable and use the correct range
const SHEETS_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A2:I?key=${API_KEY}`;

async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      
      if (response.status === 403) {
        throw new Error('Access denied. Please make sure the Google Sheet is publicly accessible and the API key has proper permissions.');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error instanceof Error ? error.message : 'Unknown error');
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
  throw new Error('Failed to fetch after retries');
}

export async function checkGoogleSheetsAccess(): Promise<boolean> {
  if (!SPREADSHEET_ID || !API_KEY) {
    console.error('Missing Google Sheets configuration');
    return false;
  }

  try {
    const response = await fetchWithRetry(SHEETS_API_URL);
    const data = await response.json();
    return !!data.values && data.values.length > 0;
  } catch (error) {
    console.error('Google Sheets access error:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
}

export async function fetchProvincialData(): Promise<ProvincialData[]> {
  if (!SPREADSHEET_ID || !API_KEY) {
    console.error('Missing Google Sheets configuration');
    throw new Error('Google Sheets configuration is missing');
  }

  try {
    const response = await fetchWithRetry(SHEETS_API_URL);
    const data = await response.json();
    
    if (!data.values || data.values.length === 0) {
      throw new Error('No data found in spreadsheet');
    }

    return data.values.map((row: any[]) => ({
      departamento: String(row[0] || ''),
      poblacion: Number(row[1]) || 0,
      superficie: Number(row[2]) || 0,
      densidad: Number(row[3]) || 0,
      lat: Number(row[4]) || 0,
      lng: Number(row[5]) || 0,
      presupuesto: Number(row[6]) || 0,
      escuelas: Number(row[7]) || 0,
      hospitales: Number(row[8]) || 0
    })).filter(data => 
      data.departamento && 
      !isNaN(data.lat) && 
      !isNaN(data.lng) &&
      data.lat !== 0 &&
      data.lng !== 0
    );
  } catch (error) {
    console.error('Error fetching provincial data:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}