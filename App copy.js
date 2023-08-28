
import { View, Text } from 'react-native';


import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/stack';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
// import Home from './components/Home'; // Import your home screen component
// import Teams from './components/Teams.js'; // Import your teams screen component
// import ViewAttendance from './components/ViewAttendance'; // Import your view attendance screen component
// import MarkAttendance from './components/MarkAttendance'; // Import your mark attendance screen component
// import Logout from './components/Logout'; // Import your logout screen component

// const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
    <Header />
    <Home />
      <Footer />
      </SafeAreaProvider >
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="Home"
    //     screenOptions={{
    //       header: (props) => <Header {...props} />,
    //     }}
    //   >
    //     <Stack.Screen name="Home" component={Home} />
    //     <Stack.Screen name="Teams" component={Teams} />
    //     <Stack.Screen name="ViewAttendance" component={ViewAttendance} />
    //     <Stack.Screen name="MarkAttendance" component={MarkAttendance} />
    //     <Stack.Screen name="Logout" component={Logout} />
    //   </Stack.Navigator>
    //   <Footer />
    // </NavigationContainer>

  );
};

export default App;







 /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

  // import React, {type PropsWithChildren} from 'react';
  // import {
  //   SafeAreaView,
  //   ScrollView,
  //   StatusBar,
  //   StyleSheet,
  //   Text,
  //   useColorScheme,
  //   View,
  // } from 'react-native';
  
  // import {
  //   Colors,
  //   DebugInstructions,
  //   Header,
  //   LearnMoreLinks,
  //   ReloadInstructions,
  // } from 'react-native/Libraries/NewAppScreen';
  
  // const Section: React.FC<
  //   PropsWithChildren<{
  //     title: string;
  //   }>
  // > = ({children, title}) => {
  //   const isDarkMode = useColorScheme() === 'dark';
  //   return (
  //     <View style={styles.sectionContainer}>
  //       <Text
  //         style={[
  //           styles.sectionTitle,
  //           {
  //             color: isDarkMode ? Colors.white : Colors.black,
  //           },
  //         ]}>
  //         {title}
  //       </Text>
  //       <Text
  //         style={[
  //           styles.sectionDescription,
  //           {
  //             color: isDarkMode ? Colors.light : Colors.dark,
  //           },
  //         ]}>
  //         {children}
  //       </Text>
  //     </View>
  //   );
  // };
  
  // const App = () => {
  //   const isDarkMode = useColorScheme() === 'dark';
  
  //   const backgroundStyle = {
  //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //   };
  
  //   return (
  //     <SafeAreaView style={backgroundStyle}>
  //       <StatusBar
  //         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  //         backgroundColor={backgroundStyle.backgroundColor}
  //       />
  //       <ScrollView
  //         contentInsetAdjustmentBehavior="automatic"
  //         style={backgroundStyle}>
  //         <Header />
  //         <View
  //           style={{
  //             backgroundColor: isDarkMode ? Colors.black : Colors.white,
  //           }}>
  //           <Section title="Step One">
  //             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
  //             screen and then come back to see your edits.
  //           </Section>
  //           <Section title="See Your Changes">
  //             <ReloadInstructions />
  //           </Section>
  //           <Section title="Debug">
  //             <DebugInstructions />
  //           </Section>
  //           <Section title="Learn More">
  //             Read the docs to discover what to do next:
  //           </Section>
  //           <LearnMoreLinks />
  //         </View>
  //       </ScrollView>
  //     </SafeAreaView>
  //   );
  // };
  
  // const styles = StyleSheet.create({
  //   sectionContainer: {
  //     marginTop: 32,
  //     paddingHorizontal: 24,
  //   },
  //   sectionTitle: {
  //     fontSize: 24,
  //     fontWeight: '600',
  //   },
  //   sectionDescription: {
  //     marginTop: 8,
  //     fontSize: 18,
  //     fontWeight: '400',
  //   },
  //   highlight: {
  //     fontWeight: '700',
  //   },
  // });
  
  // export default App;