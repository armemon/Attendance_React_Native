import 'react-native-gesture-handler';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  DeviceEventEmitter,
  ScrollView,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';

import Login from './screens/Login';
import Chart from './screens/Home';
import Teams from './screens/Teams';
import AddMember from './screens/AddMember';
import MarkAttendance from './screens/MarkAttendance';
import ViewAttendance from './screens/ViewAttendance';
import Footer from './components/Footer';

// const [domainDatasets, setDomainDataset] = useState(datasets)
// const [datasets, setDataset] = useState(domainDatasets)
// Inside your React Native component
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadDomainDataset, loadMeetingDataset, loadUser, logout } from './redux/action';




const Drawer = createDrawerNavigator();
const navigation = useNavigation

export default function AppContent() {
  
  const { message, user, loading, error } = useSelector(state => state.auth);
  const { datasetloading, message1, error1 } = useSelector(state => state.dataset);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadDomainDataset())
    dispatch(loadMeetingDataset())
    if (error) {
      Alert.alert("User Error",error);
      dispatch({ type: "clearError" });
    }
    if (error1) {
      Alert.alert("Dataset Error",error1);
      dispatch({ type: "clearError1" });
    }
  
    if (message) {
      Alert.alert("User Message", message);
      dispatch({ type: "clearMessage" });
    }
    if (message1) {
      Alert.alert("Dataset Message", message1);
      dispatch({ type: "clearMessage1" });
    }

    return () => {
      dispatch(loadDomainDataset())
      dispatch(loadMeetingDataset())
    }
  }, [dispatch, error, error1, message, message1 ]);

  function CustomDrawerContent(props) {
    return (
      <>
      {/* <DrawerContentScrollView {...props}> */}
        <DrawerItemList {...props} />

        <DrawerItem
          labelStyle={{color: '#fff'}}
          icon={() => <Icon3 name="logout" size={30} color="#fff" />}
          label="Log Out"
          onPress={() =>
            Alert.alert(
              'Log out',
              'Do you want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    dispatch(logout())
                  },
                },
              ],
              {cancelable: false},
            )
          }
        />
        </>
    );
  }

  return (
    // <NavigationContainer>
    <SafeAreaProvider>
      <Drawer.Navigator
        drawerContent={props => {
          return (
            <SafeAreaView>
              <View
                style={{
                  height: 240,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 20,
                  borderBottomColor: 'lightgreen',
                  borderBottomWidth: 1,
                }}>
                 {/* {console.log(user.avatar)} */}
                <Image
                 
                  source={user.avatar.url ? { uri: user.avatar.url } : require('./assets/logo.png') }
                  style={{
                    height: 130,
                    width: 130,
                    borderRadius: 65,
                    // padding: 0,
                    backgroundColor: '#fff',
                  }}
                />
                <Text
                  style={{
                    fontSize: 22,
                    marginVertical: 6,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  {user.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                  }}>
                  {user.position || "Member"}
                </Text>
              </View>
              {/* <DrawerItemList {...props} /> */}
              <CustomDrawerContent {...props}/>
            </SafeAreaView>
          );
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: 'green',
            width: 250,
          },
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabelStyle: {
            color: '#fff',
          },
        }}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: () => <Icon name="home" size={30} color="#fff" />,
          }}
          component={Chart} 
        />
        {(user.domain == "Excom" || user.domain == "HR") &&
          <Drawer.Screen
            name="Teams"
            options={{
              drawerLabel: 'Teams',
              title: 'Teams',
              drawerIcon: () => <Icon name="group" size={30} color="#fff" />,
            }}
            component={Teams}
          />}
        {(user.domain == "Excom" || user.domain == "HR") &&
          <Drawer.Screen
            name="AddMember"
            options={{
              drawerLabel: 'Add Member',
              title: 'Add Member',
              drawerIcon: () => <Icon2 name="adduser" size={30} color="#fff" />,
            }}
            component={AddMember}
          />
        }
        <Drawer.Screen
          name="MarkAttendance"
          options={{
            drawerLabel: 'Mark Attendance',
            title: 'Mark Attendance',
            drawerIcon: () => (
              <Icon name="calendar-check-o" size={30} color="#fff" />
            ),
          }}
          component={MarkAttendance}
        />
        <Drawer.Screen
          name="ViewAttendance"
          options={{
            drawerLabel: 'View Attendance',
            title: 'View Attendance',
            drawerIcon: () => <Icon name="calendar" size={30} color="#fff" />,
          }}
          component={ViewAttendance}
        />
      </Drawer.Navigator>
      <Footer />
    </SafeAreaProvider>
    // </NavigationContainer>
  );
}
