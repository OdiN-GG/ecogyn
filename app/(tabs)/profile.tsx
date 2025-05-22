import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { Image } from "react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function Profile() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    try {
      // Primeiro fazemos o logout do Google
      await GoogleSignin.signOut();
      // Depois fazemos o logout do nosso app
      await signOut();
      // Por fim, redirecionamos para a tela de login
      router.replace("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', paddingTop: insets.top }}>
      <View style={{ backgroundColor: '#FFFFFF', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 28, color: '#2E8B57', marginTop: 12 }}>
          Meu Perfil
        </Text>
      </View>

      <VStack space="lg" className="items-center mt-10 p-4">
        {user?.photo && (
          <Image
            source={{ uri: user.photo }}
            className="w-32 h-32 rounded-full"
          />
        )}
        
        <VStack space="sm" className="items-center">
          <Text size="2xl" bold>
            {user?.name}
          </Text>
          <Text size="md" className="text-gray-600">
            {user?.email}
          </Text>
        </VStack>

        <Button
          size="lg"
          variant="solid"
          action="negative"
          onPress={handleLogout}
          className="mt-10 w-full"
        >
          <ButtonText>Sair</ButtonText>
        </Button>
      </VStack>
    </View>
  );
} 