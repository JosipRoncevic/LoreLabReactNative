import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CosmicTheme } from "../ui/themes/CosmicTheme";

// Worlds
import WorldsScreen from "../ui/world/WorldsScreen";
import CreateWorldScreen from "../ui/world/CreateWorldScreen";
import { WorldDetailsScreen } from "../ui/world/WorldDetailsScreen";

// Characters
import CharactersScreen from "../ui/character/CharactersScreen";
import CreateCharacterScreen from "../ui/character/CreateCharacterScreen";
import { CharacterDetailsScreen } from "../ui/character/CharacterDetailsScreen";

// Stories
import StoriesScreen from "../ui/story/StoryScreen";
import CreateStoryScreen from "../ui/story/CreateStoryScreen";
import { StoryDetailsScreen } from "../ui/story/StoryDetailsScreen";

export type MainStackParamList = {
  Worlds: undefined;
  WorldDetails: { id: string };
  CreateWorld: undefined;

  Characters: undefined;
  CharacterDetails: { id: string };
  CreateCharacter: undefined;

  Stories: undefined;
  StoryDetails: { id: string };
  CreateStory: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Worlds"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: CosmicTheme.colors.deepSpace,
        },
      }}
    >
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

      <Stack.Screen name="Characters" component={CharactersScreen} />

      <Stack.Screen
        name="CharacterDetails"
        component={CharacterDetailsScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: CosmicTheme.colors.deepSpace,
          },
          headerTintColor: CosmicTheme.colors.starWhite,
          headerTitle: "",
        }}
      />

      <Stack.Screen
        name="CreateCharacter"
        component={CreateCharacterScreen}
      />

      <Stack.Screen name="Stories" component={StoriesScreen} />

      <Stack.Screen
        name="StoryDetails"
        component={StoryDetailsScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: CosmicTheme.colors.deepSpace,
          },
          headerTintColor: CosmicTheme.colors.starWhite,
          headerTitle: "",
        }}
      />

      <Stack.Screen name="CreateStory" component={CreateStoryScreen} />
    </Stack.Navigator>
  );
};