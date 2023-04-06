import { combineReducers } from '@reduxjs/toolkit';

import { modalReducer } from './modal/modal.reducer';
import { boardApiReducer } from './api/api.store';

const rootReducer = combineReducers({
  modal: modalReducer,
  boardApi: boardApiReducer,
});

export default rootReducer;
