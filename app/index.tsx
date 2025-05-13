import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {useRouter } from "expo-router";
import { Alert, ImageBackground } from "react-native";

import{ GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes, User } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  iosClientId:"797574390063-a493nuf6j46aps81nm5lvjs5o905j82i.apps.googleusercontent.com",
  
});

export default function Login(){

    const router = useRouter()
    

    async function handlesSingIn(){ 
        try {
            await GoogleSignin.hasPlayServices()
            const response = await GoogleSignin.signIn()

            if (isSuccessResponse(response)) {
                router.push("/(tabs)")
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    
    return(

        <ImageBackground 
        source={require("../assets/images/gyngg.jpg")} 
        resizeMode="cover"
        style={{flex: 1}}
        >
            <VStack
            className=" items-center justify-start mt-40 gap-10 flex-1 "
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
           
                <Button onPress={handlesSingIn} className="bg-lime-700 ">
                <ButtonText>Entra</ButtonText>
                </Button>
        </VStack>
        </ImageBackground>
    )
}