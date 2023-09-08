import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, login } from '../redux/action';
import Loader from '../components/Loader';

const Login = ({ navigation, route }) => {

  const { isAuthenticated, error, loading} = useSelector(state => state.auth)

  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const loginHandler = () => {
    if (!email || !password) {
      return Alert.alert("Enter All fields", "Email or Password Field is empty")
    }
    dispatch(login(email, password))
  }
  
  useEffect(() => {
    dispatch(loadUser())
    // console.log(isAuthenticated, error)
    if (error) {
      alert(error)  
      dispatch({type: "clearError"})
    }
  }, [error, dispatch, alert])

  return (loading ? (
    <Loader />
  ) :
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
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.button}
          disabled={loading}
                loading={loading}
          onPress={loginHandler}>
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
