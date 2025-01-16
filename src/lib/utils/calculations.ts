import type { SheetData, AudienceTotals } from '../types/sheets';

export function calculateTotalPopulation(data: SheetData[]): number {
  return data.reduce((total, item) => total + item.poblacion, 0);
}

export function calculateAudienceTotals(data: SheetData[]): AudienceTotals {
  const totals = data.reduce((acc, item) => ({
    fbA: acc.fbA + item.audienciaFbA,
    fbB: acc.fbB + item.audienciaFbB,
    gmp: acc.gmp + item.audienciaGmp,
    whatsapp: acc.whatsapp + item.whatsapp
  }), { fbA: 0, fbB: 0, gmp: 0, whatsapp: 0 });

  return {
    ...totals,
    total: totals.fbA + totals.fbB + totals.gmp + totals.whatsapp
  };
}

export function calculateEducationStats(data: SheetData[]) {
  return data.reduce((acc, item) => ({
    totalEscuelas: acc.totalEscuelas + item.escuelas,
    totalHospitales: acc.totalHospitales + item.hospitales,
  }), { totalEscuelas: 0, totalHospitales: 0 });
}