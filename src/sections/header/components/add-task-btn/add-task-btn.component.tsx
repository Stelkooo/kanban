import Image from 'next/image';

import { useAppDispatch } from '@/store/hooks';
import {
  setBoard,
  setModalToggle,
  setModalType,
} from '@/store/modal/modal.reducer';

import AddTask from '@/public/assets/icon-add-task-mobile.svg';

import { TBoard } from '@/types/kanban.types';

import Button from '@/src/components/button/button.component';

type Props = {
  board: TBoard;
};

export default function AddTaskButton({ board }: Props) {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setBoard(board));
    dispatch(setModalType('add-task'));
    dispatch(setModalToggle());
  };
  return (
    <Button
      btnStyle="primarySmall"
      isDisabled={!(board.columns.length > 0)}
      onClickFunc={() => onClickHandler()}
    >
      <Image src={AddTask} alt="Click here to add a new task" />
    </Button>
  );
}
