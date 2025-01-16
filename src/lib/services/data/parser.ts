import type { SheetData } from '../../types/sheets';

function parseNumber(value: any): number {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  
  const cleaned = String(value).replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function parseSheetRow(row: any[]): SheetData {
  return {
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
    conclusiones: String(row[25] || '').trim(),
    eventos: String(row[24] || '').trim() // Column Y contains eventos
  };
}

export function validateSheetData(data: SheetData): boolean {
  return (
    data.departamento !== '' &&
    data.lat !== 0 &&
    data.lng !== 0 &&
    data.poblacion > 0
  );
}