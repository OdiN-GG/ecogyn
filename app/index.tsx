import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Image } from '@/components/ui/image';
import { Link } from "expo-router";
import { ImageBackground } from "react-native";



export default function Login(){
    return(

        <ImageBackground 
        source={require("../assets/images/eco3.jpg")} 
        resizeMode="cover"
        style={{flex: 1}}
        >
            <VStack
            className=" items-center justify-center flex-1 gap-10"
        >
            <Text
                className="color-white"
                size="4xl"
                bold
                
            >EcoGyn</Text>
            <Link href="/(tabs)" asChild>
                <Button className="bg-lime-700">
                <ButtonText>Logar</ButtonText>
                </Button>
            </Link>
        </VStack>
        </ImageBackground>
    )
}