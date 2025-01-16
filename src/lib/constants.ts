// Google Sheets Configuration
export const SHEETS_CONFIG = {
  SPREADSHEET_ID: '154Ic1dbtqCR0h4ISwqaiCyd_GKu5Wa_czlZbHbsJkwQ',
  SHEET_GID: '0',
  SHEET_NAME: 'Demografía'
} as const;

// Map Configuration
export const MAP_CONFIG = {
  ENTRE_RIOS_CENTER: {
    lat: -31.7333,
    lng: -60.5333
  },
  DEFAULT_ZOOM: 8
} as const;

// Data Column Mappings
export const COLUMN_MAPPINGS = {
  DEPARTAMENTO: 'A',
  POBLACION: 'G',
  SUPERFICIE: 'H',
  DENSIDAD: 'I'
} as const;