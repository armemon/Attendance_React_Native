import {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteMember, loadDomainDataset, shiftMember} from '../redux/action';

const Teams = ({route}) => {
  const {domainDataset, error1, message1} = useSelector(state => state.dataset);
  const domainDatasets = domainDataset;
  const [selectedDataset, setSelectedDataset] = useState('IT');
  const [selectedNewDomain, setSelectedNewDomain] = useState(
    Array.from(
      {length: domainDatasets[selectedDataset].length},
      () => selectedDataset,
    ),
  );
  const [rowOpacities, setRowOpacities] = useState({});

  // useEffect(() => {
  //   // if (error1) {
  //   //   Alert.alert(error1);
  //   //   dispatch({type: 'clearError'});
  //   // }
  //   // if (message1) {
  //   //   Alert.alert(message1);
  //   //   dispatch({type: 'clearMessage1'});
  //   // }
  //   dispatch(loadDomainDataset());
  // }, [selectedDataset, domainDatasets, dispatch, error1, message1]);


  // Initialize opacities for all rows to false
  useEffect(() => {
    const initialOpacities = {};
    domainDatasets[selectedDataset].forEach(data => {
      initialOpacities[data._id] = false;
    });
    setRowOpacities(initialOpacities);
    setSelectedNewDomain(
      Array.from(
        {length: domainDatasets[selectedDataset].length},
        () => selectedDataset,
      ),
    );
  }, [selectedDataset]);

  const dispatch = useDispatch();

  const deletemember = async (id, index) => {
    // updatedDomainDatasets[selectedDataset].splice(memberIndex, 1);
    // console.log(id);
    setRowOpacities(prevOpacities => ({
      ...prevOpacities,
      [id]: true, // Set to true to reduce opacity
    }));
    await dispatch(deleteMember(selectedDataset, id));
    const newSelectedNewDomain = [...selectedNewDomain];
    newSelectedNewDomain.splice(index, 1);
    setSelectedNewDomain(newSelectedNewDomain);
    // DeviceEventEmitter.emit('DeleteMember', updatedDomainDatasets);
    // console.log(updatedDomainDatasets);
    dispatch(loadDomainDataset());
  };

  const shiftmember = async (id, newDomain, index) => {
    if (newDomain == selectedDataset) {
      Alert.alert('Not Shifted', 'New Domain is same as previous one');
    } else {
      // const member = updatedDomainDatasets[selectedDataset][memberIndex];
      // member.domain = newDomain;
      // updatedDomainDatasets[selectedDataset].splice(memberIndex, 1);

      // console.log(id);
      setRowOpacities(prevOpacities => ({
        ...prevOpacities,
        [id]: true, // Set to true to reduce opacity
      }));
      // updatedDomainDatasets[newDomain].push(member);
      await dispatch(shiftMember(selectedDataset, newDomain, id));
      const newSelectedNewDomain = [...selectedNewDomain];
      newSelectedNewDomain.splice(index, 1);
      setSelectedNewDomain(newSelectedNewDomain);
      // DeviceEventEmitter.emit('ShiftMember', updatedDomainDatasets);
      // console.log(updatedDomainDatasets);
      dispatch(loadDomainDataset());
    }
    
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          // ref={pickerRef}
          selectedValue={selectedDataset}
          onValueChange={itemValue => setSelectedDataset(itemValue)}>
          {Object.keys(domainDatasets)
            .filter(key => key !== '_id' && key !== '__v')
            .map(option => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
        </Picker>
      </View>

      <View style={styles.table}>
        <View style={[styles.row, styles.grayRow]}>
          <Text style={styles.headerCell}>#</Text>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.domainPicker}>Domain</Text>
          <Text style={styles.headerCell}>Shift</Text>
          <Text style={styles.headerCell}>Delete</Text>
        </View>
        {domainDatasets[selectedDataset].map((data, index) => (
          <View key={data._id} style={[
      styles.row,
      rowOpacities[data._id] && { opacity: 0.5 }, // Reduce opacity if rowOpacities[data._id] is true
    ]}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{data['memberName']}</Text>
            <Picker
              style={styles.domainPicker}
              selectedValue={selectedNewDomain[index]}
              onValueChange={itemValue => {
                const updatedSelectedNewDomain = [...selectedNewDomain];
                updatedSelectedNewDomain[index] = itemValue;
                setSelectedNewDomain(updatedSelectedNewDomain);
              }}>
              {Object.keys(domainDatasets)
                .filter(key => key !== '_id' && key !== '__v')
                .map(option => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
            </Picker>
            <TouchableOpacity
              onPress={() =>
                shiftmember(data._id, selectedNewDomain[index], index)
              } // Pass memberId (data._id) to shiftmember
              style={styles.shiftButton}>
              <Text style={styles.shiftButtonText}>Shift</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deletemember(data._id, index)} // Pass memberId (data._id) to deletemember
              style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  table: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
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
    marginLeft: -30,
  },
  cell: {
    flex: 1,
    // padding: 10,
    textAlign: 'center',
    width: 50,
  },
  dropdownText: {
    color: 'blue',
  },
  shiftButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'blue',
  },
  shiftButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  deleteButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'red',
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  pickerContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 300, // Adjust width as needed
    margin: 'auto',
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  domainPicker: {
    flex: 0,
    width: 110,
  },
});

export default Teams;
