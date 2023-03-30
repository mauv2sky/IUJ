import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type DetailType = {
  Deal: {
    type: string;
    maxPrice: number;
    minPrice: number;
    deals: {
      aptId: number;
      area: string;
      author: string;
      contract_day: string;
      contract_ym: string;
      dealType: string;
      floor: number;
      guarantee: number;
      id: number;
      monthly: number;
      price: number;
    }[];
  };
  home: { id: number; lat: number; lng: number; sigungu: string; bungi: string; name: string; built_year: string; road_addr: string };
};

export interface detailContainerInterface {
  status: boolean;
  detailRelist: DetailType;
}

const initialState: detailContainerInterface = {
  status: false,
  detailRelist: {
    Deal: {
      type: '',
      maxPrice: 0,
      minPrice: 0,
      deals: [
        {
          aptId: 0,
          area: '',
          author: '',
          contract_day: '',
          contract_ym: '',
          dealType: '',
          floor: 0,
          guarantee: 0,
          id: 0,
          monthly: 0,
          price: 0,
        },
      ],
    },
    home: {
      id: 0,
      lat: 0,
      lng: 0,
      sigungu: '',
      bungi: '',
      name: '',
      built_year: '',
      road_addr: '',
    },
  },
};

export const detailContainerSlice = createSlice({
  name: 'detailContainer',
  initialState,
  reducers: {
    setdetailContainerState: (state, action: PayloadAction<detailContainerInterface>) => {
      state.status = action.payload.status;
      state.detailRelist = action.payload.detailRelist;
      // console.log('담기나요?ㅠㅠ', state.detailRelist);
      // console.log('담기나요?ㅠㅠ', state.status);
    },
    // detailContainerState: (state) => {
    //   return state.detailRelist;
    // },
  },
});
export const { setdetailContainerState } = detailContainerSlice.actions;

export default detailContainerSlice.reducer;
