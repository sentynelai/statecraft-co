import { SheetData } from '../types/sheets';

const SPREADSHEET_ID = '154Ic1dbtqCR0h4ISwqaiCyd_GKu5Wa_czlZbHbsJkwQ';
const SHEET_ID = '0';
const SHEET_NAME = 'Demografia';
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

async function validateConfig() {
  if (!API_KEY) {
    throw new Error('Falta la clave de API de Google Sheets');
  }
}

function parseNumber(value: string | undefined, defaultValue = 0): number {
  if (!value) return defaultValue;
  const cleaned = value.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? defaultValue : parsed;
}

export async function fetchSheetData(): Promise<SheetData[]> {
  try {
    await validateConfig();

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A2:Z?key=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error al acceder a la hoja de cálculo (${response.status})`);
    }

    const data = await response.json();

    if (!data.values || !Array.isArray(data.values)) {
      throw new Error('La hoja de cálculo está vacía');
    }

    return data.values
      .filter(row => Array.isArray(row) && row.length >= 8)
      .map(row => ({
        departamento: String(row[3] || '').trim(),
        lat: parseNumber(row[6]),
        lng: parseNumber(row[7]),
        poblacion: parseNumber(row[8]),
        escuelas: parseNumber(row[9]),
        hospitales: parseNumber(row[10]),
        presupuesto: parseNumber(row[11]),
        audienciaFbA: parseNumber(row[14]),
        audienciaFbB: parseNumber(row[15]),
        audienciaGmp: parseNumber(row[16]),
        whatsapp: parseNumber(row[17]),
        analisis: String(row[22] || '').trim(),
        recomendaciones: String(row[23] || '').trim(),
        conclusiones: String(row[25] || '').trim()
      }))
      .filter(item => 
        item.departamento && 
        item.lat !== 0 && 
        item.lng !== 0 && 
        item.poblacion > 0
      );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error al obtener datos:', message);
    throw new Error(message);
  }
}