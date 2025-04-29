import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Base API URL

export const updateHabitEntry = async (
  habitEntryId: number,
  completed: boolean,
) => {
  try {
    const response = await axios.put(`${API_URL}/habit-entries`, {
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
