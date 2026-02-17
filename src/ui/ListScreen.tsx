import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { CosmicTheme } from "./themes/CosmicTheme";

type Props<T> = {
  title: string;
  data: T[];
  loading: boolean;
  emptyText: string;
  onRefresh: () => void;
  onCreate: () => void;
  renderItem: (item: T) => React.ReactElement;
};

export function ListScreen<T>({
  title,
  data,
  loading,
  emptyText,
  onRefresh,
  onCreate,
  renderItem,
}: Props<T>) {
  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, [onRefresh])
  );

  return (
    <ImageBackground
      source={CosmicTheme.images.background}
      style={{ flex: 1 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={CosmicTheme.text.heading}>
          {title}
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {loading && data.length === 0 && (
          <Text>Loading...</Text>
        )}

        {!loading && data.length === 0 && (
          <Text>{emptyText}</Text>
        )}

        {!loading && data.length > 0 && (
          <FlatList
            data={data}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => renderItem(item)}
          />
        )}
      </View>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={onCreate}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {/* Bottom nav placeholder */}
      <View style={styles.bottomNav} />
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
  fab: {
    position: "absolute",
    bottom: 70,
    right: 24,
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: CosmicTheme.colors.galaxyPink,
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: {
    fontSize: 50,
    color: "#fff",
    lineHeight: 34,
  },
  bottomNav: {
    height: 56,
  },
});