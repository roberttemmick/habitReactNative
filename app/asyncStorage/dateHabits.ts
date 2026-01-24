import { Alert } from 'react-native';
import { DateHabit, Habit, HabitEntry } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createDateHabits = async (
  dateHabits: Array<Partial<DateHabit>>,
  habits: Habit[],
) => {
  const resultArray: DateHabit[] = [];
  const keyValuePairs: Array<[string, string]> = [];

  for (const dh of dateHabits) {
    const habitEntries: HabitEntry[] = habits.map(h => ({
      id: h.id,
      habitEntryId: `${dh.dateId}:${h.id}`, // local deterministic ID
      name: h.name,
      completed: null,
      archived: h.archived,
      sortOrder: h.sortOrder,
    }));

    const dateHabit: DateHabit = {
      dateId: dh.dateId!,
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

   return fetchDateHabits();
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to create dateHabits: ${error.message}`);
    }

    return [];
  }
};

export const fetchDateHabits = async () => {
  try {
    let dateHabits: DateHabit[] = [];
    const keys = await AsyncStorage.getAllKeys().then(allKeys => allKeys.filter(key => key.startsWith('dateHabits:')));
    const results = await AsyncStorage.multiGet(keys);

    dateHabits = results.map(([, value]) => {
      return JSON.parse(value || '{}');
    });

    return dateHabits;
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to fetch dateHabits: ${error.message}`);
    }

    return [];
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
