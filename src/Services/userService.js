import axios from "axios";

const API_BASE_URL = "https://api-blog-af3u.onrender.com/api";

export const deleteUser = async (userId, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
