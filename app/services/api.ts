const LOCAL_IP = "http://192.168.1.2:8000/api"; // Substitua pelo IP da sua máquina

export async function getEcoPoints() {
  const response = await fetch(`${LOCAL_IP}/eco-points/`);
  if (!response.ok) {
    throw new Error("Erro ao buscar eco pontos");
  }
  return response.json();
}

export async function getWasteTypes() {
  const response = await fetch(`${LOCAL_IP}/waste-types/`);
  if (!response.ok) {
    throw new Error("Erro ao buscar tipos de resíduos");
  }
  return response.json();
}
