import { createSlice } from '@reduxjs/toolkit';

interface ISidebarInitialState {
  isSidebarOpen: boolean;
}

const SIDEBAR_INITIAL_STATE: ISidebarInitialState = {
  isSidebarOpen: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: SIDEBAR_INITIAL_STATE,
  reducers: {
    setSidebarToggle: (state) => {
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    },
  },
});

export const { setSidebarToggle } = sidebarSlice.actions;

export const sidebarReducer = sidebarSlice.reducer;
