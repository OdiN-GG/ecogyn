import { EcoPoint, WasteType } from '@/types/ecoPoint';

const API_URL = "http://192.168.1.2:8000/api"; // Substitua pelo IP da sua máquina

export async function getEcoPoints(): Promise<EcoPoint[]> {
  try {
    const response = await fetch(`${API_URL}/eco-points/`);
    if (!response.ok) {
      throw new Error("Erro ao buscar eco pontos");
    }
    return response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export async function getWasteTypes(): Promise<WasteType[]> {
  try {
    const response = await fetch(`${API_URL}/waste-types/`);
    if (!response.ok) {
      throw new Error("Erro ao buscar tipos de resíduos");
    }
    return response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}
