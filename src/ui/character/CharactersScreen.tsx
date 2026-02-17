import React, { useEffect } from "react";
import {View,Text,FlatList,TouchableOpacity,Alert, ImageBackground, StyleSheet,} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useWorldListViewModel } from "../../viewmodels/useWorldListViewModel";
import { CosmicTheme } from "../themes/CosmicTheme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CreateItemDialog } from "../dialogs/CreateItemDialog";
import { useFocusEffect } from "@react-navigation/core";
import { useDeleteWorldViewModel } from "../../viewmodels/useDeleteWorldViewModel";
import { useCharacterListViewModel } from "../../viewmodels/character_vm/useCharacterListViewModel";

type Props = NativeStackScreenProps<any, "Characters">;

export default function CharactersScreen({ navigation }: Props) {
  const { characters, loadCharacters, loading } = useCharacterListViewModel();
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  //const { deleteCharacter, loading: deleting } = useDeleteCharacterViewModel();

  useFocusEffect(
  React.useCallback(() => {
    loadCharacters();
  }, [])
);

 return (

  <ImageBackground
    source={CosmicTheme.images.background}
    style={{ flex: 1 }}
  >
  <View style={styles.header}>
      <Text style={CosmicTheme.text.heading}>Characters</Text>
  </View>

    <View style={styles.content}>
      {loading && characters.length === 0 && <Text>Loading...</Text>}
      {!loading && characters.length === 0 && <Text>No characters found</Text>}

      {!loading && characters.length > 0 && (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
  <TouchableOpacity 
      onPress={() => navigation.navigate('CharacterDetails', { id: item.id })}
      >
    <View style={styles.listItem}>
      
      <View style={styles.leftContent}>
  <Ionicons
    name="man"
    size={40}
    color={CosmicTheme.colors.storyGreen}
    style={styles.planetIcon}
  />

  <View style={styles.textContainer}>
    <Text style={CosmicTheme.text.listTitle}>
      {item.name}
    </Text>
    {item.backstory ? (
  <Text
    style={CosmicTheme.text.listSubtitle}
    numberOfLines={2}
    ellipsizeMode="tail"
  >
    {item.backstory}
  </Text>
) : (
  <Text style={[CosmicTheme.text.listSubtitle, { opacity: 0.6 }]}>
    No backstory
  </Text>
)}
  </View>
</View>
      <View style={styles.rightContent}>
        <TouchableOpacity
//   onPress={() =>
//     navigation.navigate("CreateCharacter", {
//       mode: "edit",
//       worldId: item.id,
//       name: item.name,
//       description: item.backstory,
//     })
//   }
>
  <Ionicons
    name="pencil"
    size={30}
    color={CosmicTheme.colors.editGreen}
    style={styles.actionIcon}
  />
</TouchableOpacity>
<TouchableOpacity
//   onPress={() =>
//     Alert.alert(
//       "Delete Character",
//       `Are you sure you want to delete "${item.name}"?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {deleteCharacter(item.id);
//           loadCharacters();
//           },
//         },
//       ]
//     )
//   }
>
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

     { <TouchableOpacity
  style={styles.fab}
  onPress={() => setShowCreateDialog(true)}>
  <Text style={styles.fabText}>＋</Text>
</TouchableOpacity>}

  <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="planet"
          size={40}
          color={CosmicTheme.colors.starWhite}
          style={styles.planetIcon}
          onPress={()=> navigation.navigate("Worlds")}

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
    {/* <CreateItemDialog
  visible={showCreateDialog}
  onClose={() => setShowCreateDialog(false)}
  onCreateCharacter={() =>
    navigation.navigate("CreateCharacter")
  }
/> */}

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
    ...CosmicTheme.containers.listItem2,
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
