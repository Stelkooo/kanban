import { createSelector } from '@reduxjs/toolkit';
import { TBoard } from '@/types/kanban.types';
import { RootState } from '../store';

const selectKanbanReducer = (state: RootState) => state.kanban;

export const selectBoards = createSelector(
  [selectKanbanReducer],
  (kanban) => kanban.boards
);

export const selectCurrentBoard = createSelector(
  [selectKanbanReducer],
  (kanban) =>
    kanban.boards.find((board) => board.id === kanban.currentBoardId) as TBoard
);

export const selectCurrentColumns = createSelector(
  [selectCurrentBoard],
  (currentBoard) => currentBoard?.columns
);
