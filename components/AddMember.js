import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Counter from "react-native-counters";
import {DeviceEventEmitter} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

const AddMember = ({route}) => {
  const {domainDatasets} = route.params;
  // const addDomainDataset = useContext(DomainDataContext);
  const [noAddNewMember, setNoAddNewMember] = useState(1);
  const [members, setMembers] = useState([
    {name: '', domain: 'IT', year: 'First'},
  ]);

  const addNewMember = () => {
    const newMembers = Array.from({length: noAddNewMember}, () => ({
      name: '',
      domain: 'IT',
      year: 'First',
    }));
    const combinedMembers = [...members, ...newMembers];
    const trimmedMembers = combinedMembers.slice(0, noAddNewMember); // Keep only the desired number of members
    setMembers(trimmedMembers);
  };

  const updateMember = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };
  // useEffect(() => {
  //   return () => {
  //     DeviceEventEmitter.removeAllListeners('event.testEvent2');
  //   };
  // }, []);
  const submitButton = (e) => {
    const membersWithNames = members.filter(member => member.name.trim() !== '');
    DeviceEventEmitter.emit('addDomainDataset', membersWithNames);
    Alert.alert('Members Added', `Added ${membersWithNames.length} Member(s)`);
    setNoAddNewMember(1)
    addNewMember()
    setMembers([
      {name: '', domain: 'IT', year: 'First'},
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addNew}>
        
       
        <Counter start={1} value={noAddNewMember} onChange={value =>
          value > 0 ? setNoAddNewMember(value) : setNoAddNewMember(1)
        } min={1} max={99}  buttonStyle={{
          borderColor: 'green',
          borderWidth: 2,
        }}/>
        <TouchableOpacity style={styles.newMember} onPress={addNewMember}>
          <Text style={styles.newMemberText}>Add New Members</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.table}>
        <View style={[styles.row, styles.grayRow]}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Domain Name</Text>
          <Text style={styles.headerCell}>Year</Text>
        </View>
        {members.map((member, index) => (
          <View key={index} style={styles.row}>
            <TextInput
              style={styles.cell}
              placeholder="Name"
              value={member.name}
              onChangeText={text => updateMember(index, 'name', text)}
            />
            <Picker
              style={styles.cell}
              selectedValue={member.domain}
              onValueChange={value => updateMember(index, 'domain', value)}>
              {Object.keys(domainDatasets).map(option => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
            <Picker
              style={styles.cell}
              selectedValue={member.year}
              onValueChange={value => updateMember(index, 'year', value)}>
              <Picker.Item label="First" value="First" />
              <Picker.Item label="Second" value="Second" />
              <Picker.Item label="Third" value="Third" />
              <Picker.Item label="Fourth" value="Fourth" />
            </Picker>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => submitButton(members)}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addNew: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 20
  },
  noAddNewMember: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  newMember: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  newMemberText: {
    color: 'white',
  },
  table: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  grayRow: {
    backgroundColor: '#f2f2f2',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  submitButton: {
    alignSelf: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
  },
});

export default AddMember;
