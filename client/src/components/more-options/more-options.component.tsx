'use client';

import Image from 'next/image';
import { useState } from 'react';

import VertEllipsis from '@/public/assets/icon-vertical-ellipsis.svg';

import { useAppDispatch } from '@/store/hooks';
import {
  setBoard,
  setModalToggle,
  setModalType,
} from '@/store/modal/modal.reducer';

import { TBoard } from '@/types/kanban.types';

import Button from '@/src/components/button/button.component';

type Props = {
  optionsAbout: 'task' | 'board';
  board?: TBoard;
};

export default function MoreOptions({ optionsAbout, board }: Props) {
  const dispatch = useAppDispatch();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const popupToggleHandler = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const editHandler = () => {
    setIsPopupOpen(!isPopupOpen);
    dispatch(setModalType(`edit-${optionsAbout}`));
    if (optionsAbout === 'board') {
      if (board) dispatch(setBoard(board));
      dispatch(setModalToggle());
    }
  };
  const deleteHandler = () => {
    setIsPopupOpen(!isPopupOpen);
    dispatch(setModalType(`delete-${optionsAbout}`));
    if (optionsAbout === 'board') {
      dispatch(setModalToggle());
    }
  };
  return (
    <div className="relative grid place-content-center">
      <Button btnStyle="clear" onClickFunc={() => popupToggleHandler()}>
        <Image
          src={VertEllipsis}
          alt="Click here for more board options"
          className="min-w-[5px]"
        />
      </Button>
      {isPopupOpen && (
        <div className="absolute right-0 top-12 z-50 rounded-lg bg-white p-4 drop-shadow-md dark:bg-dark-grey">
          <button
            type="button"
            className="mb-4 h-6 w-40 text-left"
            onClick={() => editHandler()}
          >
            <p className="body-large capitalize text-medium-grey">
              Edit {optionsAbout}
            </p>
          </button>
          <button
            type="button"
            className="h-6 w-40 text-left"
            onClick={() => deleteHandler()}
          >
            <p className="body-large capitalize text-red">
              Delete {optionsAbout}
            </p>
          </button>
        </div>
      )}
    </div>
  );
}

MoreOptions.defaultProps = {
  board: null,
};
