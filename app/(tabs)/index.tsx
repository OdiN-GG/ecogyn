import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native";


export default function TabOneScreen() {
  return (
    <View style={{ gap: 10 ,flex:1, alignItems:"center", justifyContent:"center"}}>
      <Text style={{fontSize:20, fontWeight:"900"}}>Home</Text>
      <Button onPress={()=> router.navigate("..")} title="voltar"/>
    </View>
  );
}

