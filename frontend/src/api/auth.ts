import { http } from './axios';

export const requestUpdateToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await http.post('refresh', {
    Refresh: `${refreshToken}`,
  });

  return response;
};
