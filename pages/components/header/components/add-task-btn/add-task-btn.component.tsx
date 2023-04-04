'use client';

import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalType, setModalToggle } from '@/store/modal/modal.reducer';
import { selectCurrentColumns } from '@/store/kanban/kanban.selector';

import AddTask from '@/public/assets/icon-add-task-mobile.svg';

import Button from '@/pages/components/button/button.component';

export default function AddTaskBtn() {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(selectCurrentColumns);

  const onClickHandler = () => {
    dispatch(setModalType('add-task'));
    dispatch(setModalToggle());
  };
  return (
    <Button
      btnStyle="primarySmall"
      isDisabled={columns?.length === 1}
      onClickFunc={() => onClickHandler()}
    >
      <Image src={AddTask} alt="Click here to add a new task" />
    </Button>
  );
}
