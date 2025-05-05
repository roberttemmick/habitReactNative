import api from './api';

const route = '/habit-entries'; // Base API URL

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
      throw new Error(`Failed to update habitEntry: ${error.message}`);
    }
  }
};
