import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { CosmicTheme } from "../themes/CosmicTheme";
import { useCreateStoryViewModel } from "../../viewmodels/story_vm/useCreateStoryViewModel";
import { useWorldListViewModel } from "../../viewmodels/world_vm/useWorldListViewModel";

export default function CreateStoryScreen({ navigation, route }: any) {
  const {
    createStory,
    updateStory,
    loading,
    error,
  } = useCreateStoryViewModel();

  const {
    worlds,
    loadWorlds,
  } = useWorldListViewModel();

  const isEditMode = route?.params?.mode === "edit";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedWorldId, setSelectedWorldId] = useState<string | null>(null);
  const [worldDropdownOpen, setWorldDropdownOpen] = useState(false);

  useEffect(() => {
  loadWorlds();
}, []);

  useEffect(() => {
    if (isEditMode) {
      setTitle(route.params.title ?? "");
      setContent(route.params.content ?? "");
      setSelectedWorldId(route.params.worldId ?? null);
    }
  }, [isEditMode, route.params]);

  async function onSave() {
    if (!title.trim()) return;

    if (isEditMode) {
      await updateStory(
        route.params.storyId,
        title,
        content,
        selectedWorldId
      );
    } else {
      await createStory(title, content, selectedWorldId);
    }

    navigation.goBack();
  }

  function onCancel() {
    navigation.goBack();
  }

  const selectedWorldName =
    selectedWorldId
      ? worlds.find(w => w.id === selectedWorldId)?.name
      : "No world";

  return (
    <ImageBackground
      source={CosmicTheme.images.background}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={CosmicTheme.text.heading}>
          {isEditMode ? "Edit Story" : "Create Story"}
        </Text>

        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Story title"
          placeholderTextColor="rgba(248,250,252,0.5)"
          style={styles.input}
        />

        {/* Content */}
        <Text style={styles.label}>Content</Text>
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Write your story..."
          placeholderTextColor="rgba(248,250,252,0.5)"
          multiline
          numberOfLines={6}
          style={[styles.input, styles.textArea]}
        />

        {/* World dropdown */}
        <Text style={styles.label}>World</Text>

        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => setWorldDropdownOpen(prev => !prev)}
        >
          <Text style={styles.dropdownHeaderText}>
            {selectedWorldName}
          </Text>
          <Text style={styles.dropdownArrow}>
            {worldDropdownOpen ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {worldDropdownOpen && (
          <View style={styles.dropdownBody}>
            <ScrollView style={{ maxHeight: 220 }}>
              {/* No world */}
              <TouchableOpacity
                style={[
                  styles.worldItem,
                  selectedWorldId === null && styles.worldItemSelected,
                ]}
                onPress={() => {
                  setSelectedWorldId(null);
                  setWorldDropdownOpen(false);
                }}
              >
                <Text style={styles.worldText}>No world</Text>
              </TouchableOpacity>

              {worlds.map(world => {
                const selected = selectedWorldId === world.id;

                return (
                  <TouchableOpacity
                    key={world.id}
                    style={[
                      styles.worldItem,
                      selected && styles.worldItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedWorldId(world.id);
                      setWorldDropdownOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.worldText,
                        selected && styles.worldTextSelected,
                      ]}
                    >
                      {world.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            disabled={loading}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.createButton,
              loading && { opacity: 0.6 },
            ]}
            onPress={onSave}
            disabled={loading}
          >
            <Text style={styles.createText}>
              {loading
                ? isEditMode
                  ? "Saving..."
                  : "Creating..."
                : isEditMode
                ? "Save"
                : "Create"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(11,12,26,0.85)",
  },

  label: {
    color: CosmicTheme.colors.starWhite,
    marginTop: 16,
    marginBottom: 6,
    fontSize: 14,
  },

  input: {
    backgroundColor: "rgba(45,27,105,0.4)",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(236,72,153,0.3)",
    color: CosmicTheme.colors.starWhite,
    padding: 12,
    fontSize: 16,
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(236,72,153,0.3)",
    backgroundColor: "rgba(45,27,105,0.4)",
  },

  dropdownHeaderText: {
    color: CosmicTheme.colors.starWhite,
    fontSize: 16,
  },

  dropdownArrow: {
    color: CosmicTheme.colors.starWhite,
    fontSize: 14,
  },

  dropdownBody: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(236,72,153,0.3)",
    backgroundColor: "rgba(11,12,26,0.95)",
  },

  worldItem: {
    padding: 14,
  },

  worldItemSelected: {
    backgroundColor: "rgba(236,72,153,0.25)",
  },

  worldText: {
    color: CosmicTheme.colors.starWhite,
    fontSize: 16,
  },

  worldTextSelected: {
    fontWeight: "600",
  },

  error: {
    color: CosmicTheme.colors.deleteRed,
    marginTop: 12,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 32,
    justifyContent: "space-between",
  },

  cancelButton: {
    flex: 1,
    marginRight: 12,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: CosmicTheme.colors.starWhite,
    paddingVertical: 14,
    alignItems: "center",
  },

  cancelText: {
    color: CosmicTheme.colors.starWhite,
    fontSize: 16,
  },

  createButton: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: CosmicTheme.colors.galaxyPink,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  createText: {
    color: CosmicTheme.colors.starWhite,
    fontSize: 16,
    fontWeight: "600",
  },
});