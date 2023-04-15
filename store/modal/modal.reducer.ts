import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TBoard, TTask } from '@/types/kanban.types';

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
  board: TBoard | null;
  task: string | null;
};

const MODAL_INITIAL_VALUE: TInitialState = {
  isModalOpen: false,
  modalType: 'view-task',
  board: null,
  task: null,
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
    setTask: (state, action: PayloadAction<string>) => {
      return { ...state, task: action.payload };
    },
  },
});

export const { setModalToggle, setModalType, setBoard, setTask } =
  modalSlice.actions;

export const modalReducer = modalSlice.reducer;
