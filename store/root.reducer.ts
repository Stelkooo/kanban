import { combineReducers } from '@reduxjs/toolkit';

import { kanbanReducer } from './kanban/kanban.reducer';

const rootReducer = combineReducers({
  kanban: kanbanReducer,
});

export default rootReducer;
