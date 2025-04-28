import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Base API URL

export const fetchHabits = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/habits/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch habits: ${error.message}`);
    }
  }
};

export const updateHabit = async (
  userId: number,
  habitId: number,
  name: string,
) => {
  try {
    const response = await axios.put(`${API_URL}/habits`, {
      userId,
      habitId,
      name,
    });
    console.log('!!!!!!!!', response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch habits: ${error.message}`);
    }
  }
};
