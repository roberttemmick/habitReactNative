import { Alert } from 'react-native';
import { Habit } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export const createHabit = async (
  name: string,
  sortOrder: number,
  habitId?: number,
) => {
  try {
    const habit: Habit = {
      id: habitId || uuid.v4(),
      name,
      sortOrder,
      archived: false,
    };

    try {
      await AsyncStorage.setItem(`habits:${habit.id}`, JSON.stringify(habit));

      return fetchHabits();
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Something went wrong, please try again');
        throw new Error(`Failed to create habits: ${error.message}`);
      }

      return [];
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to create habit: ${error.message}`);
    }
    return [];
  }
};

export const deleteHabit = async (
  habitId: number,
) => {
  try {
    return await AsyncStorage.removeItem(`habits:${habitId}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to delete habit: ${error.message}`);
    }

    return {};
  }
};

export const fetchHabits = async () => {
  try {
    let habits: Habit[] = [];
    const keys = await AsyncStorage.getAllKeys().then(allKeys => allKeys.filter(key => key.startsWith('habits:')));
    const results = await AsyncStorage.multiGet(keys);

    habits = results.map(([, value]) => {
      return JSON.parse(value || '{}');
    });

    return habits;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to fetch habits: ${error.message}`);
    }

    return [];
  }
};

export const updateHabit = async (
  habitId: number,
  name: string,
  sortOrder: number,
) => {
  return createHabit(name, sortOrder, habitId);
};

export const updateHabitsBatch = async (habits: Habit[]) => {
  const keyValuePairs: Array<[string, string]> = [];

  for(let habit of habits){
    keyValuePairs.push([`habits:${habit.id}`, JSON.stringify(habit)]);
  }

  try {
    await AsyncStorage.multiSet(keyValuePairs);

    return fetchHabits();
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to update habits: ${error.message}`);
    }

    return [];
  }
};
