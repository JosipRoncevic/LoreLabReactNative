import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { CosmicTheme } from '../themes/CosmicTheme';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from '@react-navigation/core';
import { useCallback } from 'react';
import { useCharacterDetailsViewModel } from '../../viewmodels/character_vm/useCharacterDetailsViewModel';
import { useDeleteCharacterViewModel } from '../../viewmodels/character_vm/useDeleteCharacterViewModel';

export function CharacterDetailsScreen({ route, navigation }: any) {
  const { id } = route.params;
  const { character, loading, reload } =
  useCharacterDetailsViewModel(id);
  const {deleteCharacter} = useDeleteCharacterViewModel(); 

  useFocusEffect(
  useCallback(() => {
    reload();
  }, [reload])
);

  if (loading || !character) {
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
    if(character){
      navigation.navigate("CreateCharacter", {
      mode: "edit",
      characterId: character.id,
      name: character.name,
      backstory: character.backstory,
      worldId: character.worldRef?.id ?? null,
    });
    }
    
  }

   function onDelete() {
     Alert.alert(
       "Delete Character",
       "Are you sure you want to delete this character? This action cannot be undone.",
       [
         { text: "Cancel", style: "cancel" },
         {
           text: "Delete",
           style: "destructive",
           onPress: async () => {
             await deleteCharacter(id);
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
  
</TouchableOpacity>

      {/* World Card */}
      <View style={[CosmicTheme.containers.listItem2, { padding: 20 }]}>
        <Text style={CosmicTheme.text.heading}>
          {character.name}
        </Text>

        <Text
          style={[
            CosmicTheme.text.body,
            { marginTop: 12, lineHeight: 22 },
          ]}
        >
          {character.backstory}
        </Text>

      {character.world ? (
  <View style={{ marginTop: 12 }}>
    <TouchableOpacity
  activeOpacity={0.8}
  onPress={() => {
  }}
  style={{
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: CosmicTheme.colors.galaxyPink,
  }}
>
  <Text
    style={{
      color: CosmicTheme.colors.starWhite,
      fontSize: 14,
      fontWeight: "600",
    }}
  >
    World: {character.world.name}
  </Text>
</TouchableOpacity>
  </View>
) : (
  <Text
    style={[
      CosmicTheme.text.body,
      { marginTop: 12, fontStyle: "italic" },
    ]}
  >
    No world assigned
  </Text>
)}

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
          Created on: {character.createdOn.toLocaleDateString()}
        </Text>

        <Text
          style={[
            CosmicTheme.text.listSubtitle,
            { fontStyle: 'italic', marginTop: 6 },
          ]}
        >
          Updated on: {character.updatedOn.toLocaleDateString()}
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