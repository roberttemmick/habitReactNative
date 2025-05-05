import {DateHabit, Habit} from '../types/types';
import api from './api';

const route = '/date-habits';

export const fetchDateHabits = async (userId: number) => {
  try {
    const response = await api.get(`${route}/${userId}`);
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
    const response = await api.post(`${route}/${userId}`, {
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
