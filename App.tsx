import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import WorldsScreen from "./src/ui/world/WorldsScreen";

const App =() =>{
  return (
    <NavigationContainer>
      <WorldsScreen />
      </NavigationContainer>
  );
}

export default App;