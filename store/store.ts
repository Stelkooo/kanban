import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './root.reducer';
import { boardApiMiddleware } from './api/api.store';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
