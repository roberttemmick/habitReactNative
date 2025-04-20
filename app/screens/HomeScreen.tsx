import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CalendarWrapper from '../components/calendar/CalendarWrapper';
import HabitsList from '../components/HabitsList';
import moment from 'moment';
import {fromDateId, toDateId} from '@marceloterreiro/flash-calendar';
import {ScrollView} from 'react-native';
import {DateHabit} from '../types/types';
import {MOCKDATA} from '../lib/mockData';

function HomeScreen(): React.JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateFormatted = moment(selectedDate).format('MMM Do YYYY');
  const todayFormatted = moment().format('MMM Do YYYY');

  const dateHabits = MOCKDATA;

  const getSelectedDateHabit = useCallback((dateId: string): DateHabit => {
    return (
      dateHabits.find((dateHabit: DateHabit) => {
        return dateHabit.dateId === dateId;
      }) || {dateId: toDateId(selectedDate), completed: false, habits: []}
    );
  }, [dateHabits, selectedDate]);

  const [selectedDateHabit, setSelectedDateHabit] = useState(
    getSelectedDateHabit(toDateId(selectedDate)),
  );

  const handleSelectedDateChanged = (dateId: string) => {
    console.log('dateId', dateId);
    setSelectedDate(fromDateId(dateId));
    // setSelectedDateHabit(getSelectedDateHabit(dateId));
    console.log('getSelectedDateHabit', getSelectedDateHabit(dateId));
  };

  useEffect(() => {
    setSelectedDateHabit(getSelectedDateHabit(toDateId(selectedDate)));
    console.log('selectedDateHabit', selectedDateHabit);
  }, [selectedDate, selectedDateHabit, getSelectedDateHabit]);

  const getStreakCount = (): number => {
    let counter = 0;

    for (let i = 1; i < dateHabits.length; i++) {
      dateHabits[i].completed && counter++;
    }

    return counter;
  };

  return (
    <ScrollView style={styles.contentWrapper}>
      <View>
        <CalendarWrapper
          selectedDateHabit={selectedDateHabit}
          streakCount={getStreakCount()}
          emitSelectedDateChangedEvent={handleSelectedDateChanged}
        />
      </View>

      <Text style={styles.date}>
        {selectedDateFormatted === todayFormatted
          ? 'Today'
          : selectedDateFormatted}
      </Text>

      <View>
        <HabitsList habits={selectedDateHabit.habits} />
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
