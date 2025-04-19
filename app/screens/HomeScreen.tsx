import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CalendarWrapper from '../components/calendar/CalendarWrapper';
import HabitsList from '../components/HabitsList';
import moment from 'moment';
import {fromDateId, toDateId} from '@marceloterreiro/flash-calendar';
import {ScrollView} from 'react-native';
import {DateHabit} from '../types/types';

const MOCKDATA = [
  {
    dateId: toDateId(new Date()),
    habits: [
      {id: '1', name: 'No sugar', completed: false},
      {id: '2', name: 'No alcohol', completed: true},
      {id: '3', name: 'Meditate', completed: null},
      {
        id: '4',
        name: 'Take medication really long one ahh why so long',
        completed: false,
      },
    ],
  },
];

function HomeScreen(): React.JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateFormatted = moment(selectedDate).format('MMM Do YYYY');
  const todayFormatted = moment().format('MMM Do YYYY');

  const getSelectedDateHabit = (dateId: string): DateHabit | undefined =>
    MOCKDATA.find((dateHabit: DateHabit) => {
      return dateHabit.dateId === dateId;
    });

  const [selectedDateHabit, setSelectedDateHabit] = useState(
    getSelectedDateHabit(toDateId(selectedDate)),
  );

  const handleSelectedDateChanged = (dateId: string) => {
    setSelectedDate(fromDateId(dateId));
    setSelectedDateHabit(getSelectedDateHabit(dateId));
  };

  return (
    <ScrollView style={styles.contentWrapper}>
      <View>
        <CalendarWrapper
          selectedDateHabit={selectedDateHabit}
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
