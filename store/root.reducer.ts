import { combineReducers } from '@reduxjs/toolkit';

import { kanbanReducer } from './kanban/kanban.reducer';
import { modalReducer } from './modal/modal.reducer';

const rootReducer = combineReducers({
  kanban: kanbanReducer,
  modal: modalReducer,
});

export default rootReducer;
