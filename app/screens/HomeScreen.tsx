import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CalendarWrapper from '../components/calendar/CalendarWrapper';
import moment from 'moment';
import {fromDateId, toDateId} from '@marceloterreiro/flash-calendar';
import {DateHabit, HabitEntry} from '../types/types';
import {
  createDateHabits,
  fetchDateHabits,
  updateDateHabitCompleteState,
} from '../api/dateHabits';
import {useFocusEffect} from '@react-navigation/native';
import {fetchHabits} from '../api/habits';
import HabitEntriesList from '../components/HabitEntriesList';
import {getUserId} from '../api/auth';

function HomeScreen(): React.JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateFormatted = moment(selectedDate).format('MMM Do YYYY');
  const today = moment().startOf('day');
  const todayFormatted = today.format('MMM Do YYYY');
  const [dateHabits, setDateHabits] = useState<DateHabit[]>([]);
  const [streakCount, setStreakCount] = useState(0);

  const fetchData = async () => {
    try {
      const userId = await getUserId();

      if (userId) {
        const initialFetchResponse: DateHabit[] = await fetchDateHabits(userId);
        const lastDate = initialFetchResponse.length
          ? moment(
              fromDateId(
                initialFetchResponse[initialFetchResponse.length - 1].dateId,
              ),
            ).startOf('day')
          : moment(new Date(moment().subtract(2, 'day').toDate()));

        const dateDiff = lastDate.diff(today, 'day') || 0;
        if (!dateDiff) {
          setDateHabits(initialFetchResponse);
        } else {
          let newDateHabits = [];
          for (let i = dateDiff + 1; i < 1; i++) {
            newDateHabits.push({
              dateId: toDateId(new Date(moment().add(i, 'day').toDate())),
            });
          }
          const habits = await fetchHabits(userId);
          const secondaryFetchResponse = await createDateHabits(
            userId,
            newDateHabits,
            habits,
          );
          setDateHabits(initialFetchResponse.concat(secondaryFetchResponse));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const getSelectedDateHabit = useCallback(
    (dateId: string): DateHabit => {
      return (
        dateHabits.find((dateHabit: DateHabit) => {
          return dateHabit.dateId === dateId;
        }) || {
          dateId: toDateId(selectedDate),
          completed: false,
          habitEntries: [],
        }
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

  const handleDateHabitCompleteStateChange = async (
    habitEntries: HabitEntry[],
  ) => {
    const allTasksCompleted = habitEntries.every(task => task.completed);

    const updatedDateHabit = {
      ...selectedDateHabit,
      completed: allTasksCompleted,
      habitEntries,
    };

    setSelectedDateHabit(updatedDateHabit);
    setDateHabits(prev =>
      prev.map(d =>
        d.dateId === updatedDateHabit.dateId ? updatedDateHabit : d,
      ),
    );

    console.log('ISCOMPLETE', allTasksCompleted);
    const userId = await getUserId();
    await updateDateHabitCompleteState(
      userId!,
      selectedDateHabit.dateId,
      !!allTasksCompleted,
    );

    getStreakCount();
  };

  useEffect(() => {
    setSelectedDateHabit(getSelectedDateHabit(toDateId(selectedDate)));
  }, [selectedDate, getSelectedDateHabit]);

  const getStreakCount = useCallback((): number => {
    let counter = 0;
    let i = 0;
    if (getSelectedDateHabit(toDateId(new Date())).completed) {
      i = dateHabits.length - 1;
    } else {
      i = dateHabits.length - 2;
      counter++;
    }

    for (i; i > -1; i--) {
      if (dateHabits[i].completed) {
        counter++;
      } else {
        break;
      }
    }

    setStreakCount(counter);
    return counter;
  }, [dateHabits, getSelectedDateHabit]);

  useEffect(() => {
    getStreakCount();
  }, [selectedDateHabit, selectedDate, getStreakCount]);

  const calendarMinDateId = useMemo(() => {
    return dateHabits[0]?.dateId;
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
        <HabitEntriesList
          habitEntries={selectedDateHabit.habitEntries}
          emitCompletedStateChangeEvent={handleDateHabitCompleteStateChange}
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
