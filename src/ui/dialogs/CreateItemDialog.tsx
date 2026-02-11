import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreateWorld: () => void;
};

export function CreateItemDialog({
  visible,
  onClose,
  onCreateWorld,
}: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* Tap outside to close */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.dialog}>
        <Text style={styles.title}>Create</Text>

        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            onClose();
            onCreateWorld();
          }}
        >
          <Ionicons name="planet" size={24} color="#fff" />
          <Text style={styles.text}>World</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} disabled>
          <Ionicons name="person" size={24} color="#888" />
          <Text style={[styles.text, { color: "#888" }]}>
            Character (coming soon)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} disabled>
          <Ionicons name="book" size={24} color="#888" />
          <Text style={[styles.text, { color: "#888" }]}>
            Story (coming soon)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancel} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  dialog: {
    backgroundColor: "#1c1c2e",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 16,
    fontWeight: "600",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
  },

  cancel: {
    marginTop: 16,
    alignItems: "center",
  },

  cancelText: {
    color: "#aaa",
    fontSize: 16,
  },
});