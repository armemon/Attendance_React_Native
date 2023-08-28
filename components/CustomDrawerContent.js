import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props}>
      {/* Custom Navigation Item */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Add Member', { domainDatasets, addDomainDataset })}
      >
        <Text>Add Member</Text>
      </TouchableOpacity>

      {/* Divider or Other Custom Components */}
      <View style={{ borderBottomWidth: 1, borderColor: '#ccc' }} />

      {/* Existing Drawer Items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
