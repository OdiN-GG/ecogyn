import { EcoPoint, WasteType } from '@/types/ecoPoint';
import { Platform } from 'react-native';

// Configuração da URL base da API
const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      // Para emulador Android
      if (Platform.isTV) {
        return 'http://10.0.2.2:8000/api';
      }
      // Para dispositivo físico Android
      return 'http://192.168.1.2:8000/api';
    }
    // Para iOS
    return 'http://192.168.1.2:8000/api';
  }
  return 'https://sua-api-producao.com/api';
};

const API_URL = getBaseUrl();

// Função para buscar todos os pontos de coleta
export async function getEcoPoints(): Promise<EcoPoint[]> {
  try {
    const url = `${API_URL}/ecopoints/`;
    console.log('🔍 Tentando buscar ecopontos em:', url);
    console.log('📱 Plataforma:', Platform.OS);
    console.log('📱 É emulador:', Platform.isTV ? 'Sim' : 'Não');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📡 Status da resposta:', response.status);
    console.log('📡 Headers da resposta:', JSON.stringify(response.headers));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Resposta de erro:', errorText);
      throw new Error(`Erro ao buscar pontos de coleta: ${response.status} ${response.statusText}\nDetalhes: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Dados recebidos:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Erro na requisição:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    } else {
      console.error("❌ Erro desconhecido na requisição:", error);
    }
    throw error;
  }
}

// Função para buscar um ponto de coleta específico
export async function getEcoPoint(id: string): Promise<EcoPoint> {
  try {
    const response = await fetch(`${API_URL}/ecopoints/${id}/`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar ponto de coleta: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

// Função para buscar todos os tipos de resíduos
export async function getWasteTypes(): Promise<WasteType[]> {
  try {
    const url = `${API_URL}/waste-types/`;
    console.log('🔍 Tentando buscar tipos de resíduos em:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📡 Status da resposta:', response.status);
    console.log('📡 Headers da resposta:', JSON.stringify(response.headers));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Resposta de erro:', errorText);
      throw new Error(`Erro ao buscar tipos de resíduos: ${response.status} ${response.statusText}\nDetalhes: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Dados recebidos:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Erro na requisição:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    } else {
      console.error("❌ Erro desconhecido na requisição:", error);
    }
    throw error;
  }
}

// Função para buscar um tipo de resíduo específico
export async function getWasteType(id: string): Promise<WasteType> {
  try {
    const response = await fetch(`${API_URL}/waste-types/${id}/`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar tipo de resíduo: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}