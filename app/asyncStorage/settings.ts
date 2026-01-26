import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Settings } from '../types/types';

export const fetchSettings = async () => {
  try {
    const response = await AsyncStorage.getItem('settings:');

    return JSON.parse(response || '{}');
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Unable to fetch settings, please try again');
      throw new Error(`Failed to fetch settings: ${error.message}`);
    }

    return {};
  }
};

export const updateSettings = async (settings: Partial<Settings>) => {
  try {
    AsyncStorage.mergeItem(
      'settings:',
      JSON.stringify(settings),
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Unable to update notification settings, please try again');
      throw new Error(`Failed to update settings: ${error.message}`);
    }
  }
};