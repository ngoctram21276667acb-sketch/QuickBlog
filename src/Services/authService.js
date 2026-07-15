import axios from "axios";
const API_BASE_URL = "https://api-blog-af3u.onrender.com/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      userData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
