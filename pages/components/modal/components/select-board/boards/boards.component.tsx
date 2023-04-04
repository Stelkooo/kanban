'use client';

import { Dispatch, SetStateAction } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentBoardId } from '@/store/kanban/kanban.reducer';
import { setModalToggle, setModalType } from '@/store/modal/modal.reducer';
import {
  selectBoards,
  selectCurrentBoard,
} from '@/store/kanban/kanban.selector';

type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Boards({ setIsMenuOpen }: Props) {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);
  const currentBoard = useAppSelector(selectCurrentBoard);

  const onClickHandler = (boardId: number): void => {
    if (boardId === currentBoard?.id) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(false);
      dispatch(setCurrentBoardId(boardId));
    }
  };

  const newBoardHandler = () => {
    setIsMenuOpen(false);
    dispatch(setModalType('add-board'));
    dispatch(setModalToggle());
  };
  return (
    <div className="mr-6 flex flex-col md:mr-0">
      {currentBoard &&
        boards.map((board) =>
          board.id === currentBoard.id ? (
            <button
              type="button"
              className="flex cursor-pointer items-center gap-3 rounded-r-full bg-purple py-[15px] pl-6"
              key={board.id}
              onClick={() => onClickHandler(board.id)}
            >
              <svg
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                className="relative fill-white"
              >
                <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
              </svg>
              <p className="heading-medium relative text-white">{board.name}</p>
            </button>
          ) : (
            <button
              type="button"
              className="flex cursor-pointer items-center gap-3 py-[15px] pl-6"
              key={board.id}
              onClick={() => onClickHandler(board.id)}
            >
              <svg
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                className="relative fill-medium-grey"
              >
                <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
              </svg>
              <p className="heading-medium relative text-medium-grey">
                {board.name}
              </p>
            </button>
          )
        )}
      <button
        type="button"
        className="flex cursor-pointer items-center gap-3 py-[15px] pl-6"
        onClick={() => newBoardHandler()}
      >
        <svg
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          className="relative fill-purple"
        >
          <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
        </svg>
        <p className="heading-medium relative text-purple">Create New Board</p>
      </button>
    </div>
  );
}
