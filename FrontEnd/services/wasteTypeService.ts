import { ENDPOINTS } from '../constants/api';
import { WasteType } from '@/types/ecoPoint';

export const wasteTypeService = {
  // Buscar todos os tipos de resíduo
  getAll: async (): Promise<WasteType[]> => {
    try {
      console.log('🔍 Buscando tipos de resíduo em:', ENDPOINTS.WASTE_TYPES);
      const response = await fetch(ENDPOINTS.WASTE_TYPES);
      if (!response.ok) {
        throw new Error('Erro ao buscar tipos de resíduo');
      }
      const data = await response.json();
      console.log('✅ Tipos de resíduo recebidos:', data);
      return data;
    } catch (error) {
      console.error('❌ Erro ao buscar tipos de resíduo:', error);
      throw error;
    }
  },
}; 