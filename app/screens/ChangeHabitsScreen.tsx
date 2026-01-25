import {useEffect, useState} from 'react';
import AddHabitComponent from '../components/AddHabitComponent';
import {Alert, StyleSheet, View} from 'react-native';
import ChangeHabitsList from '../components/ChangeHabitsList';
import {Habit} from '../types/types';
import {toDateId} from '@marceloterreiro/flash-calendar';
import {getUserId} from '../api/auth';
import {useFeatureFlag} from '../services/featureFlagService';
import * as habitsApi from '../api/habits';
import * as habitsAsyncStorage from '../asyncStorage/habits';

function ChangeHabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const isFfLoggedInEnabled = useFeatureFlag('ffloggedin');

  useEffect(() => {
    const fetchData = async () => {
      let userId: number | null = null;

      try {
        if (isFfLoggedInEnabled) {
          userId = await getUserId();
        }

        let response: Habit[] = [];

        if (userId) {
          response = await habitsApi.fetchHabits(userId);
        } else {
          response = await habitsAsyncStorage.fetchHabits();
        }

        setHabits(response);
      } catch (err) {
        console.log(err);
        Alert.alert('Unable to retrieve habits', 'Please try again later');
      }
    };
    fetchData();
  }, [isFfLoggedInEnabled]);

  const handleAddHabit = async (newHabitName: string) => {
    let userId: number | null = null;

    if (isFfLoggedInEnabled) {
      userId = await getUserId();
    }

    if (userId) {
      const response: Habit = await habitsApi.createHabit(
        userId,
        newHabitName,
        toDateId(new Date()),
        habits.length,
      );
      const updatedHabitsList = habits.concat([response]);

      setHabits(updatedHabitsList);
    } else {
      const response: Habit[] = await habitsAsyncStorage.createHabit(
        newHabitName,
        habits.length,
      );

      setHabits(response);
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
