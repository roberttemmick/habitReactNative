import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Calendar from '../components/Calendar';
import HabitsList from '../components/HabitsList';
import moment from 'moment';

function WelcomeScreen(): React.JSX.Element {
  const selectedDate = new Date();
  const todayFormatted = moment().format('MMM Do YYYY');
  const selectedDateFormatted = moment(selectedDate).format('MMM Do YYYY');
  return (
    <SafeAreaView style={{height: '100%'}}>
      <View style={{flex: 2}}>
        <Calendar />
      </View>

      <Text style={styles.date}>
        {selectedDateFormatted === todayFormatted
          ? 'Today'
          : selectedDateFormatted}
      </Text>

      <View style={{flex: 3}}>
        <HabitsList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  date: {
    marginVertical: 32,
    fontSize: 32,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
