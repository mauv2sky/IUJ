import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './slices/userSlice';
import prioritySlice from './slices/prioritySlice';

/** blackList 대신 사용, priority는 유지되면 안됨 */
const filterPriorityTransform = createTransform(
  (inboundState, key) => {
    if (key === 'prioritySlice') {
      return {}; // filter out prioritySlice
    }
    return inboundState;
  },
  (outboundState, key) => {
    return outboundState;
  },
);

const persistConfig = {
  key: 'root',
  storage,
  whiteList: [userSlice],
  transforms: [filterPriorityTransform],
};

const rootReducer = combineReducers({
  userSlice,
  prioritySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
