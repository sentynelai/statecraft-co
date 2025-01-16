export interface LoadingState {
  sheets: 'loading' | 'success' | 'error';
  map: 'loading' | 'success' | 'error';
  assistant: 'loading' | 'success' | 'error';
}

export interface AppService {
  name: string;
  key: keyof LoadingState;
  loadingDelay: number;
}