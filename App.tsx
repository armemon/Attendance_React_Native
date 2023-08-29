import 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { DeviceEventEmitter} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AppContent from './AppContent';
import Login from './components/Login';
const AuthStack = createStackNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    
    const LoginListener = DeviceEventEmitter.addListener(
      'Login',
      eventData => {
        setAuthenticated(eventData);
        // console.log('Teams EMitted', domainDatasets);
      },
    );

    return () => {
      LoginListener.remove();
    
    };
  }, []);
  function AuthFlow() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
          // initialParams={{setAuthenticated}}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {authenticated ? <AppContent /> : <AuthFlow />}
      {/* <AppContent /> */}
    </NavigationContainer>
  );
}
