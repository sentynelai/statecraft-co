import { Database, Map, Wifi } from 'lucide-react';
import { APP_CONFIG } from '../constants/app';
import type { AppService } from '../types/app';

export const LOADING_SERVICES: AppService[] = [
  {
    name: 'Base de Datos Provincial',
    key: 'sheets',
    loadingDelay: APP_CONFIG.LOADING_DELAYS.DATABASE,
  },
  {
    name: 'Mapa Interactivo',
    key: 'map',
    loadingDelay: APP_CONFIG.LOADING_DELAYS.MAP,
  },
  {
    name: 'Asistente IA',
    key: 'assistant',
    loadingDelay: APP_CONFIG.LOADING_DELAYS.ASSISTANT,
  },
];