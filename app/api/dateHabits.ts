import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Base API URL

export const fetchDateHabits = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/date-habits/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch dateHabits: ${error.message}`);
    }
  }
};
