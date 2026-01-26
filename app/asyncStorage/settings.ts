import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Settings } from '../types/types';

// TODO: Test
export const fetchSettings = async () => {
  try {
    const response = await AsyncStorage.getItem('settings:');

    console.log('FETCH SETTINGS', response);

    return JSON.parse(response || '{}');
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Unable to fetch settings, please try again');
      throw new Error(`Failed to fetch settings: ${error.message}`);
    }
  }
};

// TODO: Test
export const updateSettings = async (settings: Partial<Settings>) => {
  try {
    await AsyncStorage.mergeItem(
      'settings:',
      JSON.stringify(settings),
    );
    console.log('UPDATE SETTINGS', settings);
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Unable to update setting, please try again');
      throw new Error(`Failed to update setting: ${error.message}`);
    }
  }
};
