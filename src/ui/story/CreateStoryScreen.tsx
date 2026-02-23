import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { CosmicTheme } from "../themes/CosmicTheme";
import { useCreateStoryViewModel } from "../../viewmodels/story_vm/useCreateStoryViewModel";

export default function CreateStoryScreen({ navigation, route }: any) {
  const {
    createStory,
    updateStory,
    loading,
    error,
  } = useCreateStoryViewModel();

  const isEditMode = route?.params?.mode === "edit";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEditMode) {
      setTitle(route.params.title ?? "");
      setContent(route.params.content ?? "");
    }
  }, [isEditMode, route.params]);

  async function onSave() {
    if (!title.trim()) return;

    if (isEditMode) {
      await updateStory(
        route.params.storyId,
        title,
        content
      );
    } else {
      await createStory(title, content);
    }

    navigation.goBack();
  }

  function onCancel() {
    navigation.goBack();
  }

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
    backgroundColor: "rgba(45, 27, 105, 0.4)",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(236, 72, 153, 0.3)",
    color: CosmicTheme.colors.starWhite,
    padding: 12,
    fontSize: 16,
  },

  textArea: {
    height: 140,
    textAlignVertical: "top",
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
    backgroundColor: "transparent",
  },

  cancelText: {
    color: CosmicTheme.colors.starWhite,
    fontSize: 16,
    fontWeight: "500",
  },

  createButton: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: CosmicTheme.colors.galaxyPink,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: CosmicTheme.colors.galaxyPink,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },

  createText: {
    color: CosmicTheme.colors.starWhite,
    fontSize: 16,
    fontWeight: "600",
  },
});