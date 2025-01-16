import type { DemographicData } from '../types/sheets';

export function parseSheetData(rawData: any[][]): Partial<DemographicData>[] {
  // Skip header row
  const dataRows = rawData.slice(1);
  
  return dataRows.map(row => ({
    departamento: row[0], // Column A
    poblacion: parseInt(row[6], 10), // Column G
    superficie: parseFloat(row[7]), // Column H
    densidad: parseFloat(row[8]) // Column I
  }));
}

export function validateDemographicData(data: Partial<DemographicData>[]): boolean {
  return data.every(item => 
    item.departamento &&
    typeof item.poblacion === 'number' &&
    !isNaN(item.poblacion) &&
    typeof item.superficie === 'number' &&
    !isNaN(item.superficie) &&
    typeof item.densidad === 'number' &&
    !isNaN(item.densidad)
  );
}