import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";

export default function Login(){
    return(
        <VStack
            className=" items-center justify-center flex-1 gap-10"
        >
            <Text>Entrar</Text>
            <Link href="/(tabs)" asChild>
                <Button className="bg-lime-700">
                <ButtonText>Logar</ButtonText>
                </Button>
            </Link>
        </VStack>
    )
}