import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CalendarWrapper from '../components/calendar/CalendarWrapper';
import HabitsList from '../components/HabitsList';
import moment from 'moment';
import {fromDateId, toDateId} from '@marceloterreiro/flash-calendar';
import {DateHabit, Habit} from '../types/types';
import {MOCKDATEHABITS} from '../lib/mockData';

function HomeScreen(): React.JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateFormatted = moment(selectedDate).format('MMM Do YYYY');
  const todayFormatted = moment().format('MMM Do YYYY');

  const [dateHabits, setDateHabits] = useState<DateHabit[]>(MOCKDATEHABITS);

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
    const allTasksCompleted = habits.every(task => task.completed);

    const updatedDateHabit = {
      ...selectedDateHabit,
      completed: allTasksCompleted,
      habits,
    };

    setSelectedDateHabit(updatedDateHabit);
    setDateHabits(prev =>
      prev.map(d =>
        d.dateId === updatedDateHabit.dateId ? updatedDateHabit : d,
      ),
    );

    setStreakCount(getStreakCount());
  };

  useEffect(() => {
    setSelectedDateHabit(getSelectedDateHabit(toDateId(selectedDate)));
  }, [selectedDate, getSelectedDateHabit]);

  const getStreakCount = useCallback((): number => {
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
  }, [dateHabits, getSelectedDateHabit]);

  useEffect(() => {
    const isToday = toDateId(selectedDate) === toDateId(new Date());

    if (selectedDateHabit.completed && isToday) {
      setStreakCount(getStreakCount());
    }
  }, [selectedDateHabit, selectedDate, getStreakCount]);

  const [streakCount, setStreakCount] = useState(getStreakCount());

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
          streakCount={streakCount}
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
