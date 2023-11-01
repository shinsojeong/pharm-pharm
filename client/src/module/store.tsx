import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';

import schedule from './schedule';
import bar from './bar';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  schedule, bar
});

export const store = configureStore({
  reducer: rootReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch