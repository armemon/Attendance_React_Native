import 'react-native-gesture-handler';
import {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

import AppContent from './AppContent';
import Logout from './components/Logout';
// const AuthStack = createStackNavigator();

// function AuthFlow() {
//   return (
//     <AuthStack.Navigator>
//       <AuthStack.Screen name="Logout" component={Logout} setAuthenticated={ setAuthenticated} />
//     </AuthStack.Navigator>
//   );
// }

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {/* {authenticated ? <AppContent /> : <AuthFlow />} */}
      <AppContent />
    </NavigationContainer>
  );
}

