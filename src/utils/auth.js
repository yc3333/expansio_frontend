import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const setupAuth = () => {
  // Set up interceptors
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          try {
            const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refresh_token: refreshToken
            });
            localStorage.setItem('access_token', res.data.access_token);
            error.config.headers.Authorization = `Bearer ${res.data.access_token}`;
            return axios.request(error.config);
          } catch {
            localStorage.clear();
            window.location.href = '/';
          }
        }
      }
      return Promise.reject(error);
    }
  );
};