import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useWorldDetailsViewModel } from '../../viewmodels/world_vm/useWorldDetailsViewModel';
import { CosmicTheme } from '../themes/CosmicTheme';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from '@react-navigation/core';
import { useCallback } from 'react';
import { useDeleteWorldViewModel } from '../../viewmodels/world_vm/useDeleteWorldViewModel';
import { useWorldCharactersViewModel } from '../../viewmodels/character_vm/useWorldCharactersViewModel';

export function WorldDetailsScreen({ route, navigation }: any) {
  const { id } = route.params;
  const { world, loading, reload} = useWorldDetailsViewModel(id);
  const {deleteWorld} = useDeleteWorldViewModel(); 
  const {characters, loading: charactersLoading,} = useWorldCharactersViewModel(world?.id ?? null);

  useFocusEffect(
  useCallback(() => {
    reload();
  }, [reload])
);

  if (loading || !world) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: CosmicTheme.colors.deepSpace,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={CosmicTheme.text.body}>Loading...</Text>
      </View>
    );
  }

   function onEdit() {
    if(world){
      navigation.navigate("CreateWorld", {
      mode: "edit",
      worldId: world.id,
      name: world.name,
      description: world.description,
    });
    }
    
  }

  function onDelete() {
    Alert.alert(
      "Delete World",
      "Are you sure you want to delete this world? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteWorld(id);
            navigation.goBack();
          },
        },
      ]
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: CosmicTheme.colors.deepSpace,
        padding: 20,
      }}
    >

      {/* World Card */}
      <View style={[CosmicTheme.containers.listItem1, { padding: 20 }]}>
        <Text style={CosmicTheme.text.heading}>
          {world.name}
        </Text>

        <Text
          style={[
            CosmicTheme.text.body,
            { marginTop: 12, lineHeight: 22 },
          ]}
        >
          {world.description}
        </Text>

        <View style={{ marginTop: 24 }}>
  <Text style={CosmicTheme.text.heading}>
    Characters
  </Text>

  <View
    style={{
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginTop: 12,
    }}
  >
    {characters.map(character => (
      <TouchableOpacity
        key={character.id}
        onPress={() =>
          navigation.navigate("CharacterDetails", {
            id: character.id,
          })
        }
        style={{
          backgroundColor: CosmicTheme.colors.characterBlue,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 999, // bubble!
        }}
      >
        <Text
          style={{
            color: CosmicTheme.colors.starWhite,
            fontWeight: "600",
          }}
        >
          {character.name}
        </Text>
      </TouchableOpacity>
    ))}

    {!charactersLoading && characters.length === 0 && (
      <Text style={CosmicTheme.text.listSubtitle}>
        No characters in this world yet
      </Text>
    )}
  </View>
</View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: 'rgba(236, 72, 153, 0.3)',
            marginVertical: 16,
          }}
        />

        <Text
          style={[
            CosmicTheme.text.listSubtitle,
            { fontStyle: 'italic' },
          ]}
        >
          Created on: {world.createdOn.toLocaleDateString()}
        </Text>

        <Text
          style={[
            CosmicTheme.text.listSubtitle,
            { fontStyle: 'italic', marginTop: 6 },
          ]}
        >
          Updated on: {world.updatedOn.toLocaleDateString()}
        </Text>
      </View>

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          gap: 16,
        }}
      >
        {/* Edit */}
        <TouchableOpacity
          onPress={onEdit}
          style={{
            flex: 1,
            backgroundColor:
              CosmicTheme.colors.editGreen,
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Ionicons
            name="pencil"
            size={20}
            color={CosmicTheme.colors.starWhite}
          />
          <Text
            style={{
              color:
                CosmicTheme.colors.starWhite,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>

        {/* Delete */}
        <TouchableOpacity
          onPress={onDelete}
          style={{
            flex: 1,
            backgroundColor:
              CosmicTheme.colors.deleteRed,
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Ionicons
            name="trash"
            size={20}
            color={CosmicTheme.colors.starWhite}
          />
          <Text
            style={{
              color:
                CosmicTheme.colors.starWhite,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}