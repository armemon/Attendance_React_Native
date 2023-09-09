import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {RadioButton} from 'react-native-paper';
import {Button, Input} from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import {editMeeting, loadMeetingDataset} from '../redux/action';

const ViewAttendance = ({route}) => {
  const { meetingDataset, loading1 } = useSelector(state => state.dataset);
  const { user } = useSelector(state => state.auth);
  const datasets = meetingDataset;
  const [selectedDataset, setSelectedDataset] = useState((user.domain == "Excom" || user.domain == "HR") ? 'IT' : user.domain);
  const [selectedMeetingID, setSelectedMeetingID] = useState('');
  const [editingMemberIndex, setEditingMemberIndex] = useState(-1);
  const [editedMembers, setEditedMembers] = useState({});
  const [rowOpacities, setRowOpacities] = useState({});
  

  useEffect(() => {
      setSelectedMeetingID(datasets[selectedDataset][0]['_id']);
  }, [selectedDataset ]);

  useEffect(() => {
    setRowOpacities({});
  }, [meetingDataset, selectedDataset ]);

  const dispatch = useDispatch()
  const handleSaveChanges = async (editedMemberID) => {
    // Update the dataset with the new values
    setRowOpacities(prevOpacities => ({
      ...prevOpacities,
      [editedMemberID]: true, // Set to true to reduce opacity
    }));
    await dispatch(editMeeting(selectedDataset, selectedMeetingID, editedMemberID, editedMembers))
    dispatch(loadMeetingDataset())
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.pickerContainer}>
        {(user.domain == "Excom" || user.domain == "HR") &&
          <Picker
            style={styles.picker}
            selectedValue={selectedDataset}
            onValueChange={itemValue => setSelectedDataset(itemValue)}>
            {Object.keys(datasets).filter(key => key !== '_id' && key !== '__v').map(option => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        }
          <Picker
            style={styles.picker}
            selectedValue={selectedMeetingID}
            onValueChange={(itemValue, itemIndex) => {
              setEditingMemberIndex(-1);
              setSelectedMeetingID(itemValue);
            }}>
            {datasets[selectedDataset].map(option => (
              <Picker.Item
                key={option._id}
                label={option.meetingName + ' - ' + option.date}
                value={option._id}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.memberList}>
          {datasets[selectedDataset]
            ?.find(
              meeting =>
                meeting._id === selectedMeetingID,
            )
            ?.members.map((memberData, memberIndex) => (
              <View
                key={memberData._id}
                style={[
                  styles.memberContainer,
                  memberData['present'] ? '' : styles.red,
                  rowOpacities[memberData._id] && { opacity: 0.5 },
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
                    disabled={loading1}
                loading={loading1}
                    onPress={() => {
                      // console.log('Save1', editedMembers);
                      handleSaveChanges( memberData._id);
                      setEditingMemberIndex(-1);
                    }}
                    buttonStyle={styles.editButton}
                  />
                ) : (
                  <Button
                    title="Edit"
                    onPress={() => {
                     const updatedEditedMembers = {
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
