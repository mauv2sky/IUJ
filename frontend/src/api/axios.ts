import axios, { AxiosInstance } from 'axios';
import { requestUpdateToken } from './auth';

export const http: AxiosInstance = axios.create({
  baseURL: 'https://j8e103.p.ssafy.io/',
  withCredentials: true,
});

export const httpForKakaoSearch: AxiosInstance = axios.create();

/** 요청 인터셉터 */
http.interceptors.request.use(
  function (config) {
    // config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZWNvZGluZzk2QGdtYWlsLmNvbSIsImlhdCI6MTY4MDY3NzQyNCwiZXhwIjoxNjgwNjgxMDI0fQ.Sjuxp6Wyxgo9hQZrO1egB1Ssoed6jpzhxvsRxDqLvjg`;

    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);
