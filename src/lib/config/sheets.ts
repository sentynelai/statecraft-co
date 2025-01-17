// Google Sheets Configuration
export const SHEETS_CONFIG = {
  SPREADSHEET_ID: '11cHtcmd3KQEUlFiOAdh-bc9vtXh12qe-oB_y2opsh50',
  API_BASE_URL: 'https://sheets.googleapis.com/v4/spreadsheets',
  SHEETS: {
    DEMOGRAPHICS: {
      NAME: 'Demografia',
      RANGE: 'A2:Z',
      GID: '0'
    },
    NEWS: {
      NAME: 'Dummy - Noticias',
      RANGE: 'A2:C',
      GID: '1'
    },
    EVENTS: {
      NAME: 'Dummy - Eventos',
      RANGE: 'A2:C',
      GID: '2'
    }
  }
} as const;

// Validate configuration
export function validateConfig() {
  const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  
  if (!API_KEY) {
    console.error('Google Sheets API key is not configured. Please check your environment variables.');
    return false;
  }
  
  if (!SHEETS_CONFIG.SPREADSHEET_ID) {
    console.error('Spreadsheet ID is not configured.');
    return false;
  }
  
  return true;
}