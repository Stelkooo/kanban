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

  const onClickHanlder = () => {
    dispatch(setTask(task));
    dispatch(setModalType('view-task'));
    dispatch(setModalToggle());
  };
  return (
    <button
      type="button"
      className="rounded-lg bg-white px-4 py-6 text-left"
      onClick={() => onClickHanlder()}
    >
      <h3 className="heading-medium mb-2">{task.title}</h3>
      <p className="body-medium text-medium-grey">
        {task.subtasks.filter((subtask) => subtask.isCompleted === true).length}{' '}
        of {task.subtasks.length} subtasks
      </p>
    </button>
  );
}
