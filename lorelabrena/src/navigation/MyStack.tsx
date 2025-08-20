import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../authentication/LoginScreen";
import RegisterScreen from "../authentication/RegisterScreen";
import WorldsScreen from "../ui/screens/world/WorldsScreen";

const Stack = createStackNavigator();

export default function MyStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name ="Login" component={LoginScreen} />
            <Stack.Screen name ="Register" component ={RegisterScreen} />
            <Stack.Screen name ="Worlds" component ={WorldsScreen} />
        </Stack.Navigator>
    );
}