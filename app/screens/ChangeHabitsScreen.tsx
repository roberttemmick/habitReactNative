import React, {useState} from 'react';
import AddHabitComponent from '../components/AddHabitComponent';
import {StyleSheet, View} from 'react-native';
import ChangeHabitsList from '../components/ChangeHabitsList';
import {MOCKHABITS} from '../lib/mockData';
import {Habit} from '../types/types';

function ChangeHabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>(MOCKHABITS);

  const handleAddHabit = (newHabit: Habit) => {
    const updatedHabitsList = habits.concat([newHabit]);
    console.log('updatedhabitslist', updatedHabitsList);
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
