// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (email, password) => api.post('/login', { email, password });
export const register = (userData) => api.post('/register', userData);
export const getQuizzes = () => api.get('/quizzes');
export const getQuiz = (id) => api.get(`/quizzes/${id}`);
export const submitQuizResults = (quizId, results) => api.post(`/quizzes/${quizId}/submit`, results);

export default api;