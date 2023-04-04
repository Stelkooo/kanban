import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TBoard } from '@/types/kanban.types';

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

export const { setCurrentBoardId } = kanbanSlice.actions;

export const kanbanReducer = kanbanSlice.reducer;
