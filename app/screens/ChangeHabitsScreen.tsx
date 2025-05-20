import {useEffect, useState} from 'react';
import AddHabitComponent from '../components/AddHabitComponent';
import {Alert, StyleSheet, View} from 'react-native';
import ChangeHabitsList from '../components/ChangeHabitsList';
import {Habit} from '../types/types';
import {createHabit, fetchHabits} from '../api/habits';
import {toDateId} from '@marceloterreiro/flash-calendar';
import {getUserId} from '../api/auth';

function ChangeHabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();

        if (userId) {
          const response = await fetchHabits(userId);
          setHabits(response);
        }
      } catch (err) {
        console.log(err);
        Alert.alert('Unable to retrieve habits', 'Please try again later');
      }
    };
    fetchData();
  }, []);

  const handleAddHabit = async (newHabitName: string) => {
    const userId = await getUserId();

    if (userId) {
      const response = await createHabit(
        userId,
        newHabitName,
        toDateId(new Date()),
        habits.length,
      );
      const updatedHabitsList = habits.concat([response]);
      setHabits(updatedHabitsList);
    }
  };

  const handleDeleteHabit = (id: number) => {
    const updatedHabits = habits.filter(habit => id !== habit.id);
    setHabits(updatedHabits);
  };

  return (
    <View style={styles.contentWrapper}>
      <AddHabitComponent addHabitEventEmitter={handleAddHabit} />

      <View style={styles.divider} />

      <ChangeHabitsList
        habits={habits}
        deleteHabitEventEmitter={handleDeleteHabit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {height: '100%', padding: '5%'},
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(160, 160, 160)',
    marginHorizontal: '-5%',
    marginBottom: '5%',
  },
});

export default ChangeHabitsScreen;
