import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TBoard, TColumn, TSubtask, TTask } from '@/types/kanban.types';

export const fetchBoards = createAsyncThunk('kanban/fetch', async () => {
  const data = await fetch('data/data.json', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res) => res.boards);
  return data;
});

type TInitialState = {
  boards: TBoard[];
  currentBoardId: number;
  currentTask: TTask | null;
};

const KANBAN_INITIAL_VALUE: TInitialState = {
  boards: [],
  currentBoardId: 0,
  currentTask: null,
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState: KANBAN_INITIAL_VALUE,
  reducers: {
    setCurrentBoardId: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentBoardId: action.payload,
      };
    },
    setFirstBoardAsCurrent: (state) => {
      return {
        ...state,
        currentBoardId: state.boards[0].id,
      };
    },
    createBoard: (state, action: PayloadAction<TBoard>) => {
      state.boards.splice(-1, 0, action.payload);
    },
    setBoardName: (state, action: PayloadAction<string>) => {
      const currentBoard = state.boards.find(
        (el) => el.id === state.currentBoardId
      );
      if (currentBoard) currentBoard.name = action.payload;
    },
    setBoardColumns: (state, action: PayloadAction<TColumn[]>) => {
      const currentBoard = state.boards.find(
        (el) => el.id === state.currentBoardId
      );
      if (currentBoard) currentBoard.columns = action.payload;
    },
    removeBoard: (state, action: PayloadAction<TBoard>) => {
      state.boards.splice(
        state.boards.findIndex((board) => board.id === action.payload.id),
        1
      );
    },
    setCurrentTask: (state, action: PayloadAction<TTask>) => {
      return { ...state, currentTask: action.payload };
    },
    setTaskStatus: (state, action) => {
      const board = state.boards.find((el) => el.id === state.currentBoardId);
      if (board) {
        const column = board.columns.find(
          (el) => el.id === action.payload.task.columnId
        );
        const newColumn = board.columns.find(
          (el) => el.id === action.payload.newColumnId
        );
        if (column && newColumn) {
          const task = column.tasks.find(
            (el) => el.id === action.payload.task.id
          );
          if (task) {
            column.tasks.splice(column.tasks.indexOf(task), 1);
            column.order.splice(
              column.order.indexOf(action.payload.task.id),
              1
            );
            newColumn.order.splice(-1, 0, task.id);
            newColumn.tasks.splice(-1, 0, task);
            task.columnId = newColumn.id;
          }
        }
      }
    },
    removeTask: (state, action: PayloadAction<TTask>) => {
      const board = state.boards.find((el) => el.id === state.currentBoardId);
      if (board) {
        const column = board.columns.find(
          (el) => el.id === action.payload.columnId
        );
        if (column) {
          column.order.splice(column.order.indexOf(action.payload.id), 1);
          const task = column.tasks.find((el) => el.id === action.payload.id);
          if (task) column.tasks.splice(column.tasks.indexOf(task), 1);
        }
      }
    },
    setSubtaskStatus: (state, action: PayloadAction<TSubtask>) => {
      const board = state.boards.find((el) => el.id === state.currentBoardId);
      if (board) {
        const column = board.columns.find(
          (el) => el.id === action.payload.columnId
        );
        if (column) {
          const task = column.tasks.find(
            (el) => el.id === action.payload.taskId
          );
          if (task) {
            const subtask = task.subtasks.find(
              (el) => el.id === action.payload.id
            );
            if (subtask) subtask.isCompleted = !action.payload.isCompleted;
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      return {
        ...state,
        boards: action.payload,
        currentBoardId: action.payload[0].id,
      };
    });
  },
});

export const {
  setCurrentBoardId,
  setFirstBoardAsCurrent,
  createBoard,
  setBoardName,
  setBoardColumns,
  removeBoard,
  setCurrentTask,
  setTaskStatus,
  removeTask,
  setSubtaskStatus,
} = kanbanSlice.actions;

export const kanbanReducer = kanbanSlice.reducer;
