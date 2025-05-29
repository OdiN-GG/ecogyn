import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';
const baseUrl = isAndroid ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api';

export const API_URL = baseUrl;

export const ENDPOINTS = {
  ECOPOINTS: `${API_URL}/ecopoints`,
  WASTE_TYPES: `${API_URL}/waste-types`,
}; 