import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import WorldsScreen from "./src/ui/world/WorldsScreen";
import LoginScreen from "./src/auth/LoginScreen";

const App =() =>{
  return (
    <NavigationContainer>
      <LoginScreen />
      </NavigationContainer>
  );
}

export default App;