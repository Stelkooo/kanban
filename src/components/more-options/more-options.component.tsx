'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { useOnClickOutside, useToggle } from 'usehooks-ts';

import VertEllipsis from '@/public/assets/icon-vertical-ellipsis.svg';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle, setModalType } from '@/store/modal/modal.reducer';

import Button from '@/src/components/button/button.component';

type Props = {
  optionsAbout: 'task' | 'board';
};

export default function MoreOptions({ optionsAbout }: Props) {
  const menuRef = useRef(null);

  const dispatch = useAppDispatch();

  const [isPopupOpen, togglePopup] = useToggle(false);

  const editHandler = () => {
    togglePopup();
    dispatch(setModalType(`edit-${optionsAbout}`));
    if (optionsAbout === 'board') {
      dispatch(setModalToggle());
    }
  };
  const deleteHandler = () => {
    togglePopup();
    dispatch(setModalType(`delete-${optionsAbout}`));
    if (optionsAbout === 'board') {
      dispatch(setModalToggle());
    }
  };

  const onClickOutsideHandler = () => {
    if (isPopupOpen) togglePopup();
  };

  useOnClickOutside(menuRef, onClickOutsideHandler);
  return (
    <div className="relative grid place-content-center" ref={menuRef}>
      <Button btnStyle="clear" onClickFunc={() => togglePopup()}>
        <Image
          src={VertEllipsis}
          alt="Click here for more board options"
          className="min-w-[5px]"
        />
      </Button>
      {isPopupOpen && (
        <div className="absolute right-0 top-12 z-50 animate-fade-up rounded-lg bg-white p-4 drop-shadow-md dark:bg-dark-grey">
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
