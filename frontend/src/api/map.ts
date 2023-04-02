import { requestRealEstateListType } from '../types/MapType';
import { http } from './axios';

export const requestSearch = async (query: string) => {
  const res = await http.get('https://dapi.kakao.com/v2/local/search/address.json', {
    headers: {
      Authorization: 'KakaoAK 6b0974b03cc37391ccf31bc3bbfcdf8f',
    },
    params: {
      query,
      size: 30,
    },
  });

  return res;
};

export const requestRealEstateList = async (requestRealEstateListInfo: requestRealEstateListType) => {
  const res = await http.post('api/place', requestRealEstateListInfo);

  return res;
};
