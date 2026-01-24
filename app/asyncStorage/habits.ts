import {Alert} from 'react-native';
import {Habit} from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const createHabit = async (
//   userId: number,
//   name: string,
//   dateId: string,
//   sortOrder: number,
// ) => {
//   try {
//     const response = await api.post(`${route}`, {
//       userId,
//       name,
//       dateId,
//       sortOrder,
//     });
//     return response.data;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       Alert.alert('Something went wrong, please try again');
//       throw new Error(`Failed to create habit: ${error.message}`);
//     }
//   }
// };

// export const deleteHabit = async (
//   userId: number,
//   habitId: number,
//   dateId: string,
// ) => {
//   try {
//     const response = await api.put(`${route}/${userId}/${habitId}/${dateId}`);
//     return response.data;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       Alert.alert('Something went wrong, please try again');
//       throw new Error(`Failed to delete habit: ${error.message}`);
//     }
//   }
// };

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

// export const updateHabit = async (
//   userId: number,
//   habitId: number,
//   name: string,
//   sortOrder: number,
// ) => {
//   try {
//     const response = await api.put(`${route}`, {
//       userId,
//       habitId,
//       name,
//       sortOrder,
//     });
//     return response.data;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       Alert.alert('Something went wrong, please try again');
//       throw new Error(`Failed to update habit: ${error.message}`);
//     }
//   }
// };

// export const updateHabitsBatch = async (userId: number, habits: Habit[]) => {
//   try {
//     const response = await api.put(`${route}/batch-update`, {
//       userId,
//       habits,
//     });

//     return response.data;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       Alert.alert('Something went wrong, please try again');
//       throw new Error(`Failed to update habits: ${error.message}`);
//     }
//   }
// };
