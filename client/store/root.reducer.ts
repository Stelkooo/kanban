import { combineReducers } from '@reduxjs/toolkit';

import { modalReducer } from './modal/modal.reducer';
import { boardApiReducer } from './api/api.store';
import { sidebarReducer } from './sidebar/sidebar.reducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  sidebar: sidebarReducer,
  boardApi: boardApiReducer,
});

export default rootReducer;
