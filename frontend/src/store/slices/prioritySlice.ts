import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PriorityInterface {
  priority: string[];
}

const initialState: PriorityInterface = {
  priority: [],
};

export const prioritySlice = createSlice({
  name: 'priority',
  initialState,
  reducers: {
    setPriority: (state, action: PayloadAction<PriorityInterface>) => {
      state.priority = action.payload.priority;
    },
  },
});

export const { setPriority } = prioritySlice.actions;

export default prioritySlice.reducer;
