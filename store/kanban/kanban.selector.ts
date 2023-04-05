import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectKanbanReducer = (state: RootState) => state.kanban;

export const selectBoards = createSelector(
  [selectKanbanReducer],
  (kanban) => kanban.boards
);

export const selectCurrentBoard = createSelector(
  [selectKanbanReducer],
  (kanban) => kanban.boards.find((board) => board.id === kanban.currentBoardId)
);

export const selectCurrentColumns = createSelector(
  [selectCurrentBoard],
  (currentBoard) => currentBoard?.columns
);

export const selectCurrentTask = createSelector(
  [selectKanbanReducer],
  (kanban) => kanban.currentTask
);
