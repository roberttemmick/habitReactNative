import { Alert } from 'react-native';
import { DateHabit, Habit, HabitEntry } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createDateHabits = async (
  dateHabits: Array<Partial<DateHabit>>,
  habits: Habit[],
) => {
  const dhKeyValuePairs: Array<[string, string]> = [];
  const heKeyValuePairs: Array<[string, string]> = [];

  for (const dh of dateHabits) {
    const habitEntries: HabitEntry[] = [];

    for(const h of habits ) {
      const habitEntry: HabitEntry = {
        id: h.id,
        habitEntryId: `${dh.dateId}:${h.id}`, // local deterministic ID
        name: h.name,
        completed: null,
        archived: h.archived,
        sortOrder: h.sortOrder,
      };

      // Push to asyncStorage and habitEntries array
      const heStorageKey = `habitEntries:${habitEntry.habitEntryId}:`;
      heKeyValuePairs.push([
        heStorageKey,
        JSON.stringify(habitEntry),
      ]);
      habitEntries.push(habitEntry);
    }

    const dateHabit: DateHabit = {
      dateId: dh.dateId!,
      completed: false,
      habitEntries,
    };
    const dhStorageKey = `dateHabits:${dh.dateId}`;

    dhKeyValuePairs.push([
      dhStorageKey,
      JSON.stringify(dateHabit),
    ]);
  }

  try {
    console.log('SET DATE HABITS:', dhKeyValuePairs);

    await AsyncStorage.multiSet(dhKeyValuePairs);

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

    console.log('FETCHED DATE HABITS:', dateHabits);
    return dateHabits;
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to fetch dateHabits: ${error.message}`);
    }

    return [];
  }
};

// TODO: Test
export const updateDateHabitCompleteState = async (
  dateHabitId: string,
  dateHabit: DateHabit,
) => {
  try {
    console.log('UPDATE DATE HABIT ID:', dateHabitId);
    console.log(await AsyncStorage.getAllKeys());

    await AsyncStorage.setItem(dateHabitId, JSON.stringify(dateHabit));
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to update dateHabits: ${error.message}`);
    }
  }
};
