import { SheetData } from '../types/sheets';
import { SHEETS_CONFIG, validateConfig } from '../config/sheets';

function parseNumber(value: string | undefined, defaultValue = 0): number {
  if (!value) return defaultValue;
  const cleaned = value.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? defaultValue : parsed;
}

export async function fetchSheetData(): Promise<SheetData[]> {
  try {
    if (!validateConfig()) {
      console.error('Invalid configuration');
      return [];
    }
    
    const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
    if (!API_KEY) {
      console.error('Missing API key');
      return [];
    }

    const url = `${SHEETS_CONFIG.API_BASE_URL}/${SHEETS_CONFIG.SPREADSHEET_ID}/values/Demografia!A2:Z?key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Sheet API Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      return [];
    }

    const data = await response.json();

    if (!data.values || !Array.isArray(data.values)) {
      console.error('Invalid sheet data format:', data);
      return [];
    }

    console.log("Preparsed data:", data);

    const parsedData = data.values
      .filter(row => Array.isArray(row) && row.length >= 8)
      .map(row => ({
        departamento: String(row[3] || '').trim(),
        lat: parseNumber(row[7]),
        lng: parseNumber(row[8]),
        poblacion: parseNumber(row[6]),
        escuelas: parseNumber(row[0]),
        hospitales: parseNumber(row[1]),
        presupuesto: parseNumber(row[2]),
        audienciaFbA: parseNumber(row[14]),
        audienciaFbB: parseNumber(row[15]),
        audienciaGmp: parseNumber(row[16]),
        whatsapp: parseNumber(row[17]),
        analisis: String(row[21] || '').trim(),
        recomendaciones: String(row[12] || '').trim(),
        conclusiones: String(row[13] || '').trim()
      }))
      .filter(item => 
        item.departamento && 
        item.lat !== 0 && 
        item.lng !== 0 && 
        item.poblacion > 0
      );

    if (parsedData.length === 0) {
      console.error('No valid data found after parsing');
    }

    return parsedData;
  } catch (error) {
    console.error('Sheet fetch error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      config: {
        spreadsheetId: SHEETS_CONFIG.SPREADSHEET_ID,
        sheetName: 'Demografia',
        range: 'A2:N'
      }
    });
    return [];
  }
}