import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorldsScreen from "../ui/world/WorldsScreen";
import CreateWorldScreen from "../ui/world/CreateWorldScreen";
import { WorldDetailsScreen } from "../ui/world/WorldDetailsScreen";
import { CosmicTheme } from "../ui/themes/CosmicTheme";

export type RootStackParamList = {
  Worlds: undefined;
  WorldDetails: { id: string };
  CreateWorld: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
          headerTitle: "",
        }}
      />

      <Stack.Screen name="CreateWorld" component={CreateWorldScreen} />
    </Stack.Navigator>
  );
};