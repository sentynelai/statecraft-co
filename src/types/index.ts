export interface SocialMedia {
  facebook: number;
  instagram: number;
  twitter: number;
  tiktok: number;
}

export interface StoreData {
  id: number;
  lat: number;
  lng: number;
  sales: number;
  customers: number;
  region: string;
  trend: number;
  socialMedia: SocialMedia;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}