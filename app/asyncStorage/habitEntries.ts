import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// TODO: Test
export const updateHabitEntry = async (
  habitEntryId: number,
  completed: boolean,
) => {
  try {

    console.log('updateHabitEntry id', habitEntryId);

    await AsyncStorage.setItem(`habitEntries:${habitEntryId}`, JSON.stringify({
      id: habitEntryId,
      completed,
    }));

    console.log(await AsyncStorage.getAllKeys());


  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to update habitEntry: ${error.message}`);
    }
  }
};
