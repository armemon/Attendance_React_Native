import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {BarChart} from 'react-native-chart-kit';

const Chart = ({route}) => {
  const {datasets} = route.params;
  const datasetKeys = Object.keys(datasets);
  const [selectedDataset, setSelectedDataset] = useState('IT');
  const [chartData, setChartData] = useState([]);
  const [memberNames, setMemberNames] = useState([]);
  const [totalMeeting, setTotalMeeting] = useState();

  // console.log(datasetKeys);

  useEffect(() => {
    updateChartData(selectedDataset);
  }, [selectedDataset, route]);

  const updateChartData = option => {
    const selectedDatasetData = datasets[option];
    const memberNames = selectedDatasetData[0].members.map(member => member.name); // Get member names directly from the selected dataset
    const numberMeetings = datasets[option].length;
    const memberData = memberNames.map(name => {
      return selectedDatasetData.reduce(
        (sum, meeting) => sum + (meeting.members.find(member => member.name === name).present ? 1 : 0),
        0
      );
    });
  
    setMemberNames(memberNames); // Update memberNames in the state
    setChartData(memberData);
    setTotalMeeting(numberMeetings);
  };
  
  // const pickerRef = useRef();

  // function open() {
  //   pickerRef.current.focus();
  // }

  // function close() {
  //   pickerRef.current.blur();
  // }
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        // ref={pickerRef}
        selectedValue={selectedDataset}
        onValueChange={itemValue => setSelectedDataset(itemValue)}>
        {datasetKeys.map(option => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
      <BarChart
        data={{
          labels: memberNames,
          datasets: [
            {
              data: chartData,
            },
            {
              data: [totalMeeting], //highest graph value
              withDots: false, //a flage to make it hidden
            },
          ],
        }}
        yAxisInterval={10}
        width={370} // Adjust as needed
        height={220} // Adjust as needed
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          // labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          min: 0,
          max: '5', // Set the max value to the total number of meetings
          stepSize: 1, //
          backgroundGradientFrom: '#05FA00',
          backgroundGradientFromOpacity: 0.2,
          backgroundGradientTo: '#5AE30B',
          backgroundGradientToOpacity: 0.5,
          // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
          barPercentage: 1,
          // useShadowColorFromDataset: false, // optional
          extraMargin: { left: 40, right: 40 },
        }}
        style={{marginTop: 30, marginLeft: 30, borderRadius: 0, paddingRight: 35}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 300, // Adjust width as needed
    // height: 40, // Adjust height as needed
    backgroundColor: '#5AE30B',
    // borderWidth: 1,
    borderRadius: 50,
    marginBottom: 20, // Adjust margin as needed
    // paddingHorizontal: 10,
  },
});

export default Chart;

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const Home = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Welcome to the Home Screen</Text>
//       <View style={styles.content}>
//         <Text style={styles.text}>
//           This is the content of your Home screen.
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

// export default Home;
