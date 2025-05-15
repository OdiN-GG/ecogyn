import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {useRouter } from "expo-router";
import { Alert, ImageBackground } from "react-native";

import{ GoogleSignin, GoogleSigninButton, isSuccessResponse} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  iosClientId:"797574390063-a493nuf6j46aps81nm5lvjs5o905j82i.apps.googleusercontent.com",
  webClientId: "797574390063-lnb0gsqg18l99ho52cmgjonnsgvhikuc.apps.googleusercontent.com"

  
});

export default function Login(){

    const router = useRouter()
    

    async function handlesSingIn() {
      try {
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();

        if (isSuccessResponse(response)) {
          console.log("Logado")
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
            className=" items-center justify-between my-20 gap-10 flex-1 "
        >
            <VStack className="items-center gap-2">
                <Text
                className="color-white"
                size="4xl"
                bold
                
            >
                Eco Ponto
            </Text>
            <Text
                className="color-lime-700"
                size="6xl"
                bold
            >
                Goiânia
            </Text>
            </VStack>

              <Text>Entrar</Text>
           
                <GoogleSigninButton
                  style={{width: 200, height: 48}}
                  size={GoogleSigninButton.Size.Standard}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={handlesSingIn}
                  
                />
              
        </VStack>
        </ImageBackground>
    )
}