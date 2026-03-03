import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CosmicTheme } from "./themes/CosmicTheme";
import { useDeleteWorldViewModel } from "../viewmodels/world_vm/useDeleteWorldViewModel";

type Props = {
  world: any;
  navigation: any;
  onDeleted: () => void;
};

export function WorldListItem({
  world,
  navigation,
  onDeleted,
}: Props) {
  const { deleteWorld } =
    useDeleteWorldViewModel();

  function confirmDelete() {
    Alert.alert(
      "Delete World",
      `Are you sure you want to delete "${world.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteWorld(world.id);
            onDeleted();
          },
        },
      ]
    );
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("WorldDetails", {
          id: world.id,
        })
      }
    >
      <View style={styles.listItem}>
        <View style={styles.left}>
          <Ionicons
            name="planet"
            size={40}
            color={CosmicTheme.colors.galaxyPink}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={CosmicTheme.text.listTitle}>
              {world.name}
            </Text>
            <Text
              style={CosmicTheme.text.listSubtitle}
              numberOfLines={2}
            >
              {world.description || "No description"}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CreateWorld", {
                mode: "edit",
                worldId: world.id,
                name: world.name,
                description: world.description,
              })
            }
          >
            <Ionicons
              name="pencil"
              size={26}
              color={CosmicTheme.colors.editGreen}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={confirmDelete}>
            <Ionicons
              name="trash"
              size={26}
              color={CosmicTheme.colors.deleteRed}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    ...CosmicTheme.containers.listItem1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
});