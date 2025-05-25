export interface WasteType {
  id: string;
  nameType: string;
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
  imageUrl: string;
  isMunicipal: boolean;
}