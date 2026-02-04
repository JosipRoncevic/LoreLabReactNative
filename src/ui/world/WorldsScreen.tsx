import React, { useEffect } from "react";
import {View,Text,FlatList,TouchableOpacity,Alert, ImageBackground, StyleSheet,} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useWorldListViewModel } from "../../viewmodels/useWorldListViewModel";
import { CosmicTheme } from "../themes/CosmicTheme";
import Ionicons from "react-native-vector-icons/Ionicons";

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

    <View style={styles.content}>
      {loading && worlds.length === 0 && <Text>Loading...</Text>}
      {!loading && worlds.length === 0 && <Text>No worlds found</Text>}

      {!loading && worlds.length > 0 && (
        <FlatList
          data={worlds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
  <TouchableOpacity 
      onPress={() => navigation.navigate('WorldDetails', { id: item.id })}>
    <View style={styles.listItem}>
      
      <View style={styles.leftContent}>
  <Ionicons
    name="planet"
    size={40}
    color={CosmicTheme.colors.galaxyPink}
    style={styles.planetIcon}
  />

  <View style={styles.textContainer}>
    <Text style={CosmicTheme.text.listTitle}>
      {item.name}
    </Text>
    <Text style={CosmicTheme.text.listSubtitle}>
      {item.description}
    </Text>
  </View>
</View>



      <View style={styles.rightContent}>
        <TouchableOpacity>
          <Ionicons
            name="pencil"
            size={30}
            color={CosmicTheme.colors.editGreen}
            style={styles.actionIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="trash"
            size={30}
            color={CosmicTheme.colors.deleteRed}
            style={styles.actionIcon}
          />
        </TouchableOpacity>
      </View>

    </View>
  </TouchableOpacity>
)}

        />
      )}
    </View>

     { <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>＋</Text>
  </TouchableOpacity>}
  <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="planet"
          size={40}
          color={CosmicTheme.colors.starWhite}
          style={styles.planetIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="man"
          size={40}
          color={CosmicTheme.colors.starWhite}
          style={styles.planetIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="book"
          size={40}
          color={CosmicTheme.colors.starWhite}
          style={styles.planetIcon}
        />
      </TouchableOpacity>
    </View>

  </ImageBackground>
);
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listItem: {
    ...CosmicTheme.containers.listItem1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginVertical: 8,
  },

  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
  flexDirection: "column",
  flexShrink: 1,
},

  planetIcon: {
    marginRight: 12,
  },

  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionIcon: {
    marginLeft: 16,
  },
  fab: {
    position: "absolute",
    bottom: 70,
    right: 24,
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: "#6c63ff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  fabText: {
    fontSize: 50,
    color: "#fff",
    lineHeight: 34,
  },
  bottomNav: {
    height: 56,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    fontSize: 14,
  },
});
