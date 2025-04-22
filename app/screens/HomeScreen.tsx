import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CalendarWrapper from '../components/calendar/CalendarWrapper';
import HabitsList from '../components/HabitsList';
import moment from 'moment';
import {fromDateId, toDateId} from '@marceloterreiro/flash-calendar';
import {DateHabit, Habit} from '../types/types';
import {MOCKDATA} from '../lib/mockData';

function HomeScreen(): React.JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateFormatted = moment(selectedDate).format('MMM Do YYYY');
  const todayFormatted = moment().format('MMM Do YYYY');

  const dateHabits = MOCKDATA;

  const getSelectedDateHabit = useCallback(
    (dateId: string): DateHabit => {
      return (
        dateHabits.find((dateHabit: DateHabit) => {
          return dateHabit.dateId === dateId;
        }) || {dateId: toDateId(selectedDate), completed: false, habits: []}
      );
    },
    [dateHabits, selectedDate],
  );

  const [selectedDateHabit, setSelectedDateHabit] = useState(
    getSelectedDateHabit(toDateId(selectedDate)),
  );

  const handleSelectedDateChanged = (dateId: string) => {
    setSelectedDate(fromDateId(dateId));
  };

  const handleCompleteStateChange = (habits: Habit[]) => {
    selectedDateHabit.habits = habits;
    setSelectedDateHabit({...selectedDateHabit, habits});
  };

  useEffect(() => {
    setSelectedDateHabit(getSelectedDateHabit(toDateId(selectedDate)));
  }, [selectedDate, selectedDateHabit, getSelectedDateHabit]);

  const getStreakCount = (): number => {
    let counter = 0;

    if (getSelectedDateHabit(toDateId(new Date())).completed) {
      counter++;
    }

    let i = 1;
    while (i < dateHabits.length && dateHabits[i].completed) {
      counter++;
      i++;
    }

    return counter;
  };

  const calendarMinDateId = useMemo(() => {
    return dateHabits[dateHabits.length - 1].dateId;
  }, [dateHabits]);

  return (
    <ScrollView style={styles.contentWrapper}>
      <View>
        <CalendarWrapper
          calendarMinDateId={calendarMinDateId}
          dateHabits={dateHabits}
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
        <HabitsList
          habits={selectedDateHabit.habits}
          emitCompletedStateChangeEvent={handleCompleteStateChange}
        />
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
