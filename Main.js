import 'react-native-gesture-handler';
import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import AppContent from './AppContent';
import Login from './screens/Login';
import {loadDomainDataset, loadMeetingDataset, loadUser} from './redux/action';
import Loader from './components/Loader';
// import CustomAlert from './components/Alert';
import {Alert} from 'react-native';
const AuthStack = createStackNavigator();

export default function Main() {
  const dispatch = useDispatch();
  const {isAuthenticated, loading} = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  // console.log(loading)
  function AuthFlow() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      </AuthStack.Navigator>
    );
  }
  return  (
    <NavigationContainer>
      {isAuthenticated ? <AppContent /> : <Login />}
      {/* { (message || message1 || error || error1) && (
  <CustomAlert
    message={message || message1 || error || error1}
    onClose={() => {
      dispatch({ type: "clearMessage" });
      dispatch({ type: "clearMessage1" });
      dispatch({ type: "clearError" });
      dispatch({ type: "clearError1" });
    }}
  />
)} */}
    </NavigationContainer>
  );
}
