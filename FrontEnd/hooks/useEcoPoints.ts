import { useState, useCallback } from 'react';
import { ecoPointService, EcoPoint } from '../services/ecoPointService';

export const useEcoPoints = () => {
  const [ecopoints, setEcopoints] = useState<EcoPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEcopoints = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ecoPointService.getAll();
      setEcopoints(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar ecopontos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEcopoint = useCallback(async (ecopoint: Omit<EcoPoint, '_id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newEcopoint = await ecoPointService.create(ecopoint);
      setEcopoints(prev => [...prev, newEcopoint]);
      return newEcopoint;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar ecoponto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEcopoint = useCallback(async (id: string, ecopoint: Partial<EcoPoint>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedEcopoint = await ecoPointService.update(id, ecopoint);
      setEcopoints(prev => prev.map(ep => ep._id === id ? updatedEcopoint : ep));
      return updatedEcopoint;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar ecoponto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEcopoint = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await ecoPointService.delete(id);
      setEcopoints(prev => prev.filter(ep => ep._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar ecoponto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    ecopoints,
    loading,
    error,
    fetchEcopoints,
    createEcopoint,
    updateEcopoint,
    deleteEcopoint,
  };
}; 