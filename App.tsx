import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import WorldsScreen from "./src/ui/world/WorldsScreen";
import LoginScreen from "./src/auth/LoginScreen";
import { AppNavigator } from "./src/navigation/AppNavigator";

const App =() =>{
  return (
    <NavigationContainer>
      <AppNavigator />
      </NavigationContainer>
  );
}

export default App;