import { Text, TouchableOpacity, View } from 'react-native';
import { useWorldDetailsViewModel } from '../../viewmodels/useWorldDetailsViewModel';
import { CosmicTheme } from '../themes/CosmicTheme';
import { AppNavigator } from '../../navigation/AppNavigator';
import { Icon } from 'react-native-vector-icons/Icon';

export function WorldDetailsScreen({ route }: any) {
  // const navigation = AppNavigator();
  const { id } = route.params;
  const { world, loading } = useWorldDetailsViewModel(id);

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: CosmicTheme.colors.deepSpace,
        padding: 20,
      }}
    >
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
  <Icon
    name="arrow-back"
    size={24}
    color={CosmicTheme.colors.starWhite}
  />
</TouchableOpacity> */}

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
    </View>
  );
}
