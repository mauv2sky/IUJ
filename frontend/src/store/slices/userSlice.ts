import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserStateInterface {
  isLogin: boolean;
  userId: string;
  username: string;
}

const initialState: UserStateInterface = {
  isLogin: false,
  userId: '',
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoginState: (state, action: PayloadAction<UserStateInterface>) => {
      state.isLogin = action.payload.isLogin;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
    resetUserLoginState: (state) => {
      state.isLogin = false;
      state.userId = '';
      state.username = '';
    },
  },
});

export const { setUserLoginState, resetUserLoginState } = userSlice.actions;

export default userSlice.reducer;
