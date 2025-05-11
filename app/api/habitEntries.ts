import { Alert } from "react-native";
import api from './api';

const route = '/habit-entries';

export const updateHabitEntry = async (
  habitEntryId: number,
  completed: boolean,
) => {
  try {
    const response = await api.put(`${route}`, {
      habitEntryId,
      completed,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
            Alert.alert('Something went wrong, please try again');
      throw new Error(`Failed to update habitEntry: ${error.message}`);
    }
  }
};
