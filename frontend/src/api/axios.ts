import axios, { AxiosInstance } from 'axios';
import { requestUpdateToken } from './auth';

export const http: AxiosInstance = axios.create({
  baseURL: 'https://j8e103.p.ssafy.io/',
  // baseURL: 'http://localhost:5000/',
  withCredentials: true,
});

export const httpForKakaoSearch: AxiosInstance = axios.create({
  // baseURL: 'https://j8e103.p.ssafy.io/',
  baseURL: 'http://localhost:5000/',
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
