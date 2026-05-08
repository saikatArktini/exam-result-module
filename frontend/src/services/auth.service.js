import api from '../api/axios';

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// We can add more auth-related API calls here later (profile, change password, etc.)
