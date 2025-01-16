import type { SheetData } from '../../types/sheets';

function parseNumber(value: string): number {
  if (!value) return 0;
  const cleaned = value.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function parseCSVRow(row: string): SheetData | null {
  const columns = row.split(',').map(col => col.trim());
  
  if (columns.length < 12) return null;

  return {
    departamento: columns[0],
    lat: parseNumber(columns[1]),
    lng: parseNumber(columns[2]),
    poblacion: parseNumber(columns[3]),
    escuelas: parseNumber(columns[4]),
    hospitales: parseNumber(columns[5]),
    presupuesto: parseNumber(columns[6]),
    audienciaFbA: parseNumber(columns[7]),
    audienciaFbB: parseNumber(columns[8]),
    audienciaGmp: parseNumber(columns[9]),
    whatsapp: parseNumber(columns[10]),
    analisis: columns[11],
    recomendaciones: columns[12] || '',
    conclusiones: columns[13] || ''
  };
}

export function validateRow(data: SheetData): boolean {
  return (
    data.departamento !== '' &&
    data.lat !== 0 &&
    data.lng !== 0 &&
    data.poblacion > 0
  );
}