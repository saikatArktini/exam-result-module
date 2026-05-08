import api from '../api/axios';

export const getAllResults = async () => {
  const response = await api.get('/results');
  return response.data;
};

export const getResultById = async (id) => {
  const response = await api.get(`/results/${id}`);
  return response.data;
};

export const getResultsByStudent = async (studentId) => {
  const response = await api.get(`/results/student/${studentId}`);
  return response.data;
};

export const createResult = async (data) => {
  const response = await api.post('/results', data);
  return response.data;
};

export const updateResult = async (id, data) => {
  const response = await api.put(`/results/${id}`, data);
  return response.data;
};

export const deleteResult = async (id) => {
  const response = await api.delete(`/results/${id}`);
  return response.data;
};
