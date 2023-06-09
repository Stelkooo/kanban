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
    if (task._id) {
      dispatch(setTask(task._id));
      dispatch(setModalType('view-task'));
      dispatch(setModalToggle());
    }
  };
  return (
    <button
      type="button"
      className="group/task animate-fade-up rounded-lg bg-white px-4 py-6 text-left drop-shadow-md transition-colors dark:bg-dark-grey"
      onClick={() => onClickHandler()}
    >
      <h3 className="heading-medium mb-2 transition-colors group-hover/task:text-purple-hover dark:text-white">
        {task.title}
      </h3>
      <p className="body-medium text-medium-grey">
        {task.subtasks &&
          `${
            task.subtasks.filter((subtask) => subtask.isCompleted === true)
              .length
          } of ${task.subtasks.length} subtasks`}
      </p>
    </button>
  );
}
