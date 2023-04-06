import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectModalReducer = (state: RootState) => {
  console.log(state);
  return state.modal;
};

export const selectIsModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isModalOpen
);

export const selectModalType = createSelector(
  [selectModalReducer],
  (modal) => modal.modalType
);

export const selectTask = createSelector(
  [selectModalReducer],
  (modal) => modal.task
);

export const selectBoard = createSelector(
  [selectModalReducer],
  (modal) => modal.board
);
