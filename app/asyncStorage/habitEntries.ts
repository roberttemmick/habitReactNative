import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const updateHabitEntry = async (
  habitEntryId: number,
  completed: boolean,
) => {
  try {

    const response = await AsyncStorage.setItem('habitEntries:', JSON.stringify({
      id: habitEntryId,
      completed,
    }));

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to update habitEntry: ${error.message}`);
    }

    return {};
  }
};
