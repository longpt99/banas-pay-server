import axios from 'axios';
import queryString from 'query-string';
import { decodedToken, encodedToken } from 'utils';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosInstance.interceptors.request.use((config) => {
  const token = decodedToken();
  config.headers.Authorization = token
    ? 'Bearer ' + token.accessToken
    : 'Basic bb9c1b85-3450-4b21-b67e-583652cc03a8';
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const originalReq = error.config;
    if (error?.response.data.message === 'Token expired') {
      originalReq._retry = true;
      const token = decodedToken();
      return axiosInstance.post('/auth/refresh-token', token).then((res) => {
        const token = encodedToken(res);
        localStorage.setItem('token', JSON.stringify(token));
        return axiosInstance(originalReq);
      });
    }

    if (
      ['Invalid token', 'Refresh token expired'].includes(
        error?.response.data.message
      )
    ) {
      localStorage.removeItem('token');
      return (window.location.href = '/login');
    }
    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;
