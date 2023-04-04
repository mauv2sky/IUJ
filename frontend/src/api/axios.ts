import axios, { AxiosInstance } from 'axios';
import { requestUpdateToken } from './auth';

export const http: AxiosInstance = axios.create({
  // baseURL: 'https://j8e103.p.ssafy.io/',
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
});

/** 요청 인터셉터 */
http.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);

/** 응답 인터셉터 */
http.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error) {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        return error;
      }

      try {
        const response = await requestUpdateToken();
        localStorage.setItem('accessToken', response?.data.accessToken);
        localStorage.setItem('refreshToken', response?.data.refreshToken);
        return await http.request(error.config);
      } catch (e) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
