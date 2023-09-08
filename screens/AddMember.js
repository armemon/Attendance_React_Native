import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Counter from "react-native-counters";
import {DeviceEventEmitter} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addDomainMember, loadDomainDataset } from '../redux/action';
// import { ScrollView } from 'react-native-gesture-handler';

const AddMember = ({route}) => {
  const { domainDataset, loading1 , error1, message1} = useSelector(state => state.dataset);
  const domainDatasets = domainDataset;
  // const addDomainDataset = useContext(DomainDataContext);
  const [noAddNewMember, setNoAddNewMember] = useState(1);
  const [members, setMembers] = useState([
    {name: '', domain: 'IT', year: 'First'},
  ]);

  // useEffect(() => {
  //   // if (error1) {
  //   //   alert(error1);
  //   //   dispatch({type: 'clearError'});
  //   // }
  //   // if (message1) {
  //   //   alert(message1);
  //   //   dispatch({type: 'clearMessage1'});
  //   // }
  //   dispatch(loadDomainDataset());
  // }, [ domainDatasets, dispatch, error1, message1]);

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

  const dispatch = useDispatch()

  const updateMember = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const submitButton = () => {
    const membersWithNames = members.filter(member => member.name.trim() !== '');
    membersWithNames.forEach(member => {
      dispatch(addDomainMember(member.domain, member.name, member.year))
    })
    
    // Alert.alert('Members Added', `Added ${membersWithNames.length} Member(s)`);
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
              {Object.keys(domainDatasets).filter(key => key !== '_id' && key !== '__v').map(option => (
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
      <View style={styles.submitButtonContainer}>
      <Button
        style={styles.submitButton}
        onPress={()=> submitButton()}
        disabled={loading1}
                loading={loading1}
      title="Submit"
        />
        </View>
      
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
    // borderColor: '#ccc',
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
    width: 100,
  },
  submitButtonContainer: {
    alignItems: 'center', // Center the button horizontally
    // marginBottom: 50,
  },
  submitButtonText: {
    color: 'white',
  },
});

export default AddMember;
