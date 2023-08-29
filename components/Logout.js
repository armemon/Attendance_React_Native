import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Input} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';


const Logout = () => {
const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <View style={styles.imgContainer}>
          <Image source={require('../assets/logo.png')} style={styles.avatar} />
        </View>
        <Text style={styles.heading}>ATTENDANCE SYSTEM</Text>
        <Input
          style={styles.input}
          placeholder="Enter Username"
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
            navigation.navigate('Home');
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

export default Logout;
