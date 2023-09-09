import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {BarChart} from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const Chart = ({ route }) => {
  const { meetingDataset, datasetloading } = useSelector(state => state.dataset);
  const { user } = useSelector(state => state.auth);
  const datasets = meetingDataset;
  const datasetKeys = datasets ? Object.keys(datasets).filter(key => key !== '_id' && key !== '__v') : "";
  const [selectedDataset, setSelectedDataset] = useState((user.domain == "Excom" || user.domain == "HR") ? 'IT' : user.domain);
  const [chartData, setChartData] = useState([]);
  const [memberNames, setMemberNames] = useState([]);
  const [totalMeeting, setTotalMeeting] = useState();

  useEffect(() => {
    datasets && updateChartData(selectedDataset);
  }, [selectedDataset, meetingDataset]);

  const updateChartData = option => {
    const selectedDatasetData = datasets[option];
    const memberNames = selectedDatasetData[
      selectedDatasetData.length - 1
    ].members.map(member => member.name); // Get member names directly from the selected dataset
    const numberMeetings = datasets[option].length;
    const memberData = memberNames.map(name => {
      return selectedDatasetData.reduce(
        (sum, meeting) =>
          sum +
          (meeting.members.find(member => member.name === name)?.present
            ? 1
            : 0),
        0,
      );
    });
   
    setMemberNames(memberNames); 
    setChartData(memberData);
    setTotalMeeting(numberMeetings);
  };

 
  return (
    !datasets ? <Loader /> :
      <>
        <View style={styles.container}>
        {(user.domain == "Excom" || user.domain == "HR") &&
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedDataset}
          onValueChange={itemValue => setSelectedDataset(itemValue)}>
          { datasets && datasetKeys.map(option => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
     }
      <ScrollView
        horizontal={true}
      
        showsHorizontalScrollIndicator={false} 
      
        contentContainerStyle={styles.container}>
   
        <BarChart
          data={{
            labels: memberNames,
            datasets: [
              {
                data: chartData,
              },
              {
                data: [6], // Array with totalMeeting repeated for each member
                withDots: false,
              },
            ],
          }}
          width={Math.max(chartData.length * 60, 350)} 
          height={220} 
          yAxisLabel=""
          verticalLabelRotation={0}
          yAxisInterval={1}
          chartConfig={{
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            backgroundGradientFrom: '#05FA00',
            backgroundGradientFromOpacity: 0.2,
            backgroundGradientTo: '#5AE30B',
            backgroundGradientToOpacity: 0.5,
            extraMargin: {left: 40, right: 40},
          }}
          style={{
            marginTop: 30,
            marginLeft: 25,
            borderRadius: 0,
            paddingRight: 35,
          }}
        />
            </ScrollView>
            </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 300, 
    backgroundColor: '#5AE30B',
    borderRadius: 50,
  },
  pickerContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Chart;