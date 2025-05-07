import {Habit} from '../types/types';
import api from './api';

const route = '/habits';

export const createHabit = async (
  userId: number,
  name: string,
  dateId: string,
  sortOrder: number,
) => {
  try {
    const response = await api.post(`${route}`, {
      userId,
      name,
      dateId,
      sortOrder,
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(`Failed to create habit: ${error.message}`);
    }
  }
};

export const deleteHabit = async (
  userId: number,
  habitId: number,
  dateId: string,
) => {
  try {
    const response = await api.put(`${route}/${userId}/${habitId}/${dateId}`);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete habit: ${error.message}`);
    }
  }
};

export const fetchHabits = async (userId: number) => {
  try {
    const response = await api.get(`${route}/${userId}`);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch habits: ${error.message}`);
    }
  }
};

export const updateHabit = async (
  userId: number,
  habitId: number,
  name: string,
  sortOrder: number,
) => {
  try {
    const response = await api.put(`${route}`, {
      userId,
      habitId,
      name,
      sortOrder,
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(`Failed to update habit: ${error.message}`);
    }
  }
};

export const updateHabitsBatch = async (userId: number, habits: Habit[]) => {
  try {
    const response = await api.put(`${route}/batch-update`, {
      userId,
      habits,
    });

    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(`Failed to update habits: ${error.message}`);
    }
  }
};
