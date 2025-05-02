import axios from 'axios';
import {DateHabit, Habit} from '../types/types';

const API_URL = 'http://localhost:3000/api/date-habits'; // Base API URL

export const fetchDateHabits = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch dateHabits: ${error.message}`);
    }
  }
};

export const createDateHabits = async (
  userId: number,
  dateHabits: Array<Partial<DateHabit>>,
  habits: Habit,
) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}`, {
      dateHabits,
      habits,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to update dateHabits: ${error.message}`);
    }
  }
};
