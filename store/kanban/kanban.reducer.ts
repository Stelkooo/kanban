import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TBoard, TTask } from '@/types/kanban.types';

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
};

const KANBAN_INITIAL_VALUE: TInitialState = {
  boards: [],
  currentBoardId: 0,
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
    removeBoard: (state, action: PayloadAction<TBoard>) => {
      state.boards.splice(
        state.boards.findIndex((board) => board.id === action.payload.id),
        1
      );
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
  removeBoard,
  removeTask,
} = kanbanSlice.actions;

export const kanbanReducer = kanbanSlice.reducer;
