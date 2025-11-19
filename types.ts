export enum AppView {
  HOME = 'HOME',
  PLANT_DOCTOR = 'PLANT_DOCTOR',
  SOIL_SCAN = 'SOIL_SCAN',
  ASSISTANT = 'ASSISTANT',
  MARKETPLACE = 'MARKETPLACE',
  COOP_DASHBOARD = 'COOP_DASHBOARD'
}

export interface MarketItem {
  id: string;
  name: string;
  category: 'Crop' | 'Livestock' | 'Seed' | 'Fertilizer' | 'Tool';
  price: number;
  currency: string;
  location: string;
  image: string;
  seller: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  rainChance: number;
  location: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface CoopStat {
  name: string;
  value: number;
  unit?: string;
}
