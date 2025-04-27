import { Stack } from 'expo-router';

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

function RootLayoutNav() {

  return (
    <GluestackUIProvider mode="light"><Stack>
        <Stack.Screen name="/" options={{ presentation: 'modal' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack></GluestackUIProvider>
  );
}
