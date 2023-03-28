/** 우선순위 타입 */
export type priorityType = {
  main: string;
  sub: string;
  color: string;
  icon: React.ReactNode;
};

/** 우선순위를 영어로 매핑하는데 쓰는 오브젝트의 타입 */
export type priorityMappingType = {
  [key: string]: string;
};

/** 불러온 우선순위 목록의 타입 */
export type ResponsedPriorityItemType = {
  main: string;
  sub: string;
};

/** 불러온 우선순위에 아이콘과 색상을 적용하기 위한 오브젝트의 타입 */
export type CategoryStyleType = {
  [category: string]: {
    color: string;
    icon: React.ReactNode;
  };
};

/** 매물 타입 */
export type RealEstateType = {
  id: number;
  name: string;
  type: string;
  address: string[];
  total_score: number;
  score: {
    [kind: string]: number | undefined;
  };
  average_deal: {
    deal_type: string;
    price: number;
    guarantee: number;
    monthly: number;
  };
  range_extent: number[];
  range_floor: number[];
};

/** 매물 타입 영어 매핑용 오브젝트의 타입 */
export type TypeMappingType = {
  [key: string]: string;
};

/** 지도 영역 타입 */
export type boundType = {
  ne: string[];
  sw: string[];
};

/** 매물 요청 시 필요한 필터의 타입 */
export type filterType = {
  extent: number[];
  floor: number[];
  price: number[];
  guarantee: number[];
  monthly: number[];
};

/** 매물 요청 파라미터 타입 */
export type requestRealEstateListType = {
  bound: boundType;
  deal_type: string;
  filter: filterType;
  level: number; // 지도 레벨
  recomm: string[];
  type: string;
};
