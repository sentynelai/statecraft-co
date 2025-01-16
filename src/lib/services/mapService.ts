import { LocationData } from '../types/map';

export function parseLocationData(sheetData: any[][]): LocationData[] {
  if (!Array.isArray(sheetData) || sheetData.length === 0) return [];

  return sheetData.map(row => ({
    departamento: row[0] || '', // Column D: Departamento
    lat: parseFloat(row[3] || '0'), // Column G: Latitud
    lng: parseFloat(row[4] || '0'), // Column H: Longitud
    poblacion: parseInt(row[5] || '0', 10), // Column I: POBLACION
  })).filter(location => 
    location.departamento && 
    !isNaN(location.lat) && 
    !isNaN(location.lng) && 
    location.lat !== 0 && 
    location.lng !== 0 &&
    !isNaN(location.poblacion) &&
    location.poblacion > 0
  );
}