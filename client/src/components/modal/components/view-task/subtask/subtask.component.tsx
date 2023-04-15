'use client';

import { ChangeEvent } from 'react';

import { boardApi } from '@/store/api/api.store';

import { TSubtask } from '@/types/kanban.types';

type Props = {
  subtask: TSubtask;
};

export default function SubTask({ subtask }: Props) {
  const [updateSubtask] = boardApi.useUpdateSubtaskMutation();

  const onClickHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    await updateSubtask({ ...subtask, isCompleted: e.currentTarget.checked });
  };
  return (
    <label
      htmlFor={subtask._id}
      className="flex cursor-pointer items-center gap-4 rounded-[4px] bg-light-grey p-3 dark:bg-very-dark-grey"
    >
      <input
        type="checkbox"
        defaultChecked={subtask.isCompleted}
        id={subtask._id}
        className="peer sr-only"
        onChange={(e) => onClickHandler(e)}
      />
      <span className="h-4 min-h-[1rem] w-4 min-w-[1rem] rounded-sm border border-medium-grey bg-white after:h-full after:w-full after:bg-[url('/assets/icon-check.svg')] after:bg-center after:bg-no-repeat peer-checked:border-none peer-checked:bg-purple peer-checked:after:block" />
      <p className="body-medium peer-checked:text-medium-grey peer-checked:line-through dark:text-white">
        {subtask.title}
      </p>
    </label>
  );
}
