'use client';

import Image from 'next/image';
import { useState } from 'react';

import { TBoard, TTask } from '@/types/kanban.types';

import VertEllipsis from '@/public/assets/icon-vertical-ellipsis.svg';

import Button from '../button/button.component';

type Props = {
  optionsAbout: 'task' | 'board';
  task?: TTask;
  board?: TBoard;
};

export default function MoreOptions({ optionsAbout, task, board }: Props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const popupToggleHandler = () => {
    setIsPopupOpen(!isPopupOpen);
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
        <div className="absolute right-0 top-12 z-50 rounded-lg bg-white p-4 drop-shadow-md">
          <button type="button" className="mb-4 h-6 w-40 text-left">
            <p className="body-large capitalize text-medium-grey">
              Edit {optionsAbout}
            </p>
          </button>
          <button type="button" className="h-6 w-40 text-left">
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
  task: null,
  board: null,
};
