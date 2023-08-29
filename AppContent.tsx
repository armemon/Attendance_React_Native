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

import Login from './components/Login';
import Chart from './components/Home';
import Teams from './components/Teams';
import AddMember from './components/AddMember';
import MarkAttendance from './components/MarkAttendance';
import ViewAttendance from './components/ViewAttendance';
import Footer from './components/Footer';

import {initialDomainDatasets, initialDatasets} from './assets/data';

// const [domainDatasets, setDomainDataset] = useState(datasets)
// const [datasets, setDataset] = useState(domainDatasets)

const Drawer = createDrawerNavigator();
const navigation = useNavigation

export default function AppContent() {
  const [domainDatasets, setDomainDataset] = useState(initialDomainDatasets);
  const [datasets, setDatasets] = useState(initialDatasets);

  // export {datasets, domainDatasets, setDatasets, setDomainDataset}
  const addDomainDataset = members => {
    const updatedDomainDatasets = {...domainDatasets};
    members.forEach(member => {
      updatedDomainDatasets[member.domain].push({
        memberName: member.name,
        year: member.year,
      });
    });
    setDomainDataset(updatedDomainDatasets);
    // Now updatedDomainDatasets contains the updated data
    // console.log(domainDatasets);
  };

  useEffect(() => {
    const addDomainListener = DeviceEventEmitter.addListener(
      'addDomainDataset',
      eventData => {
        addDomainDataset(eventData);
      },
    );

    const editListener = DeviceEventEmitter.addListener(
      'EditDataset',
      (
        updatedData,
        selectedDataset,
        editedMemberIndex,
        selectedMeetingIndex,
      ) => {
        const updatedDatasets = {...datasets};
        updatedDatasets[selectedDataset][selectedMeetingIndex]['members'][
          editedMemberIndex
        ] = updatedData;
        setDatasets(updatedDatasets);
        // console.log('Emitted', datasets);
      },
    );

    const PushDatasetListener = DeviceEventEmitter.addListener(
      'PushDataset',
      (eventData, domain) => {
        const updatedDatasets = {...datasets};
        updatedDatasets[domain].push(eventData);
        setDatasets(updatedDatasets);
        // console.log('Emitted', datasets);
      },
    );
    const ShiftMemberListener = DeviceEventEmitter.addListener(
      'ShiftMember',
      eventData => {
        setDomainDataset(eventData);
        // console.log('Teams EMitted', domainDatasets);
      },
    );
    const DeleteMemberListener = DeviceEventEmitter.addListener(
      'DeleteMember',
      eventData => {
        setDomainDataset(eventData);
        // console.log('Teams EMitted', domainDatasets);
      },
    );

    return () => {
      addDomainListener.remove();
      editListener.remove();
      PushDatasetListener.remove();
      ShiftMemberListener.remove();
      DeleteMemberListener.remove();
    };
  }, []);

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
                    // AsyncStorage.clear();
                    DeviceEventEmitter.emit('Login', false);
                    // props.navigation.navigate('Login')
                    // navigation.navigate('Login');
                  },
                },
              ],
              {cancelable: false},
            )
          }
        />
        </>
      // </DrawerContentScrollView>
    );
  }
  // function CustomDrawerContent(props) {
  //   return (
  //     <>
  //      {/* <DrawerContentScrollView {...props}> */}
  //       <DrawerItemList {...props} />
  //        <DrawerItem label="Help" onPress={() => Alert.alert('Link to help')} />
  //      {/* </DrawerContentScrollView> */}
  //     </>
  //   );
  // }

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
                <Image
                  source={require('./assets/logo.png')}
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
                  AR Memon
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                  }}>
                  IT Director
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
          initialParams={{datasets}} // Pass the datasets as initialParams
        />
        <Drawer.Screen
          name="Teams"
          options={{
            drawerLabel: 'Teams',
            title: 'Teams',
            drawerIcon: () => <Icon name="group" size={30} color="#fff" />,
          }}
          component={Teams}
          initialParams={{domainDatasets}} // Pass the datasets as initialParams
        />
        <Drawer.Screen
          name="AddMember"
          options={{
            drawerLabel: 'Add Member',
            title: 'Add Member',
            drawerIcon: () => <Icon2 name="adduser" size={30} color="#fff" />,
          }}
          component={AddMember}
          initialParams={{domainDatasets}} // Pass the datasets as initialParams
        />
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
          initialParams={{domainDatasets}}
        />
        <Drawer.Screen
          name="ViewAttendance"
          options={{
            drawerLabel: 'View Attendance',
            title: 'View Attendance',
            drawerIcon: () => <Icon name="calendar" size={30} color="#fff" />,
          }}
          component={ViewAttendance}
          initialParams={{datasets}} // Pass the datasets as initialParams
        />
        {/* <Drawer.Screen
          name="Login"
          options={{
            drawerLabel: 'Log Out',
            title: 'Log In',
            drawerIcon: () => <Icon3 name="logout" size={30} color="#fff" />,
          }}
          component={Login}
        /> */}
      </Drawer.Navigator>
      <Footer />
    </SafeAreaProvider>
    // </NavigationContainer>
  );
}
