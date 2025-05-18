export interface WasteType {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface EcoPoint {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  wasteTypes: WasteType[];
  description: string;
  openingHours: string;
  phone: string;
  website?: string;
  imageUrl: string;
  isMunicipal: boolean;
}