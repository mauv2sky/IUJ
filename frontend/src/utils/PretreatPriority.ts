import { priorityMappingType, priorityType, ResponsedPriorityItemType } from '../types/MapType';

export const priorityMapForRequest: priorityMappingType = {
  서점: 'BOOKSTORE',
  버스: 'BUS_STOP',
  영화관: 'CINEMA',
  편의점: 'CONVENIENCE_STORE',
  입시학원: 'EDU_ACADEMY',
  초등학교: 'ELEMENTARY_SCHOOL',
  예체능학원: 'ENTERTAINMENT_ACADEMY',
  미술관: 'GALLERY',
  고등학교: 'HIGH_SCHOOL',
  병원: 'HOSPITAL',
  유치원: 'KINDERGARTEN',
  중학교: 'MIDDLE_SCHOOL',
  어린이집: 'NURSERY',
  공원: 'PARK',
  치안: 'SAFETY',
  마트: 'SHOPPING',
  특수학교: 'SPECIAL_SCHOOL',
  지하철: 'SUBWAY',
  관공서: 'PUBLIC_OFFICE',
  도서관: 'LIBRARY',
};

/** 우선 순위 리스트를 dispatch용으로 전처리하기 위한 함수 */
export const pretreatPriority = (list: priorityType[] | ResponsedPriorityItemType[]) => {
  const result = list.map((item) => {
    return priorityMapForRequest[item.sub];
  });

  return result;
};

/** 우선 순위 리스트를 요청용으로 전처리하기 위한 함수 */
export const pretreatPriority2 = (list: priorityType[] | ResponsedPriorityItemType[]) => {
  const result = list.map((item) => {
    return item.sub;
  });

  return result;
};
