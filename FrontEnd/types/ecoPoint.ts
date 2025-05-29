export interface WasteType {
  _id: string;
  nameType: string;
  cor: string;
}

export interface EcoPoint {
  _id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  wasteTypes: WasteType[];
  description: string;
  openingHours: string;
  imageUrl: string;
}