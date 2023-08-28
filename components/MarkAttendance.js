import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  DeviceEventEmitter,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
// import { Select, SelectItem } from '@ui-kitten/components';
import {RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import {SafeAreaView} from 'react-native-safe-area-context';

const MeetingForm = ({route}) => {
  const { domainDatasets } = route.params;
  console.log("Domain", domainDatasets)
  const [selectedDataset, setSelectedDataset] = useState('IT');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [meetingName, setMeetingName] = useState('');
  const [show, setShow] = useState(false);
  const [members, setMembers] = useState( domainDatasets[selectedDataset].map((member) => ({
    name: member.memberName,
    present: 0,
    rating: '0',
    reason: '',
  })),
  );

  useEffect(() => {
    setMembers(
      domainDatasets[selectedDataset].map((member) => ({
        name: member.memberName,
        present: 0,
        rating: '0',
        reason: '',
      })),
    );
  }, [selectedDataset, route, domainDatasets]);
  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSave = () => {
    if (meetingName.trim() == '') {
      Alert.alert('Please Write Meeting Name', "Meeting Name cannot be Empty");
    }
    else {
      const NewMeeting = { meetingName: meetingName, date: date, members: members };
      console.log('Submitted members:', NewMeeting);
      DeviceEventEmitter.emit('PushDataset', NewMeeting, selectedDataset);
      Alert.alert('Submitted', `Meeting ${meetingName} (${Date}) Attendance Marked`);
      setMembers(
        domainDatasets[selectedDataset].map((member) => ({
          name: member.memberName,
          present: 0,
          rating: '0',
          reason: '',
        })),
      );
      setMeetingName('');
      Alert.alert('Submitted', `Meeting ${meetingName} (${date}) Attendance Marked`);
    }
  };

  // console.log(Array.from({length: 11}).map((_, i) => ({label:`${i}`, value:`${i}`})))
  // console.log(Object.keys(datasets).map(option => ({ label: option , value:option  })))
  // console.log(Array.from({ length: domainDatasets[selectedDataset].length }, () => ({ })))
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.pickerContainer}>
          <Dropdown
            style={[styles.dropdown, styles.domainDropdown]}
            // placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={Object.keys(domainDatasets).map(option => ({
              label: option,
              value: option,
            }))}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            // placeholder="IT"
            // searchPlaceholder="Search..."
            value={selectedDataset}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={item => setSelectedDataset(item.value)}
            // renderItem={renderItem}
          />
        </View>

        <View style={styles.dateMeetingContainer}>
          <Button
            onPress={() => {
              setShow(true);
            }}
            title={'Date: ' + date}
          />

          {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode="date"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate;
                setShow(false);
                setDate(currentDate.toLocaleDateString());
              }}
            />
          )}
          <TextInput
            style={styles.searchInput}
            placeholder="Name of meeting"
            id="search"
            onChangeText={text => setMeetingName(text)}
            value= {meetingName}
          />
        </View>
        {domainDatasets[selectedDataset].map((member, index) => (
          <View key={index} style={styles.memberContainer}>
            <Text
              style={
                styles.memberName
              }>{`${member.memberName} (${member.year} Year) `}</Text>
            <RadioButton.Group
              value={members[index]?.present ?? 0}
              //  value="Absent"
              onValueChange={value => {
                handleMemberChange(index, 'present', value);
              }}>
              <View style={styles.radioRow}>
                <RadioButton.Item label="Present" value={1} />
                <RadioButton.Item label="Absent" value={0} />
              </View>
            </RadioButton.Group>
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Rating:</Text>

              <Dropdown
                style={styles.dropdown}
                // placeholderStyle={styles.placeholderStyle}
                // selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={Array.from({length: 11}).map((_, i) => ({
                  label: `${i}`,
                  value: `${i}`,
                }))}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="0"
                // searchPlaceholder="Search..."
                value={members[index]?.rating ?? 0}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={item =>
                  handleMemberChange(index, 'rating', item.value)
                }
                // renderItem={renderItem}
              />
            </View>
            <TextInput
              style={styles.reasonInput}
              placeholder="Reason for Absence (write NA for Present)"
              onChangeText={value => handleMemberChange(index, 'reason', value)}
              value={members[index]?.reason ?? ''}
            />
          </View>
        ))}
        <View style={styles.submitButtonContainer}>
          <Button title="Submit" onPress={handleSave} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 16,
    width: 90,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    // elevation: 2,
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  domainDropdown: {
    // flex:1,
    width: '90%',
  },
  // icon: {
  //   marginRight: 5,
  // },
  // item: {
  //   padding: 17,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // textItem: {
  //   flex: 1,
  //   fontSize: 16,
  // },
  // placeholderStyle: {
  //   fontSize: 16,
  // },
  // selectedTextStyle: {
  //   fontSize: 16,
  // },
  // iconStyle: {
  //   width: 20,
  //   height: 20,
  // },
  // inputSearchStyle: {
  //   height: 40,
  //   fontSize: 16,
  // },
  container: {
    flex: 1,
    padding: 20,
  },
  dateMeetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 8,
    alignSelf: 'flex-end',
  },
  memberContainer: {
    marginBottom: 20,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  select: {
    flex: 1,
    margin: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  inputLabel: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  input: {
    // flex: 1,
    width: 100,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 8,
    backgroundColor: 'white',
  },
  submitButtonContainer: {
    alignItems: 'center', // Center the button horizontally
    marginBottom: 50,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default MeetingForm;
