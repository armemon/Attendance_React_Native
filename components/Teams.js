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

const Teams = ({route}) => {
  const {domainDatasets} = route.params;
  const [selectedDataset, setSelectedDataset] = useState('IT');
  const [selectedNewDomain, setSelectedNewDomain] = useState(
    Array.from(
      {length: domainDatasets[selectedDataset].length},
      () => selectedDataset,
    ),
  );

  useEffect(() => {
    setSelectedNewDomain(
      Array.from(
        {length: domainDatasets[selectedDataset].length},
        () => selectedDataset,
      ),
    );
  }, [selectedDataset, domainDatasets, route]);

  const deleteMember = (name, index) => {
    const updatedDomainDatasets = {...domainDatasets};
      const memberIndex = updatedDomainDatasets[selectedDataset].findIndex(
        member => member.memberName === name,
      );

      if (memberIndex !== -1) {
        updatedDomainDatasets[selectedDataset].splice(memberIndex, 1);
        const newSelectedNewDomain = [...selectedNewDomain];
        newSelectedNewDomain.splice(memberIndex, 1);
        setSelectedNewDomain(newSelectedNewDomain);
        DeviceEventEmitter.emit('DeleteMember', updatedDomainDatasets);
        // console.log(updatedDomainDatasets);
      } else {
        Alert.alert('Member not found', 'Member already deleted or Shifted');
      }
  };

  const shiftMember = (name, newDomain) => {
    if (newDomain == selectedDataset) {
      Alert.alert('Not Shifted', 'New Domain is same as previous one');
    } else {
      const updatedDomainDatasets = {...domainDatasets};
      const memberIndex = updatedDomainDatasets[selectedDataset].findIndex(
        member => member.memberName === name,
      );

      if (memberIndex !== -1) {
        const member = updatedDomainDatasets[selectedDataset][memberIndex];
        member.domain = newDomain;
        updatedDomainDatasets[selectedDataset].splice(memberIndex, 1);
        const newSelectedNewDomain = [...selectedNewDomain];
        newSelectedNewDomain.splice(memberIndex, 1);
        setSelectedNewDomain(newSelectedNewDomain);
        updatedDomainDatasets[newDomain].push(member);
        DeviceEventEmitter.emit('ShiftMember', updatedDomainDatasets);
        // console.log(updatedDomainDatasets);
      } else {
        Alert.alert('Member not found', 'Member already deleted or Shifted');
      }
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
          {Object.keys(domainDatasets).map(option => (
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
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{data['memberName']}</Text>
            <Picker
              style={styles.domainPicker}
              selectedValue={selectedNewDomain[index]}
              onValueChange={itemValue => {
                const updatedSelectedNewDomain = [...selectedNewDomain];
                updatedSelectedNewDomain[index] = itemValue;
                setSelectedNewDomain(updatedSelectedNewDomain);
                // console.log('Newdomain', selectedNewDomain);
              }}>
              {Object.keys(domainDatasets).map(option => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() =>
                shiftMember(data.memberName, selectedNewDomain[index])
              }
              style={styles.shiftButton}>
              <Text style={styles.shiftButtonText}>Shift</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteMember(data.memberName, index)}
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

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const Teams = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Welcome to the Teams Screen</Text>
//       <View style={styles.content}>
//         <Text style={styles.text}>
//           This is the content of your Teams screen.
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   content: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   text: {
//     fontSize: 18,
//     color: '#333',
//   },
// });

// export default Teams;
