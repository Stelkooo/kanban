<<<<<<< HEAD
'use client';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';
import {
  removeBoard,
  setFirstBoardAsCurrent,
} from '@/store/kanban/kanban.reducer';

import { TBoard } from '@/types/kanban.types';
=======
import { TBoard } from '@/pages/types/kanban.types';
>>>>>>> parent of bd25395 (types folder moved to root)

import Button from '@/pages/components/button/button.component';
import ModalTemplate from '../modal-template/modal-template.component';

type Props = { board: TBoard };

export default function DeleteBoard({ board }: Props) {
  const dispatch = useAppDispatch();

  const cancelHandler = () => {
    dispatch(setModalToggle());
  };
  const deleteHandler = () => {
    dispatch(setModalToggle());
    dispatch(removeBoard(board));
    dispatch(setFirstBoardAsCurrent());
  };
  return (
    <ModalTemplate>
      <h3 className="heading-large text-red">Delete this board?</h3>
      <p className="body-large text-medium-grey">
        Are you sure you want to delete the ‘{board.name}’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="flex flex-col gap-4">
        <Button btnStyle="destructive" onClickFunc={() => deleteHandler()}>
          <p className="body-medium">Delete</p>
        </Button>
        <Button btnStyle="secondary" onClickFunc={() => cancelHandler()}>
          <p className="body-medium">Cancel</p>
        </Button>
      </div>
    </ModalTemplate>
  );
}
