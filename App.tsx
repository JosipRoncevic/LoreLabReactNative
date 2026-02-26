import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./src/navigation/MainNavigator";
import { RootNavigator } from "./src/navigation/RootNavigator";

const App =() =>{
  return (
    <NavigationContainer>
      <RootNavigator />
      </NavigationContainer>
  );
}

export default App;