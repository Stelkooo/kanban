import { TBoard, TTask } from '@/types/kanban.types';
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
  task: TTask | null;
  board: TBoard | null;
};

const MODAL_INITIAL_VALUE: TInitialState = {
  isModalOpen: false,
  modalType: 'view-task',
  task: null,
  board: null,
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
    setTask: (state, action: PayloadAction<TTask>) => {
      return { ...state, task: action.payload };
    },
    setBoard: (state, action: PayloadAction<TBoard>) => {
      return { ...state, board: action.payload };
    },
  },
});

export const { setModalToggle, setModalType, setTask, setBoard } =
  modalSlice.actions;

export const modalReducer = modalSlice.reducer;
