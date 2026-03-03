import React, { useEffect } from "react";
import {View,Text,FlatList,TouchableOpacity,Alert, ImageBackground, StyleSheet, Modal,} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CosmicTheme } from "../themes/CosmicTheme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CreateItemDialog } from "../dialogs/CreateItemDialog";
import { useFocusEffect } from "@react-navigation/core";
import { useAuthViewModel } from "../../auth/useAuthViewModel";
import { useWorldListViewModel } from "../../viewmodels/world_vm/useWorldListViewModel";
import { useDeleteWorldViewModel } from "../../viewmodels/world_vm/useDeleteWorldViewModel";

type Props = NativeStackScreenProps<any, "Worlds">;

export default function WorldsScreen({ navigation }: Props) {
  const { worlds, loadWorlds, loading } = useWorldListViewModel();
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  const { deleteWorld, loading: deleting } = useDeleteWorldViewModel();
  const { userEmail, logout } = useAuthViewModel();
  const [showProfileModal, setShowProfileModal] = React.useState(false);
  
  useFocusEffect(
  React.useCallback(() => {
    loadWorlds();
  }, [])
);

 return (

  <ImageBackground
    source={CosmicTheme.images.background}
    style={{ flex: 1 }}
  >
  <View style={styles.header}>
      <Text style={CosmicTheme.text.heading}>Worlds</Text>
          <TouchableOpacity onPress={() => setShowProfileModal(true)}>
          <Ionicons
            name="person-circle-outline"
            size={36}
            color={CosmicTheme.colors.starWhite}
          />
        </TouchableOpacity>

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
    {item.description ? (
  <Text
    style={CosmicTheme.text.listSubtitle}
    numberOfLines={2}
    ellipsizeMode="tail"
  >
    {item.description}
  </Text>
) : (
  <Text style={[CosmicTheme.text.listSubtitle, { opacity: 0.6 }]}>
    No description
  </Text>
)}
  </View>
</View>
      <View style={styles.rightContent}>
        <TouchableOpacity
  onPress={() =>
    navigation.navigate("CreateWorld", {
      mode: "edit",
      worldId: item.id,
      name: item.name,
      description: item.description,
    })
  }
>
  <Ionicons
    name="pencil"
    size={30}
    color={CosmicTheme.colors.editGreen}
    style={styles.actionIcon}
  />
</TouchableOpacity>
<TouchableOpacity
  onPress={() =>
    Alert.alert(
      "Delete World",
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {deleteWorld(item.id);
          loadWorlds();
          },
        },
      ]
    )
  }
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
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="man"
          size={40}
          color={CosmicTheme.colors.starWhite}
          style={styles.planetIcon}
          onPress={()=> navigation.navigate("Characters")}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="book"
          size={40}
          color={CosmicTheme.colors.starWhite}
          style={styles.planetIcon}
          onPress={()=> navigation.navigate("Stories")}

        />
      </TouchableOpacity>
    </View>

      <Modal
  visible={showProfileModal}
  transparent
  animationType="fade"
  onRequestClose={() => setShowProfileModal(false)} 
>
  <View style={styles.modalBackdrop}>
    <View style={styles.modalCard}>
      <Ionicons
        name="person-circle"
        size={64}
        color={CosmicTheme.colors.starWhite}
      />

      <Text style={styles.emailText}>{userEmail}</Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          logout();              
          setShowProfileModal(false);
        }}
      >
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowProfileModal(false)}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    <CreateItemDialog
       visible={showCreateDialog}
       onClose={() => setShowCreateDialog(false)}
       onCreateWorld={() => navigation.navigate("CreateWorld")} 
       onCreateCharacter={() => navigation.navigate("CreateCharacter")} 
       onCreateStory={()=> navigation.navigate("CreateStory")}
       />

  </ImageBackground>
);
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "80%",
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  emailText: {
    color: "#fff",
    marginVertical: 12,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#d9534f",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },
  closeText: {
    color: "#aaa",
    marginTop: 16,
  },
});