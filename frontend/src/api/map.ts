import { requestRealEstateListType } from '../types/MapType';
import { http, httpForKakaoSearch } from './axios';

/** 카카오 주소 검색 API */
export const requestSearch = async (query: string) => {
  const res = await httpForKakaoSearch.get('https://dapi.kakao.com/v2/local/search/address.json', {
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

/** 현재 영역 매물 요청 */
export const requestRealEstateList = async (requestRealEstateListInfo: requestRealEstateListType) => {
  const res = await http.post('api/place', requestRealEstateListInfo);

  return res;
};

/** 선호 필터 저장 */
export const requestSavePriority = async (recomm: string[]) => {
  const res = await http.post('api/recomm', { recomm });

  return res;
};

/** 선호 필터 저장 */
export const requestPriorityList = async () => {
  const res = await http.get('api/recomm');

  return res;
};

/** 선호 필터 저장 */
export const requestDeletePriority = async (id: number) => {
  const data = {
    id,
  };

  const res = await http.delete('api/recomm', { data });

  return res;
};
