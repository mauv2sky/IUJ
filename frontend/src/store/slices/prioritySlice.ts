import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ResponsedPriorityItemType } from '../../types/MapType';

export interface PriorityInterface {
  priority: string[];
  appliedPriority: ResponsedPriorityItemType[];
}

const initialState: PriorityInterface = {
  priority: [],
  appliedPriority: [],
};

export const prioritySlice = createSlice({
  name: 'prioritySlice',
  initialState,
  reducers: {
    setPriority: (state, action: PayloadAction<PriorityInterface>) => {
      state.priority = action.payload.priority;
      state.appliedPriority = action.payload.appliedPriority;
    },
  },
});

export const { setPriority } = prioritySlice.actions;

export default prioritySlice.reducer;
