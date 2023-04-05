import { TBoard } from '@/types/kanban.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TModalType =
  | 'view-task'
  | 'add-task'
  | 'edit-task'
  | 'add-board'
  | 'edit-board'
  | 'delete-board'
  | 'delete-task';

type TInitialState = {
  isModalOpen: boolean;
  modalType: TModalType;
  boardId: number;
};

const MODAL_INITIAL_VALUE: TInitialState = {
  isModalOpen: false,
  modalType: 'view-task',
  boardId: 0,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: MODAL_INITIAL_VALUE,
  reducers: {
    setModalToggle: (state) => {
      return { ...state, isModalOpen: !state.isModalOpen };
    },
    setModalType: (state, action: PayloadAction<TModalType>) => {
      return { ...state, modalType: action.payload };
    },
    setBoard: (state, action: PayloadAction<TBoard>) => {
      return { ...state, board: action.payload };
    },
  },
});

export const { setModalToggle, setModalType, setBoard } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
