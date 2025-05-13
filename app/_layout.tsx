import { Stack } from 'expo-router';

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

 export default function Root() {

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
