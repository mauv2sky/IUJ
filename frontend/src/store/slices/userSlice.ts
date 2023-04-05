import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserStateInterface {
  isLogin: boolean;
  userName: string;
}

const initialState: UserStateInterface = {
  isLogin: false,
  userName: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoginState: (state, action: PayloadAction<UserStateInterface>) => {
      state.isLogin = action.payload.isLogin;
      state.userName = action.payload.userName;
    },
    setUserLogoutState: (state) => {
      state.isLogin = false;
      state.userName = '';
    },
  },
});

export const { setUserLoginState, setUserLogoutState } = userSlice.actions;

export default userSlice.reducer;
