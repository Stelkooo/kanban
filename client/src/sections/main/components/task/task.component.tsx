'use client';

import { useAppDispatch } from '@/store/hooks';
import {
  setModalToggle,
  setModalType,
  setTask,
} from '@/store/modal/modal.reducer';

import { TTask } from '@/types/kanban.types';

type Props = {
  task: TTask;
};

export default function Task({ task }: Props) {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setTask(task));
    dispatch(setModalType('view-task'));
    dispatch(setModalToggle());
  };
  return (
    <button
      type="button"
      className="group/task rounded-lg bg-white px-4 py-6 text-left drop-shadow-md dark:bg-dark-grey"
      onClick={() => onClickHandler()}
    >
      <h3 className="heading-medium mb-2 group-hover/task:text-purple-hover dark:text-white">
        {task.title}
      </h3>
      <p className="body-medium text-medium-grey">
        {task.subtasks.filter((subtask) => subtask.isCompleted === true).length}{' '}
        of {task.subtasks.length} subtasks
      </p>
    </button>
  );
}
