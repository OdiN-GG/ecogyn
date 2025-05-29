import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { ImageBackground } from "react-native";
import { GoogleSignin, GoogleSigninButton, isSuccessResponse } from '@react-native-google-signin/google-signin';
import { useAuth } from "../contexts/AuthContext";

GoogleSignin.configure({
  iosClientId:"797574390063-a493nuf6j46aps81nm5lvjs5o905j82i.apps.googleusercontent.com",
  webClientId: "797574390063-lnb0gsqg18l99ho52cmgjonnsgvhikuc.apps.googleusercontent.com"
});

export default function Login() {
    const { signIn } = useAuth();
    const router = useRouter();

    async function handleSignIn() {
      try {
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();

        if (isSuccessResponse(response)) {
          const userData = {
            id: response.data.user.id,
            email: response.data.user.email || '',
            name: response.data.user.name || 'Usuário',
            photo: response.data.user.photo || undefined
          };
          
          await signIn(userData);
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.error("Erro ao fazer login com Google:", error);
      }
    }
    
    return(
        <ImageBackground 
            source={require("../assets/images/gyngg.jpg")} 
            resizeMode="cover"
            style={{flex: 1}}
        >
            <VStack
                className="items-center justify-between my-20 gap-10 flex-1"
            >
                <VStack className="items-center gap-2">
                    <Text
                        className="color-white"
                        size="4xl"
                        bold
                    >
                        EcoPonto
                    </Text>
                    <Text
                        className="color-lime-700"
                        size="6xl"
                        bold
                    >
                        Goiânia
                    </Text>
                </VStack>

                <GoogleSigninButton
                    style={{width: 300, height: 48}}
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => router.replace("/(tabs)")}
                    isTVSelectable
                />
            </VStack>
        </ImageBackground>
    );
}