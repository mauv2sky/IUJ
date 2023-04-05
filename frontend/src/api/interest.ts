import { http } from './axios';

export const requestInterestList = async () => {
  const res = await http.get('api/like');

  return res;
};

export const requestInterest = async (id: number, type: string) => {
  const data = {
    id,
    type,
  };

  const res = await http.post('api/like', data);

  return res;
};

export const requestDeleteInterest = async (id: number, type: string) => {
  const data = {
    id,
    type,
  };

  const res = await http.delete('api/like', { data });

  return res;
};
