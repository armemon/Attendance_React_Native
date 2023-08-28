import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, DeviceEventEmitter} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {RadioButton} from 'react-native-paper';
import {Button, Input} from 'react-native-elements';

const ViewAttendance = ({route}) => {
  const {datasets} = route.params;
  const [selectedDataset, setSelectedDataset] = useState('IT');
  const [selectedMeeting, setSelectedMeeting] = useState('');
  const [selectedMeetingDate, setSelectedMeetingDate] = useState('');
  const [editingMemberIndex, setEditingMemberIndex] = useState(-1);
  const [editedMembers, setEditedMembers] = useState({});

  useEffect(() => {
    {
      setSelectedMeeting(datasets[selectedDataset][0]['meetingName']);
      setSelectedMeetingDate(datasets[selectedDataset][0]['date']);
    }
  }, [selectedDataset, datasets, route]);

  // useEffect(() => {
  //   return () => {
  //     DeviceEventEmitter.removeAllListeners('EditDataset');
  //   };
  // }, []);

  const handleSaveChanges = (editedMemberIndex, updatedData) => {
    // Update the dataset with the new values
    const updatedDatasets = {...datasets};
    const selectedMeetingIndex = updatedDatasets[selectedDataset].findIndex(
      meeting =>
        meeting.meetingName === selectedMeeting &&
        meeting.date === selectedMeetingDate,
    );
    // updatedDatasets[selectedDataset][selectedMeetingIndex].members[
    //   editedMemberIndex
    // ] = updatedData;
    // console.log('updatedData', updatedData);

    // console.log(
    //   'updatedDatasets',
    //   updatedDatasets[selectedDataset][selectedMeetingIndex],
    // );
    DeviceEventEmitter.emit(
      'EditDataset',
      updatedData,
      selectedDataset,
      editedMemberIndex,
      selectedMeetingIndex,
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedDataset}
            onValueChange={itemValue => setSelectedDataset(itemValue)}>
            {Object.keys(datasets).map(option => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>

          <Picker
            style={styles.picker}
            selectedValue={selectedMeetingDate}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedMeetingDate(itemValue);
              setSelectedMeeting(
                datasets[selectedDataset].find(
                  meeting => meeting.date === itemValue,
                )['meetingName'],
              );
            }}>
            {datasets[selectedDataset].map(option => (
              <Picker.Item
                key={option.meetingName + option.date}
                label={option.meetingName + ' - ' + option.date}
                value={option.date}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.memberList}>
          {datasets[selectedDataset]
            ?.find(
              meeting =>
                meeting.meetingName === selectedMeeting &&
                meeting.date === selectedMeetingDate,
            )
            ?.members.map((memberData, memberIndex) => (
              <View
                key={memberIndex}
                style={[
                  styles.memberContainer,
                  memberData['present'] ? '' : styles.red,
                ]}>
                <Text style={styles.memberName}>{memberData['name']}</Text>

                {editingMemberIndex === memberIndex ? (
                  // Display editable input fields if the member is being edited

                  <View>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Status:</Text>
                      <RadioButton.Group
                        value={editedMembers.present ? 'Present' : 'Absent'}
                        onValueChange={value => {
                          const updatedMembers = {...editedMembers};
                          updatedMembers.present = value === 'Present';
                          setEditedMembers(updatedMembers);
                        }}>
                        <View style={styles.radioRow}>
                          <RadioButton.Item label="Present" value="Present" />
                          <RadioButton.Item label="Absent" value="Absent" />
                        </View>
                      </RadioButton.Group>
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Reason:</Text>
                      <Input
                        style={styles.input}
                        value={editedMembers['reason']}
                        onChangeText={text => {
                          const updatedMembers = {...editedMembers};
                          updatedMembers['reason'] = text;
                          setEditedMembers(updatedMembers);
                        }}
                      />
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Rating:</Text>
                      <Input
                        style={styles.input}
                        value={editedMembers['rating'].toString()}
                        onChangeText={text => {
                          const updatedMembers = {...editedMembers};
                          updatedMembers['rating'] = text;
                          setEditedMembers(updatedMembers);
                        }}
                      />
                    </View>
                  </View>
                ) : (
                  // Display normal text if not editing
                  <View style={styles.memberDetails}>
                    <Text style={styles.detailText}>
                      Status: {memberData['present'] ? 'Present' : 'Absent'}
                      {memberData['reason'] ? ` (${memberData['reason']})` : ''}
                    </Text>
                    <Text style={styles.detailText}>
                      Rating: {memberData['rating'] + '/5'}
                    </Text>
                  </View>
                )}

                {editingMemberIndex === memberIndex ? (
                  <Button
                    title="Save"
                    onPress={() => {
                      // console.log('Save1', editedMembers);
                      handleSaveChanges(memberIndex, editedMembers);
                      setEditingMemberIndex(-1);
                    }}
                    buttonStyle={styles.editButton}
                  />
                ) : (
                  <Button
                    title="Edit"
                    onPress={() => {
                      updatedEditedMembers = {
                        name: memberData['name'],
                        present: memberData['present'] ? true : false,
                        reason: memberData['reason'],
                        rating: memberData['rating'],
                      };
                      setEditedMembers(updatedEditedMembers);
                      setEditingMemberIndex(memberIndex);
                    }}
                    buttonStyle={styles.editButton}
                  />
                )}
              </View>
            )) ?? (
            <Text>No members found for the selected meeting and date.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 300,
    margin: 'auto',
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  memberList: {
    padding: 10,
  },
  memberContainer: {
    marginBottom: 20,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
  },
  detailText: {
    flex: 1,
    textAlign: 'center',
  },

  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  memberDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  red: {
    backgroundColor: 'red',
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
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: 'blue',
    marginTop: 10,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default ViewAttendance;
