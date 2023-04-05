'use client';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle, setModalType } from '@/store/modal/modal.reducer';
import { setCurrentTask } from '@/store/kanban/kanban.reducer';

import { TTask } from '@/types/kanban.types';

type Props = {
  task: TTask;
};

export default function Task({ task }: Props) {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setCurrentTask(task));
    dispatch(setModalType('view-task'));
    dispatch(setModalToggle());
  };
  return (
    <button
      type="button"
      className="rounded-lg bg-white px-4 py-6 text-left"
      onClick={() => onClickHandler()}
    >
      <h3 className="heading-medium mb-2">{task.title}</h3>
      <p className="body-medium text-medium-grey">
        {task.subtasks.filter((subtask) => subtask.isCompleted === true).length}{' '}
        of {task.subtasks.length} subtasks
      </p>
    </button>
  );
}
