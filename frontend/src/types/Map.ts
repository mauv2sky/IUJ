export type boundType = {
  ne: string[];
  sw: string[];
};

export type filterType = {
  extent: number[];
  floor: number[];
  price: number[];
  guarantee: number[];
  monthly: number[];
};

export type requestRealEstateListType = {
  bound: boundType;
  deal_type: string;
  filter: filterType;
  level: number; // 지도 레벨
  recomm: string[];
  type: string;
};

export type detailTransport = {
  name: string;
  id: number;
  lat: number;
  lng: number;
};

export type transport = {
  bus: detailTransport;
  subway: detailTransport;
};
