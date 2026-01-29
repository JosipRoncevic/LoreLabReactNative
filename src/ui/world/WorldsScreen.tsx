import React, { useEffect } from "react";
import {View,Text,FlatList,TouchableOpacity,Alert, ImageBackground, StyleSheet,} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useWorldListViewModel } from "../../viewmodels/useWorldListViewModel";
import { CosmicTheme } from "../themes/CosmicTheme";

type Props = NativeStackScreenProps<any, "Worlds">;

export default function WorldsScreen({ navigation }: Props) {
  const { worlds, loadWorlds, loading } = useWorldListViewModel();

  useEffect(() => {
    loadWorlds();
  }, []);

 return (

  <ImageBackground
    source={CosmicTheme.images.background}
    style={{ flex: 1 }}
  >
  <View style={styles.header}>
      <Text style={CosmicTheme.text.heading}>Worlds</Text>
  </View>


    {loading && worlds.length === 0 && (
      <Text>Loading...</Text>
    )}

    {!loading && worlds.length === 0 && (
      <Text>No worlds found</Text>
    )}

    {!loading && worlds.length > 0 && (
      <FlatList
        data={worlds}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity>
             <Text style={CosmicTheme.text.listTitle}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    )}
  </ImageBackground>
);
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6c63ff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  fabText: {
    fontSize: 32,
    color: "#fff",
    lineHeight: 34,
  },
});
