import React from 'react';
import {
StyleSheet,
View,
Text,
Linking,
StyleProp,
TextStyle,
ViewStyle,
} from 'react-native';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type HeaderComponentProps = {
title: string;
view?: string;
};

type ParamList = {
Detail: {
  openDrawer: void;
};
};

const Header: React.FunctionComponent<HeaderComponentProps> = (props) => {

const docsNavigate = () => {
  Linking.openURL(`https://reactnativeelements.com/docs/${props.view}`);
};

const playgroundNavigate = () => {
  Linking.openURL(`https://@rneui/themed.js.org/#/${props.view}`);
};

return (
  <SafeAreaProvider>
  <GestureHandlerRootView>
    <HeaderRNE
      leftComponent={{
        icon: 'menu',
        color: '#fff',
      }}
      rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={docsNavigate}>
              <Icon name="description" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={playgroundNavigate}
            >
              <Icon type="antdesign" name="rocket1" color="white" />
            </TouchableOpacity>
          </View>
      }
      centerComponent={{ text: 'Header', style: styles.heading }}
      />
      </GestureHandlerRootView>
  </SafeAreaProvider>
);
};

const styles = StyleSheet.create({
headerContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#397af8',
  marginBottom: 20,
  width: '100%',
  paddingVertical: 15,
},
heading: {
  color: 'white',
  fontSize: 22,
  fontWeight: 'bold',
},
headerRight: {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5,
},
subheaderText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
});

export default Header;