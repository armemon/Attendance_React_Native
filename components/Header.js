import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsDropdownOpen(false));
    } else {
      setIsDropdownOpen(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const navigateToScreen = (screenName) => {
    // console.log(screenName);
    toggleDropdown(); // Close the dropdown after navigation
    // navigation.navigate(screenName);
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.containerFluid}>
        <TouchableOpacity style={styles.navbarToggler} onPress={toggleDropdown}>
          <Text style={styles.navbarTogglerIcon}>☰</Text>
        </TouchableOpacity>
        <Image
          style={styles.navLogo}
          source={require('./Images/Navbar-1.png')}
          alt="PES Logo"
        />
      </View>
      <Animated.View
        style={[
          styles.dropdownMenu,
          {
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-200, 0], // Slide in from the left side (half of the screen)
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={() => navigateToScreen('Home')}
        >
          <Text style={styles.dropdownItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={() => navigateToScreen('Teams')}
        >
          <Text style={styles.dropdownItemText}>Teams</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={() => navigateToScreen('ViewAttendance')}
        >
          <Text style={styles.dropdownItemText}>View Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={() => navigateToScreen('MarkAttendance')}
        >
          <Text style={styles.dropdownItemText}>Mark Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={() => navigateToScreen('Logout')}
        >
          <Text style={styles.dropdownItemText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    zIndex: 100,
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLogo: {
    width: 100,
    height: 40,
  },
  navbarToggler: {
    marginRight: 0,
    padding: 10,
  },
  navbarTogglerIcon: {
    fontSize: 20,
  },
  containerFluid: {
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    left: 0,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'lightgreen',
    width: '50%', // Half of the screen width
  },
  dropdownItem: {
    paddingVertical: 10,
    height : "100"
  },
  dropdownItemText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Header;