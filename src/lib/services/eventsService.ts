import { SHEETS_CONFIG } from '../config/sheets';

export interface EventItem {
  departamento: string;
  evento: string;
  enlace?: string;
}

export async function fetchEventsData(): Promise<EventItem[]> {
  try {
    const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
    if (!API_KEY) {
      console.error('Missing API key');
      return [];
    }

    const url = `${SHEETS_CONFIG.API_BASE_URL}/${SHEETS_CONFIG.SPREADSHEET_ID}/values/${SHEETS_CONFIG.SHEETS.EVENTS.NAME}!${SHEETS_CONFIG.SHEETS.EVENTS.RANGE}?key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Events API Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      return [];
    }

    const data = await response.json();

    if (!data.values || !Array.isArray(data.values)) {
      return [];
    }

    return data.values
      .filter(row => Array.isArray(row) && row.length >= 2)
      .map(row => ({
        departamento: String(row[0] || '').trim(),
        evento: String(row[1] || '').trim(),
        enlace: row[2] ? String(row[2]).trim() : undefined
      }))
      .filter(item => item.departamento && item.evento);
  } catch (error) {
    console.error('Events fetch error:', error);
    return [];
  }
}