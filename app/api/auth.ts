import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Base API URL

export const getUserId = async () => {
  const userId = await AsyncStorage.getItem('userId');
  return userId ? Number(userId) : null;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const {token, user} = response.data;
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userId', user.id.toString());
    return token;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to log in: ${error.message}`);
    }
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('userId');
};

export const signup = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      email,
      password,
    });

    const {token, user} = response.data;

    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userId', user.id.toString());
    return token;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
};
