import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../auth/LoginScreen";
import WorldsScreen from "../ui/world/WorldsScreen";
import { WorldDetailsScreen } from "../ui/world/WorldDetailsScreen";
import { CosmicTheme } from "../ui/themes/CosmicTheme";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      <Stack.Screen name="Worlds" component={WorldsScreen} />
      <Stack.Screen
        name="WorldDetails"
        component={WorldDetailsScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: CosmicTheme.colors.deepSpace,
          },
          headerTintColor: CosmicTheme.colors.starWhite,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};