import {Alert} from 'react-native';
import api from './api';

const route = '/users';

export const getUser = async (userId: number) => {
  try {
    const response = await api.get(`${route}/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert('Unable to fetch user, please try again');
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }
};
