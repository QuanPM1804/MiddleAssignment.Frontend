import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7158/api', // Change this URL based on your server configuration
});

const privateApi = axios.create({
  baseURL: 'https://localhost:7158/api',
});

// Attach JWT token to the header of every request (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (username, password) => api.post('/Login/login', { username, password });
export const register = (username, email, password) => api.post('/Login/register', { username, email, password });
export const getProfile = (id) => privateApi.get(`/User/${id}`);
export const getBooks = () => privateApi.get('/Book');
export const getBookById = (id) => privateApi.get(`/Book/${id}`);
export const createBook = (bookData) => privateApi.post('/Book', bookData);
export const updateBook = (id, bookData) => privateApi.put(`/Book/${id}`, bookData);
export const deleteBook = (id) => privateApi.delete(`/Book/${id}`);
