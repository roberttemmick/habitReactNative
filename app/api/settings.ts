import {Alert} from 'react-native';
import api from './api';

const route = '/settings';

export const fetchSettings = async (userId: number) => {
  try {
    const response = await api.get(`${route}/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Unable to fetch settings, please try again');
      throw new Error(`Failed to fetch settings: ${error.message}`);
    }
  }
};

export const updateNotificationSettings = async (
  userId: number,
  enableNotifications: boolean,
  reminderTime: string,
) => {
  try {
    const response = await api.put(`${route}/notifications/${userId}`, {
      enableNotifications,
      reminderTime,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Unable to update notification settings, please try again');
      throw new Error(`Failed to update settings: ${error.message}`);
    }
  }
};

export const updateAppSettings = async (
  userId: number,
  weekStartsOn: string,
) => {
  try {
    const response = await api.put(`${route}/app/${userId}`, {
      weekStartsOn,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Unable to update application settings, please try again');
      throw new Error(`Failed to update settings: ${error.message}`);
    }
  }
};

export const updateEmail = async (userId: number, email: string) => {
  try {
    const response = await api.put(`users/email/${userId}`, {
      email,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Unable to update email, please try again');
      throw new Error(`Failed to update email: ${error.message}`);
    }
  }
};

export const updatePassword = async (userId: number, password: string) => {
  try {
    const response = await api.put(`users/password/${userId}`, {
      password,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Unable to update password, please try again');
      throw new Error(`Failed to update email: ${error.message}`);
    }
  }
};
