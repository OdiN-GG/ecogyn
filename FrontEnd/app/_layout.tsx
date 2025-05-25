import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function RootLayoutNav() {
  const { user, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized) {
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/');
      }
    }
  }, [user, isInitialized]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (user) {
        // Se o usuário estiver logado, não permite voltar para a tela de login
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [user]);

  return (
    <GluestackUIProvider mode="light">
      <Stack
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
