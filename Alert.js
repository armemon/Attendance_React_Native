import React from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';

const CustomAlert = ({ message, onClose }) => {
    // console.log("jjjkjjk")
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={!!message}
      onRequestClose={() => {
        onClose();
      }}>
      {/* {Alert.alert(message, : )} */}
      <View>
        <Text>{message}</Text>
        <TouchableOpacity onPress={() => onClose()}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomAlert;
