import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CalendarComponent from '../components/calendar/Calendar';
import HabitsList from '../components/HabitsList';
import moment from 'moment';

function HomeScreen(): React.JSX.Element {
  const selectedDate = new Date();
  const todayFormatted = moment().format('MMM Do YYYY');
  const selectedDateFormatted = moment(selectedDate).format('MMM Do YYYY');
  return (
    <View style={styles.contentWrapper}>
      <View style={{flex: 2}}>
        <CalendarComponent />
      </View>

      <Text style={styles.date}>
        {selectedDateFormatted === todayFormatted
          ? 'Today'
          : selectedDateFormatted}
      </Text>

      <View style={{flex: 3}}>
        <HabitsList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {height: '100%', padding: '5%'},
  date: {
    marginVertical: 32,
    fontSize: 32,
    textAlign: 'center',
  },
});

export default HomeScreen;
