import axios from 'axios';
import {Habit} from '../types/types';

const API_URL = 'http://localhost:3000/api'; // Base API URL

export const createHabit = async (
  userId: number,
  name: string,
  dateId: string,
  sortOrder: number,
) => {
  try {
    const response = await axios.post(`${API_URL}/habits`, {
      userId,
      name,
      dateId,
      sortOrder,
    });
    return response.data;
  } catch (error: unknown) {
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
    const response = await axios.delete(
      `${API_URL}/habits/${userId}/${habitId}/${dateId}`,
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to create habit: ${error.message}`);
    }
  }
};

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
  sortOrder: number,
) => {
  try {
    const response = await axios.put(`${API_URL}/habits`, {
      userId,
      habitId,
      name,
      sortOrder,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to update habit: ${error.message}`);
    }
  }
};

export const updateHabitsBatch = async (userId: number, habits: Habit[]) => {
  try {
    const response = await axios.put(`${API_URL}/habits/batch-update`, {
      userId,
      habits,
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to update habits: ${error.message}`);
    }
  }
};
