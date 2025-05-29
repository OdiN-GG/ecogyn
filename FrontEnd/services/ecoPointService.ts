import { ENDPOINTS } from '../constants/api';

export interface WasteType {
  _id?: string;
  nameType: string;
  cor: string;
}

export interface EcoPoint {
  _id?: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  wasteTypes: WasteType[];
  description: string;
  openingHours: string;
  imageUrl: string;
}

export const ecoPointService = {
  // Buscar todos os ecopontos
  getAll: async (): Promise<EcoPoint[]> => {
    try {
      const response = await fetch(ENDPOINTS.ECOPOINTS);
      if (!response.ok) {
        throw new Error('Erro ao buscar ecopontos');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar ecopontos:', error);
      throw error;
    }
  },

  // Buscar um ecoponto por ID
  getById: async (id: string): Promise<EcoPoint> => {
    try {
      const response = await fetch(`${ENDPOINTS.ECOPOINTS}/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar ecoponto');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar ecoponto:', error);
      throw error;
    }
  },

  // Criar um novo ecoponto
  create: async (ecoPoint: Omit<EcoPoint, '_id'>): Promise<EcoPoint> => {
    try {
      const response = await fetch(ENDPOINTS.ECOPOINTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ecoPoint),
      });
      if (!response.ok) {
        throw new Error('Erro ao criar ecoponto');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar ecoponto:', error);
      throw error;
    }
  },

  // Atualizar um ecoponto
  update: async (id: string, ecoPoint: Partial<EcoPoint>): Promise<EcoPoint> => {
    try {
      const response = await fetch(`${ENDPOINTS.ECOPOINTS}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ecoPoint),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar ecoponto');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar ecoponto:', error);
      throw error;
    }
  },

  // Deletar um ecoponto
  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${ENDPOINTS.ECOPOINTS}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar ecoponto');
      }
    } catch (error) {
      console.error('Erro ao deletar ecoponto:', error);
      throw error;
    }
  },
}; 