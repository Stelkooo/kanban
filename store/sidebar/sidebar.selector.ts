import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectSidebarReducer = (state: RootState) => state.sidebar;

const selectIsSidebarOpen = createSelector(
  [selectSidebarReducer],
  (sidebar) => sidebar.isSidebarOpen
);

export default selectIsSidebarOpen;
