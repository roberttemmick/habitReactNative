import { Alert } from 'react-native';
import { DateHabit, Habit } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createDateHabits = async (
  dateHabits: Array<Partial<DateHabit>>,
  habits: Habit[],
) => {
  const resultArray = [];
  const keyValuePairs: Array<[string, string]> = [];

  for (const dh of dateHabits) {
    const habitEntries = habits.map(h => ({
      id: h.id,
      habitEntryId: `${dh.dateId}:${h.id}`, // local deterministic ID
      name: h.name,
      completed: null,
    }));

    const dateHabit = {
      dateId: dh.dateId,
      completed: false,
      habitEntries,
    };

    const storageKey = `dateHabits:${dh.dateId}`;

    keyValuePairs.push([
      storageKey,
      JSON.stringify(dateHabit),
    ]);

    resultArray.push(dateHabit);
  }

  try {
    await AsyncStorage.multiSet(keyValuePairs);
    return resultArray;

  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to create dateHabits: ${error.message}`);
    }
  }
};

export const fetchDateHabits = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys().then(allKeys => allKeys.filter(key => key.startsWith('dateHabits:')));

    return await AsyncStorage.multiGet(keys);
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to fetch dateHabits: ${error.message}`);
    }
  }
};

export const updateDateHabitCompleteState = async (
  dateHabitId: string,
  dateHabit: DateHabit,
) => {
  try {
    return await AsyncStorage.setItem(dateHabitId, JSON.stringify(dateHabit));
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to update dateHabits: ${error.message}`);
    }
  }
};
