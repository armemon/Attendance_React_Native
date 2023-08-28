import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>Developed by</Text>
        <Text style={styles.greenText}>IEEE PES NEDUET</Text>
        <Text style={[styles.greenText,{ fontWeight: 900, color: "white"}]}>IT TEAM</Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#151515',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  footerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
  greenText: {
    color: 'green',
    fontSize: 16,
    marginRight: 5,
  },
});

export default Footer;
  