import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CalendarWrapper from '../components/calendar/CalendarWrapper';
import HabitsList from '../components/HabitsList';
import moment from 'moment';
import {fromDateId} from '@marceloterreiro/flash-calendar';
import { ScrollView } from "react-native";

function HomeScreen(): React.JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const todayFormatted = moment().format('MMM Do YYYY');
  const selectedDateFormatted = moment(selectedDate).format('MMM Do YYYY');

  const handleSelectedDateChanged = (dateId: string) => {
    setSelectedDate(fromDateId(dateId));
  };

  return (
    <ScrollView style={styles.contentWrapper}>
      <View>
        <CalendarWrapper
          emitSelectedDateChangedEvent={handleSelectedDateChanged}
        />
      </View>

      <Text style={styles.date}>
        {selectedDateFormatted === todayFormatted
          ? 'Today'
          : selectedDateFormatted}
      </Text>

      <View>
        <HabitsList />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {height: '100%', padding: '5%'},
  date: {
    marginVertical: 32,
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 200,
  },
});

export default HomeScreen;
