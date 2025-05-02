import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api/auth'; // Base API URL

export const signup = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    const {token, user} = response.data;
    await AsyncStorage.setItem('authToken', token);

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
};
