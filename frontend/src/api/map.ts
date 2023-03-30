import { requestRealEstateListType } from '../types/MapType';
import { http } from './axios';

export const requestRealEstateList = async (requestRealEstateListInfo: requestRealEstateListType) => {
  const res = await http.post('api/place', requestRealEstateListInfo);

  return res;
};
