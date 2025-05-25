import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
  photo?: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (user: User) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const USER_STORAGE_KEY = '@eco:user';

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  async function loadUserFromStorage() {
    try {
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  }

  async function signIn(userData: User) {
    try {
      setUser(userData);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      throw error;
    }
  }

  async function signOut() {
    try {
      setUser(null);
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
                        