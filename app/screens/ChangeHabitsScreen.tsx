import React, {useEffect, useState} from 'react';
import AddHabitComponent from '../components/AddHabitComponent';
import {StyleSheet, View} from 'react-native';
import ChangeHabitsList from '../components/ChangeHabitsList';
import {Habit} from '../types/types';
import {createHabit, fetchHabits} from '../api/habits';
import {toDateId} from '@marceloterreiro/flash-calendar';

function ChangeHabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchHabits(1);
        console.log('HABITS', response);
        setHabits(response);
      } catch (err) {
        console.log('ERROR', err);
        // TODO: Handle error
      }
    };
    fetchData();
  }, []);

  const handleAddHabit = async (newHabitName: string) => {
    const response = await createHabit(
      1,
      newHabitName,
      toDateId(new Date()),
      habits.length,
    );
    const updatedHabitsList = habits.concat([response]);

    setHabits(updatedHabitsList);
  };
  return (
    <View style={styles.contentWrapper}>
      <AddHabitComponent addHabitEventEmitter={handleAddHabit} />

      <View style={styles.divider} />

      <ChangeHabitsList habits={habits} />
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {height: '100%', padding: '5%'},
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginHorizontal: '-5%',
    marginBottom: '5%',
  },
});

export default ChangeHabitsScreen;
