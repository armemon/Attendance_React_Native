import 'react-native-gesture-handler';
import {useState, useEffect} from 'react';
import {View, Text, Image, Alert, DeviceEventEmitter} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';

import Logout from './components/Logout';
import Chart from './components/Home';
import Teams from './components/Teams';
import AddMember from './components/AddMember';
import MarkAttendance from './components/MarkAttendance';
import ViewAttendance from './components/ViewAttendance';
import Footer from './components/Footer';

import {
  datasets,
  domainDatasets,
  setDatasets,
  setDomainDataset,
} from './assets/data';

// const [domainDatasets, setDomainDataset] = useState(datasets)
// const [datasets, setDataset] = useState(domainDatasets)

const Drawer = createDrawerNavigator();

export default function AppContent() {
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

    return () => {
      addDomainListener.remove();
      editListener.remove();
      PushDatasetListener.remove();
    };
  }, []);

  return (
    <>
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
                    backgroundColor:'white'
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
              <DrawerItemList {...props} />
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
        <Drawer.Screen
          name="Logout"
          options={{
            drawerLabel: 'Log Out',
            title: 'Log In',
            drawerIcon: () => <Icon3 name="logout" size={30} color="#fff" />,
          }}
          component={Logout}
        />
      </Drawer.Navigator>
      <Footer />
    </>
  );
}
