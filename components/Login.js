import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter
} from 'react-native';
import {Input} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';


const Login = ({ navigation, route }) => {
  // Use navigation and route here
  // const { setAuthenticated } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <View style={styles.imgContainer}>
          <Image source={require('../assets/logo.png')} style={styles.avatar} />
        </View>
        <Text style={styles.heading}>ATTENDANCE SYSTEM</Text>
        <Input
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#999"
          // name="uname" // No need for this in React Native
          // required // No need for this in React Native
        />
        <Input
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#999"
          secureTextEntry
          // name="psw" // No need for this in React Native
          // required // No need for this in React Native
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
        DeviceEventEmitter.emit('Login', true);
            // setAuthenticated(true)
            // navigation.navigate('Home');
            // console.log('Log In Pressed');
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innercontainer: {
    borderWidth: 3,
    borderRadius: 30,
    borderColor: 'green',
    width: '90%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  heading: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
    color: 'green',
  },
  input: {
    // width: '80%',
    // height: 40,
    // backgroundColor: '#f0f0f0',
    // padding: 10,
    // marginVertical: 5,
    // borderRadius: 5,
  },
  button: {
    backgroundColor: 'green',
    width: 90,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Login;
