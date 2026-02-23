import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorldsScreen from "../ui/world/WorldsScreen";
import CreateWorldScreen from "../ui/world/CreateWorldScreen";
import { WorldDetailsScreen } from "../ui/world/WorldDetailsScreen";
import { CosmicTheme } from "../ui/themes/CosmicTheme";
import CharactersScreen from "../ui/character/CharactersScreen";
import { CharacterDetailsScreen } from "../ui/character/CharacterDetailsScreen";
import CreateCharacterScreen from "../ui/character/CreateCharacterScreen";
import StoryScreen from "../ui/story/StoryScreen";
import CreateStoryScreen from "../ui/story/CreateStoryScreen";
import { StoryDetailsScreen } from "../ui/story/StoryDetailsScreen";
import StoriesScreen from "../ui/story/StoryScreen";

export type RootStackParamList = {
  Worlds: undefined;
  WorldDetails: { id: string };
  CreateWorld: undefined;
  Characters: undefined;
  CharacterDetails: {id: string};
  CreateCharacter: undefined;
  Stories: undefined;
  StoryDetails: {id:string};
  CreateStory: undefined;
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
      <Stack.Screen name="Characters" component={CharactersScreen} />
      <Stack.Screen name="CharacterDetails" component={CharacterDetailsScreen}options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: CosmicTheme.colors.deepSpace,
          },
          headerTintColor: CosmicTheme.colors.starWhite,
          headerTitle: "",
        }}
      />
      <Stack.Screen name="CreateCharacter" component={CreateCharacterScreen}/>
      <Stack.Screen name="Stories" component={StoriesScreen} />
      <Stack.Screen name="StoryDetails" component={StoryDetailsScreen}options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: CosmicTheme.colors.deepSpace,
          },
          headerTintColor: CosmicTheme.colors.starWhite,
          headerTitle: "",
        }}
      />
      <Stack.Screen name="CreateStory" component={CreateStoryScreen}/>

    </Stack.Navigator>
    
  );
};