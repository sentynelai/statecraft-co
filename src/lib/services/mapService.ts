import { LocationData } from '../types/map';
import { SHEETS_CONFIG } from '../config/sheets';

const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

export async function fetchMapData(): Promise<LocationData[]> {
  try {
    const url = `${SHEETS_CONFIG.API_BASE_URL}/${SHEETS_CONFIG.SPREADSHEET_ID}/values/${SHEETS_CONFIG.SHEETS.DEMOGRAPHICS.NAME}!${SHEETS_CONFIG.DATA_RANGE}?key=${API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data.values || !Array.isArray(data.values)) {
      throw new Error('No data found in spreadsheet');
    }

    return data.values
      .map(row => ({
        departamento: String(row[0] || '').trim(), // Changed from row[3] to row[0]
        lat: parseFloat(row[1] || '0'), // Changed from row[6] to row[1]
        lng: parseFloat(row[2] || '0'), // Changed from row[7] to row[2]
        poblacion: parseInt(row[3] || '0', 10) // Changed from row[8] to row[3]
      }))
      .filter(location => 
        location.departamento && 
        !isNaN(location.lat) && 
        !isNaN(location.lng) && 
        location.lat !== 0 && 
        location.lng !== 0 &&
        !isNaN(location.poblacion) &&
        location.poblacion > 0
      );
  } catch (error) {
    console.error('Error fetching map data:', error);
    throw error;
  }
}